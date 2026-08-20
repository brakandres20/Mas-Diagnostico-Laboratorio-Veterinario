import { SERVICES } from '../data/services';
import Reveal from './Reveal';

const ALL_CHIPS = SERVICES.flatMap((s) => s.chips);

export default function Trust() {
  return (
    <section className="py-20 bg-navy text-white overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 10%, rgba(34,211,184,0.14) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(52,211,153,0.1) 0%, transparent 60%)',
        }}
      />
      <div className="relative max-w-[1180px] mx-auto px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-teal">Pruebas disponibles</p>
          <h2 className="mt-2.5 text-[clamp(24px,3vw,34px)] font-extrabold leading-tight">
            Listo para acompañar cada caso clínico
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-wrap justify-center gap-2.5 mt-9 max-w-4xl mx-auto">
            {ALL_CHIPS.map((c) => (
              <span key={c} className="px-3.5 py-2 rounded-full text-[13px] bg-white/6 text-gray-light border border-white/10">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}