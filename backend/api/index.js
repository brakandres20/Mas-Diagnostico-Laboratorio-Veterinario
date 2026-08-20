const app = require('../src/app');
const connectDB = require('../src/config/db');

// En Vercel (serverless) cada instancia se reutiliza; conectamos una sola vez
// y mongoose encola las operaciones mientras establece la conexión.
if (!process.env.__MD_MONGO_CONNECTED) {
  connectDB().catch((err) => {
    console.error('[db] Error conectando a MongoDB:', err.message);
  });
  process.env.__MD_MONGO_CONNECTED = '1';
}

module.exports = app;