import { EQUIPMENT } from '../data/services';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

function initial(spec) {
  const words = spec.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean);
  return (words[0]?.[0] || 'X') + (words[1]?.[0] || '');
}

export default function Technology() {
  return (
    <section id="tecnologia" className="py-20 bg-navy text-white">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal>
          <SectionHeader eyebrow="Infraestructura" title="Tecnología que respalda cada resultado" light />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5.5">
          {EQUIPMENT.map((eq, i) => (
            <Reveal key={eq.title} delay={(i % 3) * 60}>
              <div
                className={`p-6 rounded-xl border transition-all hover:-translate-y-1 ${
                  eq.featured
                    ? 'bg-white/7 border-teal/40'
                    : 'bg-white/4 border-white/10 hover:border-teal'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-[13px] ${
                      eq.featured ? 'bg-teal/20 text-teal border border-teal/40' : 'bg-teal/10 text-teal border border-teal/30'
                    }`}
                  >
                    {initial(eq.spec)}
                  </div>
                  <img
                    src={eq.image}
                    alt={eq.title}
                    width="56"
                    height="56"
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-xl object-cover bg-white/5 border border-white/10"
                  />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-1">{eq.title}</h3>
                <p className="font-mono text-[11.5px] text-teal tracking-wide mb-2.5">{eq.spec}</p>
                <p className="text-[13.5px] text-gray-mid leading-relaxed mb-3.5">{eq.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {eq.chips.map((c) => (
                    <span
                      key={c}
                      className="text-[11.5px] px-3 py-1.5 rounded-full bg-white/6 text-white border border-white/15"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}