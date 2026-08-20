require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const quotesRoutes = require('./routes/quotes.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'mas-diagnostico-api' }));

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