const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[api] Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(
      `[api] No fue posible conectar a MongoDB (${err.message}). Reintentando en 5s…`
    );
    setTimeout(start, 5000);
  }
}

start();