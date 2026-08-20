import { waLink } from '../config';
import Reveal from './Reveal';

export default function HomeService() {
  return (
    <section className="py-20">
      <div className="mx-6">
        <Reveal>
          <div
            className="rounded-3xl py-16 px-12 relative overflow-hidden text-navy"
            style={{ background: 'linear-gradient(135deg, #22D3B8 0%, #34D399 100%)' }}
          >
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center relative z-10">
              <div>
                <p className="font-mono text-[13px] font-bold uppercase tracking-wide opacity-75 mb-2.5">
                  Recolección de muestras
                </p>
                <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold leading-tight text-navy">
                  Recogemos tus muestras
                </h2>
                <p className="text-xl font-bold mt-3.5">Tu clínica, nuestro laboratorio.</p>
                <p className="text-[15px] leading-relaxed opacity-90 max-w-[460px] mt-3">
                  Servicio de recolección de muestras para profesionales veterinarios en Medellín y el
                  área metropolitana.
                </p>
                <a
                  href={waLink('recoleccion')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white transition-colors mt-6"
                >
                  Solicitar recolección
                </a>
              </div>
              <div className="bg-navy/8 rounded-2xl p-6 border border-navy/15">
                <div className="flex items-center gap-3.5 py-3 border-b border-navy/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-navy shrink-0" />
                  <div>
                    <strong className="block text-sm">Jornada de la mañana</strong>
                    <span className="text-[12.5px] opacity-75 font-mono">Recolección programada AM</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 py-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-navy shrink-0" />
                  <div>
                    <strong className="block text-sm">Jornada de la tarde</strong>
                    <span className="text-[12.5px] opacity-75 font-mono">Recolección programada PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}