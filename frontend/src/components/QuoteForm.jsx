import { useState } from 'react';
import { createQuote } from '../api/client';
import { INSTITUTION_TYPES, SERVICE_OPTIONS } from '../data/services';
import Reveal from './Reveal';

const emptyForm = {
  nombreCompleto: '',
  clinica: '',
  cargo: '',
  telefono: '',
  email: '',
  ciudad: '',
  tipoInstitucion: '',
  serviciosInteres: [],
  mensaje: '',
  tipo: 'cotizacion',
};

export default function QuoteForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [waUrl, setWaUrl] = useState('');

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s) =>
    setForm((f) => {
      const has = f.serviciosInteres.includes(s);
      return {
        ...f,
        serviciosInteres: has ? f.serviciosInteres.filter((x) => x !== s) : [...f.serviciosInteres, s],
      };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const data = await createQuote(form);
      if (data?.waLink) {
        setWaUrl(data.waLink);
        window.open(data.waLink, '_blank', 'noopener,noreferrer');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.message ||
          'No pudimos preparar tu solicitud. Intenta de nuevo o escríbenos directamente por WhatsApp.'
      );
    }
  };

  const inputCls =
    'w-full rounded-xl border border-[#E7ECF1] bg-white px-4 py-3 text-sm text-navy placeholder:text-ink-muted focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/30 transition';

  return (
    <Reveal>
      <div className="rounded-2xl overflow-hidden shadow-card border border-[#E7ECF1]">
        <div className="bg-navy px-8 py-6">
          <h3 className="text-white text-xl font-extrabold">Solicita tu cotización</h3>
          <p className="text-gray-mid text-sm mt-1">
            Diligencia el formulario y envíalo por WhatsApp en un solo paso.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green/15 text-green flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>
            <h4 className="text-navy text-lg font-bold">Solicitud enviada</h4>
            <p className="text-ink-muted text-sm mt-2 mb-6 max-w-md mx-auto">
              Abrimos WhatsApp con el resumen de tu solicitud. Envíalo y te responderemos lo antes
              posible.
            </p>
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-navy bg-gradient-to-br from-teal to-green hover:-translate-y-0.5 transition-all"
              >
                Abrir WhatsApp
              </a>
            )}
            <button
              onClick={() => {
                setForm(emptyForm);
                setStatus('idle');
                setWaUrl('');
              }}
              className="block mx-auto mt-4 text-[13px] text-ink-muted underline hover:text-teal"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Nombre completo *</label>
              <input required className={inputCls} placeholder="Tu nombre" value={form.nombreCompleto} onChange={(e) => set('nombreCompleto', e.target.value)} />
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Clínica / institución</label>
              <input className={inputCls} placeholder="Nombre de tu clínica" value={form.clinica} onChange={(e) => set('clinica', e.target.value)} />
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Cargo</label>
              <input className={inputCls} placeholder="Ej. Médico veterinario" value={form.cargo} onChange={(e) => set('cargo', e.target.value)} />
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Teléfono / WhatsApp *</label>
              <input required type="tel" className={inputCls} placeholder="Ej. 310 000 0000" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} />
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Correo</label>
              <input type="email" className={inputCls} placeholder="tucorreo@clinica.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Ciudad *</label>
              <input required className={inputCls} placeholder="Medellín" value={form.ciudad} onChange={(e) => set('ciudad', e.target.value)} />
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Tipo de institución</label>
              <select className={inputCls} value={form.tipoInstitucion} onChange={(e) => set('tipoInstitucion', e.target.value)}>
                <option value="">Selecciona…</option>
                {INSTITUTION_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Motivo de la solicitud</label>
              <select className={inputCls} value={form.tipo} onChange={(e) => set('tipo', e.target.value)}>
                <option value="cotizacion">Cotización</option>
                <option value="convenio">Convenio</option>
                <option value="recoleccion">Recolección de muestras</option>
                <option value="contacto">Otro / información</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[13px] font-semibold mb-2 text-navy">Servicios de interés</label>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((s) => {
                  const on = form.serviciosInteres.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleService(s)}
                      className={`px-3.5 py-2 rounded-full text-[13px] font-medium border transition ${
                        on
                          ? 'bg-navy text-teal border-navy'
                          : 'bg-white text-navy border-[#E7ECF1] hover:border-teal'
                      }`}
                    >
                      {on ? '✓ ' : ''}{s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[13px] font-semibold mb-1.5 text-navy">Mensaje</label>
              <textarea
                rows="4"
                className={inputCls}
                placeholder="Cuéntanos qué pruebas o servicios necesitas…"
                value={form.mensaje}
                onChange={(e) => set('mensaje', e.target.value)}
              />
            </div>

            {status === 'error' && (
              <div className="md:col-span-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {errorMsg}
              </div>
            )}

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-navy bg-gradient-to-br from-teal to-green shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando solicitud…' : 'Enviar solicitud por WhatsApp'}
              </button>
              <p className="text-[12px] text-ink-muted text-center mt-3">
                Al enviar, guardamos tu solicitud y abrimos WhatsApp para que la confirmes. No compartimos tus datos.
              </p>
            </div>
          </form>
        )}
      </div>
    </Reveal>
  );
}