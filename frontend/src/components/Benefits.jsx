import { BENEFITS } from '../data/services';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Alianzas B2B"
            title="Más que un laboratorio, un aliado para tu clínica"
            subtitle="Beneficios pensados para fortalecer el trabajo diario de tu equipo y de tu institución."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5.5">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="text-center p-7 rounded-xl hover:bg-gray-light transition-colors group h-full">
                <div className="w-16 h-16 rounded-full bg-navy text-teal flex items-center justify-center text-[22px] mx-auto mb-4 group-hover:scale-105 group-hover:bg-teal group-hover:text-navy transition-all">
                  {b.icon}
                </div>
                <h3 className="text-[15px] font-bold mb-2 tracking-wide text-navy">{b.title}</h3>
                <p className="text-[13.5px] text-ink-muted leading-relaxed">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}