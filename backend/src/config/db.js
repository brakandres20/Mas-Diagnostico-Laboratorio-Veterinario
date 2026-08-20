const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[db] Falta MONGODB_URI en el archivo .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('[db] Conectado a MongoDB');
  } catch (err) {
    console.error('[db] Error conectando a MongoDB:', err.message);
    throw err;
  }
}

module.exports = connectDB;