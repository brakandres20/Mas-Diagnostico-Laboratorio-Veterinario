import { SERVICES } from '../data/services';
import { waLink } from '../config';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

function Card({ s }) {
  return (
    <div
      className={`rounded-xl border p-6 flex flex-col transition-all hover:-translate-y-1 hover:shadow-card ${
        s.premium
          ? 'bg-gradient-to-br from-navy to-navy-3 text-white border-white/10 hover:border-teal'
          : 'bg-white border-[#E7ECF1] hover:border-teal'
      }`}
    >
      {s.premium && (
        <span className="absolute top-[18px] right-[18px] font-mono text-[9px] tracking-[0.1em] text-teal">
          ★ EQUIPO DESTACADO
        </span>
      )}
      <p className={`font-mono text-[11px] uppercase tracking-[0.08em] mb-2.5 ${s.premium ? 'text-teal' : 'text-teal-dim'}`}>
        {s.tag}
      </p>
      <h3 className={`text-[18px] font-bold mb-1.5 ${s.premium ? 'text-white' : 'text-navy'}`}>{s.title}</h3>
      <p className={`text-[13px] mb-3.5 font-mono ${s.premium ? 'text-gray-mid' : 'text-ink-muted'}`}>
        {s.equipment}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {s.chips.map((c) => (
          <span
            key={c}
            className={`text-xs px-3 py-1.5 rounded-full ${
              s.premium
                ? 'bg-white/10 text-white border border-white/15'
                : 'bg-gray-light text-navy border border-[#E7ECF1]'
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="servicios" className="py-20 bg-gray-light">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Portafolio"
            title="Nuestro portafolio de diagnóstico"
            subtitle="Áreas de análisis disponibles para clínicas, hospitales veterinarios y profesionales del sector."
          />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5.5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 60} className={s.premium ? 'relative' : ''}>
              <Card s={s} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 p-6 rounded-xl bg-white border border-[#E7ECF1] flex items-center justify-between gap-5 flex-wrap">
            <div>
              <strong className="block text-[15px] text-navy mb-0.5">Portafolio completo con tarifas</strong>
              <p className="text-sm text-ink-muted">
                Consulta el listado completo de exámenes, perfiles y tipo de muestra requerida.
              </p>
            </div>
            <a
              href={waLink('portafolio')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-[13px] text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white transition-colors"
            >
              Solicitar portafolio por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}