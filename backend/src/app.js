require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const quotesRoutes = require('./routes/quotes.routes');

const app = express();

app.disable('x-powered-by');

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-XSS-Protection', '0');
  next();
});

app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'mas-diagnostico-api' }));

// Rate limiting en memoria para /api/quotes
const rateLimits = new Map();
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 8;

app.use('/api/quotes', (req, res, next) => {
  if (rateLimits.size > 5000) {
    const now = Date.now();
    for (const [k, v] of rateLimits) {
      if (now > v.reset) rateLimits.delete(k);
    }
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.ip || 'unknown';
  const now = Date.now();
  let rec = rateLimits.get(ip);
  if (!rec || now > rec.reset) {
    rec = { count: 0, reset: now + RATE_WINDOW_MS };
  }
  rec.count += 1;
  rateLimits.set(ip, rec);
  if (rec.count > RATE_MAX) {
    return res.status(429).json({ ok: false, errors: ['Demasiadas solicitudes. Intenta de nuevo en un minuto.'] });
  }
  next();
});

app.use('/api/quotes', quotesRoutes);

// En un despliegue tradicional, servir el build del frontend si existe
const distPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.use((req, res) => res.status(404).json({ ok: false, errors: ['Ruta no encontrada'] }));

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = status >= 500 ? 'Error interno del servidor' : err.message;
  if (status >= 500) console.error('[api] Error no controlado:', err);
  res.status(status).json({ ok: false, errors: [message] });
});

module.exports = app;