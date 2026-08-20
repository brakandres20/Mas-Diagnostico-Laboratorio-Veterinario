import { waLink } from '../config';
import Reveal from './Reveal';

export default function QuickQuote() {
  return (
    <section id="convenios" className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <Reveal>
            <div className="p-8 rounded-2xl bg-navy text-white relative overflow-hidden">
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(34,211,184,0.35) 0%, transparent 70%)' }}
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal">Convenios B2B</p>
              <h2 className="mt-2.5 text-[clamp(24px,3vw,34px)] font-extrabold leading-tight text-white">
                Construyamos una alianza con tu clínica
              </h2>
              <p className="mt-4 text-gray-mid text-[15px] leading-relaxed">
                Acceso a portafolio completo, condiciones para tu institución, recolección de muestras y
                acompañamiento técnico de nuestro equipo.
              </p>
              <a
                href={waLink('convenio')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-navy bg-gradient-to-br from-teal to-green hover:-translate-y-0.5 transition-all"
              >
                Hablar con el laboratorio
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-light border border-[#E7ECF1]">
                <span className="text-teal text-xl mt-0.5">⚙</span>
                <div>
                  <h4 className="text-[15px] font-bold text-navy">Dos jornadas de recolección</h4>
                  <p className="text-sm text-ink-muted mt-0.5">
                    Recogemos muestras en la mañana y en la tarde para que no detengas tu consulta.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-light border border-[#E7ECF1]">
                <span className="text-teal text-xl mt-0.5">✓</span>
                <div>
                  <h4 className="text-[15px] font-bold text-navy">Resultados con interfase</h4>
                  <p className="text-sm text-ink-muted mt-0.5">
                    Sistema de interfase que reduce errores de transcripción en cada resultado.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-light border border-[#E7ECF1]">
                <span className="text-teal text-xl mt-0.5">◎</span>
                <div>
                  <h4 className="text-[15px] font-bold text-navy">Acompañamiento veterinario</h4>
                  <p className="text-sm text-ink-muted mt-0.5">
                    Orientación para la selección e interpretación de pruebas especiales.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}