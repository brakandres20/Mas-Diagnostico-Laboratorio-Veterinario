const { buildQuoteMessage, buildWaLink, sendWhatsAppToLab } = require('../services/whatsapp.service');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIPOS = ['convenio', 'cotizacion', 'recoleccion', 'contacto'];

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
    tipo: TIPOS.includes(body.tipo) ? body.tipo : 'cotizacion',
  };
}

function validate(data) {
  const errors = [];
  if (!data.nombreCompleto) errors.push('nombreCompleto es obligatorio');
  if (!data.telefono) errors.push('telefono es obligatorio');
  if (data.email && !EMAIL_RE.test(data.email)) errors.push('email no tiene un formato válido');
  if (data.tipo === 'convenio' && !data.clinica) errors.push('clinica es obligatorio para convenios');
  return errors;
}

exports.createQuote = async (req, res) => {
  try {
    const data = sanitize(req.body);

    const errors = validate(data);
    if (errors.length) {
      return res.status(400).json({ ok: false, errors });
    }

    const message = buildQuoteMessage(data);
    const waResult = await sendWhatsAppToLab(message);

    const waLink = buildWaLink(process.env.WHATSAPP_NUMBER, message);

    return res.status(201).json({
      ok: true,
      waLink,
      waEnviado: waResult.sent,
      waNota: waResult.sent ? undefined : waResult.code,
    });
  } catch (err) {
    console.error('[quotes] Error al crear solicitud:', err);
    return res.status(500).json({ ok: false, errors: ['Error interno del servidor'] });
  }
};