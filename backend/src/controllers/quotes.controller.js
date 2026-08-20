const { buildQuoteMessage, buildWaLink, sendWhatsAppToLab } = require('../services/whatsapp.service');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIPOS = ['convenio', 'cotizacion', 'recoleccion', 'contacto'];

const MAX = {
  nombreCompleto: 120,
  clinica: 120,
  cargo: 80,
  telefono: 30,
  email: 120,
  ciudad: 80,
  mensaje: 1000,
};

function sanitize(body) {
  const pick = (k) => {
    const v = typeof body[k] === 'string' ? body[k].trim() : '';
    return MAX[k] ? v.slice(0, MAX[k]) : v;
  };
  const pickList = (k) => {
    if (Array.isArray(body[k])) return body[k].map((x) => String(x).trim()).filter(Boolean).slice(0, 20);
    const v = pick(k);
    return v ? v.split(',').map((x) => x.trim()).filter(Boolean).slice(0, 20) : [];
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
    examenes: pickList('examenes').slice(0, 50),
    mensaje: pick('mensaje'),
    tipo: TIPOS.includes(body.tipo) ? body.tipo : 'cotizacion',
  };
}

function validate(data) {
  const errors = [];
  if (!data.nombreCompleto) errors.push('nombreCompleto es obligatorio');
  if (!data.telefono) errors.push('telefono es obligatorio');
  else if (data.telefono.replace(/\D/g, '').length < 7) errors.push('telefono no es válido');
  if (data.email && !EMAIL_RE.test(data.email)) errors.push('email no tiene un formato válido');
  if (data.tipo === 'convenio' && !data.clinica) errors.push('clinica es obligatorio para convenios');
  return errors;
}

exports.createQuote = async (req, res) => {
  try {
    const data = sanitize(req.body);

    // Honeypot: si un bot llenó el campo oculto "empresa", fingimos éxito sin procesar nada.
    const honeypot = typeof req.body.empresa === 'string' ? req.body.empresa.trim() : '';
    if (honeypot) {
      const fakeMessage = buildQuoteMessage({ ...data, nombreCompleto: 'Solicitud filtrada', telefono: '0000000000' });
      return res.status(201).json({
        ok: true,
        waLink: buildWaLink(process.env.WHATSAPP_NUMBER, fakeMessage),
        waEnviado: false,
        waNota: 'FILTERED',
      });
    }

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