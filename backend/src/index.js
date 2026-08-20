const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[api] Servidor corriendo en http://localhost:${PORT}`);
});