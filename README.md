# Más Diagnóstico Laboratorio Veterinario

Sitio web B2B del laboratorio veterinario **Más Diagnóstico** (Medellín) construido con React + Vite + Tailwind en el frontend y Node.js + Express + MongoDB en el backend.

El formulario de cotizaciones **guarda cada solicitud en MongoDB** y abre **WhatsApp** con el resumen para enviarlo al laboratorio (314 620 3073).

## Estructura

```
mas-diagnostico/
├─ backend/            # API (Express + Mongoose)
│  ├─ src/
│  │  ├─ index.js      # Servidor (puerto 5000)
│  │  ├─ config/db.js  # Conexión a MongoDB
│  │  ├─ models/Quote.js
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
- Una base de datos MongoDB (local o **MongoDB Atlas gratis**)

## 1. Configurar MongoDB Atlas (gratis)

1. Crea una cuenta en https://www.mongodb.com/cloud/atlas y crea un **clúster gratuito (M0)**.
2. En **Database Access**, crea un usuario con contraseña.
3. En **Network Access**, permite acceso desde tu IP (o `0.0.0.0/0` para pruebas).
4. En el clúster, pulsa **Connect → Drivers** y copia el URI `mongodb+srv://...`.
5. Abre `backend/.env` y pega el URI en `MONGODB_URI`, reemplazando `<usuario>` y `<contrasena>`.

## 2. Poner en marcha

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

Abre http://localhost:3000 y prueba el formulario de cotización. Al enviarlo se guarda en MongoDB y se abre WhatsApp con el mensaje listo.

## 3. Consultar las cotizaciones registradas

El backend guarda cada solicitud con su estado (`nueva`, `contactado`, `respondida`, `cerrada`).

```bash
# Listar (requiere la clave definida en .env como ADMIN_KEY)
curl -H "X-Admin-Key: tu-clave" http://localhost:5000/api/quotes

# Cambiar estado
curl -X PATCH -H "X-Admin-Key: tu-clave" -H "Content-Type: application/json" \
  -d '{"estado":"contactado"}' http://localhost:5000/api/quotes/<id>
```

## 4. WhatsApp automático (opcional)

Por defecto, al enviar el formulario se guarda la cotización en MongoDB y el navegador abre un enlace `wa.me` hacia el número del laboratorio.

Para **enviar automáticamente** el mensaje al laboratorio sin pasar por el cliente, configura la **WhatsApp Cloud API** de Meta en `backend/.env`:

```
WHATSAPP_ACCESS_TOKEN=<token>
WHATSAPP_PHONE_ID=<id_del_número>
```

> Para usar la Cloud API necesitas una cuenta de negocio en Meta, un número verificado y un token de acceso. Es un paso opcional: sin él, el sitio sigue funcionando con el enlace `wa.me`.

## 5. Despliegue en Vercel

El proyecto está preparado para Vercel en **dos proyectos separados** (backend y frontend).

### Backend (API) → Vercel

1. En Vercel, crea un proyecto y apunta al repositorio/carpeta `mas-diagnostico/backend`.
2. **Root Directory**: `backend`.
3. Vercel detecta automáticamente la función serverless en `backend/api/index.js` (exporta la app de Express). Sin `npm run build`.
4. En **Settings → Environment Variables** agrega las mismas del `.env`:
   - `MONGODB_URI` → tu URI de Atlas (ej. `mongodb+srv://…/cotizaciones?retryWrites=true&w=majority&appName=Cluster0`)
   - `WHATSAPP_NUMBER` → `573146203073`
   - `ADMIN_KEY` → clave para consultar las cotizaciones
   - `WHATSAPP_ACCESS_TOKEN` y `WHATSAPP_PHONE_ID` → opcionales (envío automático)
5. Despliega. Obtendrás una URL tipo `https://mas-diagnostico-api.vercel.app`.
6. Verifica: `https://TU-API.vercel.app/api/health` debe responder `{"ok":true,...}`.

> Nota: como es serverless, la conexión a MongoDB se reutiliza entre invocaciones (ver `backend/api/index.js`). Si tu plan gratuito de Atlas no permite IPs dinámicas, usa Network Access `0.0.0.0/0`.

### Frontend (Sitio) → Vercel

1. Crea un segundo proyecto apuntando a `mas-diagnostico/frontend`.
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

## 6. Despliegue tradicional (opcional)

```bash
cd frontend && npm run build      # genera frontend/dist
cd ../backend && npm start        # NODE_ENV=production sirve el build
```

## Datos del laboratorio

- Dirección: Circular 1 # 73-104, Local 1, Laureles — Medellín
- Teléfono / WhatsApp: 314 620 3073 (+573146203073)
- Correo: masdiagnosticolab@gmail.com
- Horario: Lunes a sábado, 9:00 a.m. – 5:30 p.m.
- Recolección de muestras: 2 jornadas diarias, Medellín y área metropolitana
