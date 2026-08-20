import { SITE, waLink } from '../config';
import Reveal from './Reveal';
import QuoteForm from './QuoteForm';

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gray-light">
      <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-teal-dim">Contacto</p>
            <h2 className="mt-2.5 text-[clamp(26px,3.4vw,38px)] font-extrabold leading-tight text-navy">
              Hablemos de tu próximo caso
            </h2>
            <p className="mt-4 text-ink-muted text-[15px] leading-relaxed">
              Escríbenos o visita nuestro laboratorio. Recibimos muestras y acompañamos a clínicas y
              hospitales veterinarios del área metropolitana.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 space-y-4">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="p-5 rounded-xl bg-white border border-[#E7ECF1] hover:border-teal transition flex items-start gap-4">
                  <span className="text-teal-dim text-xl mt-0.5">◎</span>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-wide mb-1">Dirección</h4>
                    <p className="text-navy font-medium text-[15px]">{SITE.addressShort}</p>
                  </div>
                </div>
              </a>
              <a href={SITE.phoneTel} className="block">
                <div className="p-5 rounded-xl bg-white border border-[#E7ECF1] hover:border-teal transition flex items-start gap-4">
                  <span className="text-teal-dim text-xl mt-0.5">☎</span>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-wide mb-1">Teléfono</h4>
                    <p className="text-navy font-medium text-[15px]">{SITE.phoneDisplay}</p>
                  </div>
                </div>
              </a>
              <a href={SITE.emailHref} className="block">
                <div className="p-5 rounded-xl bg-white border border-[#E7ECF1] hover:border-teal transition flex items-start gap-4">
                  <span className="text-teal-dim text-xl mt-0.5">✉</span>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-wide mb-1">Correo</h4>
                    <p className="text-navy font-medium text-[15px]">{SITE.email}</p>
                  </div>
                </div>
              </a>
              <div className="p-5 rounded-xl bg-white border border-[#E7ECF1] flex items-start gap-4">
                <span className="text-teal-dim text-xl mt-0.5">🕘</span>
                <div>
                  <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-wide mb-1">Horario</h4>
                  <p className="text-navy font-medium text-[15px]">{SITE.schedule}</p>
                </div>
              </div>
              <a
                href={waLink('info')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-navy bg-gradient-to-br from-teal to-green hover:-translate-y-0.5 transition-all"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}