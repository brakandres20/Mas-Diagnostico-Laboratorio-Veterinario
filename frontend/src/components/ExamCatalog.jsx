import { useMemo, useState } from 'react';
import { PORTFOLIO } from '../data/portfolio';
import { waLink } from '../config';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function ExamCatalog() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Todos');

  const categories = ['Todos', ...PORTFOLIO.map((c) => c.category)];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PORTFOLIO.map((cat) => {
      const exams = cat.exams.filter((e) => {
        const inCat = active === 'Todos' || cat.category === active;
        if (!inCat) return false;
        if (!q) return true;
        return (
          e.name.toLowerCase().includes(q) ||
          (e.sample || '').toLowerCase().includes(q)
        );
      });
      return { ...cat, exams };
    }).filter((c) => c.exams.length > 0);
  }, [query, active]);

  const totalResults = filtered.reduce((a, c) => a + c.exams.length, 0);

  return (
    <section id="examenes" className="py-20 bg-gray-light">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Portafolio 2026"
            title="Catálogo de exámenes y perfiles"
            subtitle="Consulta nuestros exámenes, tipos de muestra y tarifas referenciales. Filtra por categoría o busca el examen que necesitas."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar examen o perfil…"
              aria-label="Buscar examen"
              className="w-full md:max-w-sm rounded-xl border border-[#E7ECF1] bg-white px-4 py-3 text-sm text-navy placeholder:text-ink-muted focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/30"
            />
            <p className="text-[13px] text-ink-muted">{totalResults} resultado{totalResults === 1 ? '' : 's'}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`px-3.5 py-2 rounded-full text-[13px] font-medium border transition ${
                  active === c
                    ? 'bg-navy text-teal border-navy'
                    : 'bg-white text-navy border-[#E7ECF1] hover:border-teal'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-8">
          {filtered.map((cat) => (
            <Reveal key={cat.category}>
              <h3 className="text-[15px] font-bold uppercase tracking-wide text-navy mb-3">{cat.category}</h3>
              <div className="grid gap-2">
                {cat.exams.map((exam, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-xl bg-white border border-[#E7ECF1] px-4 py-3 hover:border-teal transition"
                  >
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-navy truncate">{exam.name}</p>
                      {exam.sample && <p className="text-[12px] text-ink-muted mt-0.5">{exam.sample}</p>}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[14px] font-bold text-navy whitespace-nowrap">$ {exam.price}</span>
                      <a
                        href={waLink('cotizacion', `Examen de interés: ${exam.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] font-semibold text-teal hover:underline whitespace-nowrap"
                      >
                        Cotizar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-ink-muted py-10">No encontramos exámenes para tu búsqueda.</p>
          )}
        </div>

        <p className="mt-8 text-[12px] text-ink-muted text-center max-w-2xl mx-auto">
          Tarifas referenciales antes de IVA. Los precios pueden variar sin previo aviso. Solicita el portafolio
          completo y las tarifas vigentes por WhatsApp.
        </p>
      </div>
    </section>
  );
}