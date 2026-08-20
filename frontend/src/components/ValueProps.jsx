import { VALUE_PROPS } from '../data/services';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function ValueProps() {
  return (
    <section id="nosotros" className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Por qué Más Diagnóstico"
            title="Un laboratorio construido para respaldar tu criterio clínico"
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5.5">
          {VALUE_PROPS.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="p-7 rounded-xl bg-gray-light border border-[#E7ECF1] hover:-translate-y-1 hover:shadow-soft hover:border-teal transition-all h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal to-green flex items-center justify-center text-navy text-xl mb-4">
                  {v.icon}
                </div>
                <h3 className="text-[17px] font-bold mb-2 text-navy">{v.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}