# Más Diagnóstico Laboratorio Veterinario

Sitio web B2B del laboratorio veterinario **Más Diagnóstico** (Medellín) construido con **React + Vite + Tailwind** en el frontend y **Node.js + Express** en el backend. Sin base de datos: cada solicitud del formulario genera un **mensaje de WhatsApp** listo para enviar al laboratorio (314 620 3073).

## Estructura

```
mas-diagnostico/
├─ backend/            # API (Express)
│  ├─ src/
│  │  ├─ index.js      # Servidor (puerto 5000)
│  │  ├─ app.js        # App Express
│  │  ├─ controllers/quotes.controller.js
│  │  ├─ routes/quotes.routes.js
│  │  └─ services/whatsapp.service.js
│  └─ .env             # Configuración local (NO se sube a git)
└─ frontend/           # SPA (React + Vite + Tailwind)
   ├─ src/components/  # Navbar, Hero, Portfolio, QuoteForm, etc.
   ├─ src/api/client.js
   └─ public/images/   # Fotos de equipos
```

## Requisitos

- Node.js 18 o superior

## Poner en marcha

### Backend

```bash
cd backend
npm install
npm run dev      # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000  (el proxy envía /api al backend)
```

Abre http://localhost:3000 y prueba el formulario de cotización: al enviarlo se abre WhatsApp con el mensaje listo para el laboratorio.

## WhatsApp automático (opcional)

Por defecto, el backend devuelve un enlace `wa.me` con el resumen de la solicitud y el navegador lo abre para que el cliente envíe el mensaje al laboratorio.

Para **enviar automáticamente** el mensaje al laboratorio sin pasar por el cliente, configura la **WhatsApp Cloud API** de Meta en `backend/.env`:

```
WHATSAPP_ACCESS_TOKEN=<token>
WHATSAPP_PHONE_ID=<id_del_número>
```

> Para usar la Cloud API necesitas una cuenta de negocio en Meta, un número verificado y un token de acceso. Es un paso opcional: sin él, el sitio sigue funcionando con el enlace `wa.me`.

## Despliegue en Vercel

El proyecto usa la **configuración de monorepo de Vercel** (`vercel.json` en la raíz): un solo proyecto
que construye dos servicios y enruta `/api/*` al backend y todo lo demás al frontend.

```
vercel.json        → services: frontend (vite) + backend (node/express)
                     rewrites: /api(/.*)? → backend · /(.*) → frontend
```

### Desplegar

1. Sube el repositorio a GitHub y en Vercel importa el proyecto (o usa el CLI desde la raíz).
2. En **Settings → Environment Variables** agrega:
   - `WHATSAPP_NUMBER` → `573146203073`
   - `WHATSAPP_ACCESS_TOKEN` y `WHATSAPP_PHONE_ID` → opcionales (envío automático)
3. Despliega. Vercel detecta el framework de `frontend` (Vite) y la función `backend/api/index.js`.

### Importante: hacer público el sitio

Por defecto Vercel activa la **protección de despliegue (Vercel Authentication / SSO)**. Para que el
sitio sea accesible públicamente, ve a **Settings → Deployment Protection** del proyecto y desactiva la
autenticación (permite acceso público).

Verificación:

- `https://TU-SITIO.vercel.app/api/health` → `{"ok":true,...}`
- `https://TU-SITIO.vercel.app/` → el sitio

No se necesita `VITE_API_URL`: el rewrite de `/api` reenvía al backend del mismo despliegue.

## Despliegue tradicional (opcional)

```bash
cd frontend && npm run build      # genera frontend/dist
cd ../backend && npm start        # NODE_ENV=production sirve el build
```

## Datos del laboratorio

- Dirección: Circular 1 # 73-104, Local 1, Laureles — Medellín
- Teléfono / WhatsApp: 314 620 3073 (+573146203073)
- Correo: masdiagnosticolab@gmail.com
- Horario: Lunes a sábado, 9:00 a.m. – 5:30 p.m.
- Recolección de muestras: 2 jornadas diarias, Medellín y área metropolitana# Mas-Diagnostico-Laboratorio-Veterinario
