export const SITE = {
  name: 'Más Diagnóstico Laboratorio Veterinario',
  shortName: 'Más Diagnóstico',
  city: 'Medellín, Antioquia',
  address: 'Circular 1 # 73-104, Local 1, Laureles — Medellín',
  addressShort: 'Circular 1 # 73-104, Laureles, Medellín',
  phoneDisplay: '314 620 3073',
  phoneIntl: '+573146203073',
  phoneTel: 'tel:+573146203073',
  email: 'masdiagnosticolab@gmail.com',
  emailHref: 'mailto:masdiagnosticolab@gmail.com',
  schedule: 'Lunes a sábado · 9:00 a.m. – 5:30 p.m.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Circular+1+%2373-104+Laureles+Medell%C3%ADn',
  coverage: 'Medellín y área metropolitana',
};

export const WHATSAPP_NUMBER = '573146203073';

export const WA_MESSAGES = {
  default:
    'Hola, soy profesional veterinario y estoy interesado en conocer el portafolio de servicios de Más Diagnóstico Laboratorio Veterinario.',
  cotizacion:
    'Hola, quisiera solicitar una cotización de exámenes de laboratorio veterinario para mi clínica.',
  recoleccion:
    'Hola, quisiera solicitar una recolección de muestras para mi clínica veterinaria.',
  convenio:
    'Hola, estoy interesado en construir un convenio con Más Diagnóstico Laboratorio Veterinario.',
  portafolio:
    'Hola, quisiera recibir el portafolio completo de pruebas y tarifas de Más Diagnóstico Laboratorio Veterinario.',
  info: 'Hola, quisiera más información sobre las pruebas y servicios de Más Diagnóstico Laboratorio Veterinario.',
};

export function waLink(type, extraText) {
  const base = WA_MESSAGES[type] || WA_MESSAGES.default;
  const text = extraText ? `${base}\n\n${extraText}` : base;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// En Vercel se define VITE_API_URL con la URL del backend (ej. https://mas-diagnostico-api.vercel.app).
// Localmente queda '/api' y el proxy de Vite lo envía a http://localhost:5000.
export const API_URL = import.meta.env.VITE_API_URL || '/api';