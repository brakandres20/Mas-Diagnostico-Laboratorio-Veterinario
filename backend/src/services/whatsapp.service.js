const LABEL = 'Más Diagnóstico Laboratorio Veterinario';

function buildQuoteMessage(q) {
  const lines = [];
  lines.push(`*Nueva solicitud — ${LABEL}*`);
  lines.push('------------------------------------');
  if (q.tipo === 'convenio') lines.push('*Tipo:* Convenio para clínica');
  else if (q.tipo === 'recoleccion') lines.push('*Tipo:* Recolección de muestras');
  else if (q.tipo === 'cotizacion') lines.push('*Tipo:* Cotización');
  else lines.push('*Tipo:* Contacto');
  lines.push(`*Nombre:* ${q.nombreCompleto}`);
  if (q.clinica) lines.push(`*Clínica:* ${q.clinica}`);
  if (q.cargo) lines.push(`*Cargo:* ${q.cargo}`);
  lines.push(`*Teléfono/WhatsApp:* ${q.telefono}`);
  lines.push(`*Correo:* ${q.email}`);
  if (q.ciudad) lines.push(`*Ciudad:* ${q.ciudad}`);
  if (q.tipoInstitucion) lines.push(`*Tipo de institución:* ${q.tipoInstitucion}`);
  if (q.serviciosInteres && q.serviciosInteres.length)
    lines.push(`*Servicios de interés:* ${q.serviciosInteres.join(', ')}`);
  if (q.mensaje) lines.push(`*Mensaje:* ${q.mensaje}`);
  lines.push('------------------------------------');
  return lines.join('\n');
}

function buildWaLink(phone, text) {
  const clean = String(phone || '').replace(/[^\d]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

/**
 * Envía un mensaje de WhatsApp al laboratorio usando la WhatsApp Cloud API de Meta.
 * Requiere WHATSAPP_ACCESS_TOKEN y WHATSAPP_PHONE_ID en el .env.
 * Si no están configurados, devuelve { sent: false, code: 'NOT_CONFIGURED' }
 * para que el cliente use el enlace wa.me como respaldo.
 */
async function sendWhatsAppToLab(text) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_NUMBER;

  if (!token || !phoneId || !to) {
    return { sent: false, code: 'NOT_CONFIGURED' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: String(to).replace(/[^\d]/g, ''),
        type: 'text',
        text: { body: text },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { sent: false, code: 'API_ERROR', status: res.status, detail: body };
    }

    return { sent: true };
  } catch (err) {
    return { sent: false, code: 'EXCEPTION', detail: err.message };
  }
}

module.exports = { buildQuoteMessage, buildWaLink, sendWhatsAppToLab, LABEL };