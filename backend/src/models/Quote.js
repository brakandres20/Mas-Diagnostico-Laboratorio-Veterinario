const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    nombreCompleto: { type: String, required: true, trim: true, maxlength: 120 },
    clinica: { type: String, trim: true, maxlength: 160 },
    cargo: { type: String, trim: true, maxlength: 100 },
    telefono: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160 },
    ciudad: { type: String, trim: true, maxlength: 100 },
    tipoInstitucion: { type: String, trim: true, maxlength: 120 },
    serviciosInteres: { type: [String], default: [] },
    mensaje: { type: String, trim: true, maxlength: 2000 },
    tipo: {
      type: String,
      enum: ['convenio', 'cotizacion', 'recoleccion', 'contacto'],
      default: 'convenio',
    },
    estado: {
      type: String,
      enum: ['nueva', 'contactado', 'respondida', 'cerrada'],
      default: 'nueva',
    },
    waEnviado: { type: Boolean, default: false },
    waNota: { type: String, default: '' },
  },
  { timestamps: true }
);

quoteSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Quote', quoteSchema);