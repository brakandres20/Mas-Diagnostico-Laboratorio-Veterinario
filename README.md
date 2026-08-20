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

El proyecto está preparado para Vercel en **dos proyectos separados** (backend y frontend).

### Backend (API) → Vercel

1. En Vercel, crea un proyecto y apunta a la carpeta `mas-diagnostico/backend`.
2. **Root Directory**: `backend`.
3. Vercel detecta automáticamente la función serverless en `backend/api/index.js` (exporta la app de Express). Sin `npm run build`.
4. En **Settings → Environment Variables** agrega:
   - `WHATSAPP_NUMBER` → `573146203073`
   - `WHATSAPP_ACCESS_TOKEN` y `WHATSAPP_PHONE_ID` → opcionales (envío automático)
5. Despliega. Obtendrás una URL tipo `https://mas-diagnostico-api.vercel.app`.
6. Verifica: `https://TU-API.vercel.app/api/health` debe responder `{"ok":true,...}`.

### Frontend (Sitio) → Vercel

1. Crea un segundo proyecto apuntando a la carpeta `mas-diagnostico/frontend`.
2. **Root Directory**: `frontend` · **Framework Preset**: Vite · **Output Directory**: `dist`.
3. Para que el formulario llegue al backend, usa una de estas dos opciones (recomendada la primera):
   - **Opción A (recomendada):** Define en las variables de entorno del frontend:
     `VITE_API_URL=https://mas-diagnostico-api.vercel.app`
   - **Opción B:** Edita `frontend/vercel.json` y reemplaza la URL de ejemplo por la tuya
     (el rewrite reenvía `/api/*` al backend).
4. Despliega. El sitio quedará en `https://tu-frontend.vercel.app`.

Con la **Opción A** el navegador llama directo al backend (CORS abierto en el API). Con la
**Opción B** no se configura CORS, Vercel hace de proxy. No uses ambas a la vez con URLs distintas.

### En local con el proxy de Vite

Si no defines `VITE_API_URL`, el frontend usa `/api` y el proxy de Vite lo envía a `http://localhost:5000`.

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
