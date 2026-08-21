import { useMemo, useState } from 'react';
import { createQuote } from '../api/client';
import { INSTITUTION_TYPES, SERVICE_OPTIONS } from '../data/services';
import { PORTFOLIO } from '../data/portfolio';
import Reveal from './Reveal';

// Lista plana de exámenes (sin precios) para la búsqueda del formulario.
const ALL_EXAMS = PORTFOLIO.flatMap((cat) =>
  cat.exams.map((e) => ({ name: e.name, category: cat.category }))
);

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(key, form) {
  switch (key) {
    case 'nombreCompleto':
      return form.nombreCompleto.trim() ? '' : 'Ingresa tu nombre.';
    case 'telefono': {
      const digits = form.telefono.replace(/\D/g, '');
      if (!form.telefono.trim()) return 'Ingresa tu teléfono.';
      if (digits.length < 7) return 'Ingresa un teléfono válido.';
      return '';
    }
    case 'email':
      return form.email && !EMAIL_RE.test(form.email) ? 'Ingresa un correo válido.' : '';
    case 'ciudad':
      return form.ciudad.trim() ? '' : 'Ingresa la ciudad.';
    default:
      return '';
  }
}

function validateAll(form) {
  return ['nombreCompleto', 'telefono', 'email', 'ciudad'].reduce((acc, k) => {
    const msg = validateField(k, form);
    if (msg) acc[k] = msg;
    return acc;
  }, {});
}

export default function QuoteForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [waUrl, setWaUrl] = useState('');
  const [waEnviado, setWaEnviado] = useState(false);

  // Selección de exámenes (opcional): búsqueda + multi-selección.
  const [examenes, setExamenes] = useState([]); // [{ name, category }]
  const [examQuery, setExamQuery] = useState('');

  const examResults = useMemo(() => {
    const q = examQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_EXAMS.filter((e) => e.name.toLowerCase().includes(q)).slice(0, 8);
  }, [examQuery]);

  const isSelected = (r) => examenes.some((s) => s.name === r.name && s.category === r.category);
  const toggleExam = (r) =>
    setExamenes((prev) => (isSelected(r) ? prev.filter((s) => !(s.name === r.name && s.category === r.category)) : [...prev, r]));

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors((e) => ({ ...e, [key]: validateField(key, { ...form, [key]: value }) }));
    }
  };

  const blurField = (key) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateField(key, form) }));
  };

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
    const errs = validateAll(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched((t) => ({ ...t, nombreCompleto: true, telefono: true, email: true, ciudad: true }));
      const first = Object.keys(errs)[0];
      const el = document.getElementById(`campo-${first}`);
      if (el) el.focus();
      return;
    }

     setStatus('sending');
    setErrorMsg('');
    try {
      const payload = { ...form, examenes: examenes.map((e) => e.name) };
      const data = await createQuote(payload);
      setWaEnviado(Boolean(data?.waEnviado));
      if (data?.waLink) {
        setWaUrl(data.waLink);
        window.open(data.waLink, '_blank', 'noopener,noreferrer');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0] ||
          'No pudimos preparar tu solicitud. Intenta de nuevo o escríbenos directamente por WhatsApp.'
      );
    }
  };

  const fieldState = (key) => {
    if (errors[key]) return 'error';
    if (touched[key] && !errors[key] && String(form[key] ?? '').trim()) return 'valid';
    return 'idle';
  };

  const inputCls = (state) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-ink-muted focus:outline-none focus:ring-2 transition ${
      state === 'error'
        ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
        : state === 'valid'
        ? 'border-green-400 focus:border-green-400 focus:ring-green-200'
        : 'border-[#E7ECF1] focus:border-teal focus:ring-teal/30'
    }`;

  const fieldErr = (key) =>
    errors[key] ? <span className="mt-1 block text-[12px] text-red-600">{errors[key]}</span> : null;

  const indicator = (key) => {
    const st = fieldState(key);
    if (st === 'valid') return <span className="text-green-500 text-sm">✓</span>;
    if (st === 'error') return <span className="text-red-400 text-sm">!</span>;
    return null;
  };

  return (
    <Reveal>
      <div className="rounded-2xl overflow-hidden shadow-card border border-[#E7ECF1]">
        <div className="bg-navy px-8 py-6">
          <h3 className="text-white text-xl font-extrabold">Solicita tu cotización</h3>
          <p className="text-gray-mid text-sm mt-1">
            Busca y selecciona los exámenes que necesitas (opcional). Si aún no los tienes
            listados, un asesor del laboratorio te ayudará a armar la cotización.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green/15 text-green flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>
            <h4 className="text-navy text-lg font-bold">Solicitud lista</h4>
            <p className="text-ink-muted text-sm mt-2 mb-6 max-w-md mx-auto">
              {waEnviado
                ? 'Confirmamos que tu solicitud fue enviada al laboratorio. Te responderemos lo antes posible.'
                : 'Abrimos WhatsApp con el resumen de tu solicitud. Envíalo y te responderemos lo antes posible.'}
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
                setErrors({});
                setTouched({});
                setStatus('idle');
                setWaUrl('');
                setExamenes([]);
                setExamQuery('');
              }}
              className="block mx-auto mt-4 text-[13px] text-ink-muted underline hover:text-teal"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-8 grid md:grid-cols-2 gap-4 [&>*]:min-w-0">
            <div className="hidden" aria-hidden="true">
              <input type="text" name="empresa" tabIndex={-1} autoComplete="off" value={form.empresa || ''} onChange={(e) => setField('empresa', e.target.value)} />
            </div>
            <div>
              <label htmlFor="campo-nombreCompleto" className="flex items-center justify-between text-[13px] font-semibold mb-1.5 text-navy">
                <span>Nombre completo *</span>
                {indicator('nombreCompleto')}
              </label>
              <input
                id="campo-nombreCompleto"
                required
                maxLength={120}
                className={inputCls(fieldState('nombreCompleto'))}
                placeholder="Tu nombre"
                value={form.nombreCompleto}
                onChange={(e) => setField('nombreCompleto', e.target.value)}
                onBlur={() => blurField('nombreCompleto')}
                aria-invalid={Boolean(errors.nombreCompleto)}
                aria-describedby={errors.nombreCompleto ? 'err-nombreCompleto' : undefined}
              />
              {errors.nombreCompleto && <span id="err-nombreCompleto" className="mt-1 block text-[12px] text-red-600">{errors.nombreCompleto}</span>}
            </div>
            <div>
              <label htmlFor="campo-clinica" className="block text-[13px] font-semibold mb-1.5 text-navy">Clínica / institución</label>
              <input id="campo-clinica" maxLength={120} className={inputCls('idle')} placeholder="Nombre de tu clínica" value={form.clinica} onChange={(e) => setField('clinica', e.target.value)} />
            </div>
            <div>
              <label htmlFor="campo-cargo" className="block text-[13px] font-semibold mb-1.5 text-navy">Cargo</label>
              <input id="campo-cargo" maxLength={80} className={inputCls('idle')} placeholder="Ej. Médico veterinario" value={form.cargo} onChange={(e) => setField('cargo', e.target.value)} />
            </div>
            <div>
              <label htmlFor="campo-telefono" className="flex items-center justify-between text-[13px] font-semibold mb-1.5 text-navy">
                <span>Teléfono / WhatsApp *</span>
                {indicator('telefono')}
              </label>
              <input
                id="campo-telefono"
                required
                type="tel"
                inputMode="tel"
                maxLength={30}
                className={inputCls(fieldState('telefono'))}
                placeholder="Ej. 310 000 0000"
                value={form.telefono}
                onChange={(e) => setField('telefono', e.target.value)}
                onBlur={() => blurField('telefono')}
                aria-invalid={Boolean(errors.telefono)}
                aria-describedby={errors.telefono ? 'err-telefono' : undefined}
              />
              {errors.telefono && <span id="err-telefono" className="mt-1 block text-[12px] text-red-600">{errors.telefono}</span>}
            </div>
            <div>
              <label htmlFor="campo-email" className="flex items-center justify-between text-[13px] font-semibold mb-1.5 text-navy">
                <span>Correo</span>
                {indicator('email')}
              </label>
              <input
                id="campo-email"
                type="email"
                maxLength={120}
                className={inputCls(fieldState('email'))}
                placeholder="tucorreo@clinica.com"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => blurField('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && <span id="err-email" className="mt-1 block text-[12px] text-red-600">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="campo-ciudad" className="flex items-center justify-between text-[13px] font-semibold mb-1.5 text-navy">
                <span>Ciudad *</span>
                {indicator('ciudad')}
              </label>
              <input
                id="campo-ciudad"
                required
                maxLength={80}
                className={inputCls(fieldState('ciudad'))}
                placeholder="Medellín"
                value={form.ciudad}
                onChange={(e) => setField('ciudad', e.target.value)}
                onBlur={() => blurField('ciudad')}
                aria-invalid={Boolean(errors.ciudad)}
                aria-describedby={errors.ciudad ? 'err-ciudad' : undefined}
              />
              {errors.ciudad && <span id="err-ciudad" className="mt-1 block text-[12px] text-red-600">{errors.ciudad}</span>}
            </div>
            <div>
              <label htmlFor="campo-tipoInstitucion" className="block text-[13px] font-semibold mb-1.5 text-navy">Tipo de institución</label>
              <select id="campo-tipoInstitucion" className={inputCls('idle')} value={form.tipoInstitucion} onChange={(e) => setField('tipoInstitucion', e.target.value)}>
                <option value="">Selecciona…</option>
                {INSTITUTION_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="campo-tipo" className="block text-[13px] font-semibold mb-1.5 text-navy">Motivo de la solicitud</label>
              <select id="campo-tipo" className={inputCls('idle')} value={form.tipo} onChange={(e) => setField('tipo', e.target.value)}>
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

            <div className="md:col-span-2 min-w-0">
              <label htmlFor="campo-examenes" className="block text-[13px] font-semibold mb-1.5 text-navy">
                Exámenes de interés <span className="font-normal text-ink-muted">(opcional)</span>
              </label>

              {examenes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {examenes.map((s) => (
                    <span
                      key={`${s.category}|${s.name}`}
                      className="inline-flex items-center gap-1.5 max-w-full px-3 py-1.5 rounded-full text-[12.5px] font-medium bg-navy text-teal border border-navy"
                    >
                      <span className="truncate min-w-0" title={s.name}>
                        {s.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExam(s)}
                        aria-label={`Quitar ${s.name}`}
                        className="text-teal/80 hover:text-white leading-none shrink-0"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <input
                id="campo-examenes"
                type="text"
                autoComplete="off"
                value={examQuery}
                onChange={(e) => setExamQuery(e.target.value)}
                placeholder="Buscar examen o perfil…"
                className={inputCls('idle')}
                aria-describedby="hint-examenes"
              />

              {examQuery.trim() && (
                <div className="mt-2 rounded-xl border border-[#E7ECF1] bg-white max-h-60 overflow-auto">
                  {examResults.length === 0 ? (
                    <p className="px-4 py-3 text-[13px] text-ink-muted">Sin coincidencias.</p>
                  ) : (
                    examResults.map((r) => {
                      const on = isSelected(r);
                      return (
                        <button
                          type="button"
                          key={`${r.category}|${r.name}`}
                          onClick={() => toggleExam(r)}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 border-b border-[#F0F3F6] last:border-0 transition ${
                            on ? 'bg-teal/10' : 'hover:bg-gray-light'
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block text-[13.5px] text-navy truncate">{r.name}</span>
                            <span className="block text-[11px] text-ink-muted">{r.category}</span>
                          </span>
                          <span className={`shrink-0 text-[12px] font-semibold ${on ? 'text-teal' : 'text-ink-muted'}`}>
                            {on ? 'Agregado ✓' : 'Agregar'}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              <p id="hint-examenes" className="mt-1.5 text-[12px] text-ink-muted">
                Selecciona uno o varios exámenes. Si aún no los tienes claros, un asesor del laboratorio te ayudará a
                armar la cotización.
              </p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="campo-mensaje" className="block text-[13px] font-semibold mb-1.5 text-navy">Mensaje</label>
              <textarea
                id="campo-mensaje"
                rows="4"
                maxLength={1000}
                className={inputCls('idle')}
                placeholder="Cuéntanos qué pruebas o servicios necesitas…"
                value={form.mensaje}
                onChange={(e) => setField('mensaje', e.target.value)}
              />
            </div>

            {status === 'error' && (
              <div role="alert" className="md:col-span-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
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