const Quote = require('../models/Quote');
const { buildQuoteMessage, buildWaLink, sendWhatsAppToLab } = require('../services/whatsapp.service');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(body) {
  const pick = (k) => (typeof body[k] === 'string' ? body[k].trim() : '');
  const pickList = (k) => {
    if (Array.isArray(body[k])) return body[k].map((x) => String(x).trim()).filter(Boolean);
    const v = pick(k);
    return v ? v.split(',').map((x) => x.trim()).filter(Boolean) : [];
  };
  return {
    nombreCompleto: pick('nombreCompleto'),
    clinica: pick('clinica'),
    cargo: pick('cargo'),
    telefono: pick('telefono'),
    email: pick('email').toLowerCase(),
    ciudad: pick('ciudad'),
    tipoInstitucion: pick('tipoInstitucion'),
    serviciosInteres: pickList('serviciosInteres'),
    mensaje: pick('mensaje'),
  };
}

function validate(data, tipo) {
  const errors = [];
  if (!data.nombreCompleto) errors.push('nombreCompleto es obligatorio');
  if (!data.telefono) errors.push('telefono es obligatorio');
  if (data.email && !EMAIL_RE.test(data.email)) errors.push('email no tiene un formato válido');
  if (tipo === 'convenio' && !data.clinica) errors.push('clinica es obligatorio para convenios');
  return errors;
}

exports.createQuote = async (req, res) => {
  try {
    const tipo = ['convenio', 'cotizacion', 'recoleccion', 'contacto'].includes(req.body.tipo)
      ? req.body.tipo
      : 'convenio';
    const data = sanitize(req.body);

    const errors = validate(data, tipo);
    if (errors.length) {
      return res.status(400).json({ ok: false, errors });
    }

    const quote = await Quote.create({ ...data, tipo });

    const message = buildQuoteMessage(quote);
    const waResult = await sendWhatsAppToLab(message);

    if (waResult.sent) {
      quote.waEnviado = true;
      await quote.save();
    } else if (waResult.code) {
      quote.waNota = waResult.code;
      await quote.save();
    }

    const waLink = buildWaLink(process.env.WHATSAPP_NUMBER, message);

    return res.status(201).json({
      ok: true,
      id: quote._id,
      waLink,
      waEnviado: quote.waEnviado,
    });
  } catch (err) {
    console.error('[quotes] Error al crear cotización:', err);
    return res.status(500).json({ ok: false, errors: ['Error interno del servidor'] });
  }
};

exports.listQuotes = async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, errors: ['No autorizado'] });
  }
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).limit(500);
    return res.json({ ok: true, count: quotes.length, quotes });
  } catch (err) {
    console.error('[quotes] Error listando cotizaciones:', err);
    return res.status(500).json({ ok: false, errors: ['Error interno del servidor'] });
  }
};

exports.updateStatus = async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, errors: ['No autorizado'] });
  }
  const { id } = req.params;
  const { estado } = req.body;
  const allowed = ['nueva', 'contactado', 'respondida', 'cerrada'];
  if (!allowed.includes(estado)) {
    return res.status(400).json({ ok: false, errors: ['Estado no válido'] });
  }
  try {
    const quote = await Quote.findByIdAndUpdate(id, { estado }, { new: true });
    if (!quote) return res.status(404).json({ ok: false, errors: ['No encontrada'] });
    return res.json({ ok: true, quote });
  } catch (err) {
    return res.status(500).json({ ok: false, errors: ['Error interno del servidor'] });
  }
};