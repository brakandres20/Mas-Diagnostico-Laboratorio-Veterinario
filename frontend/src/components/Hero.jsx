import { useEffect, useRef } from 'react';

function Waveform() {
  const poly1Ref = useRef(null);
  const poly2Ref = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const W = 800;
    const H = 340;
    const POINTS = 60;
    let t = 0;

    const dots = [];
    for (let i = 0; i < 70; i++) {
      const d = document.createElement('span');
      const cx = 20 + Math.random() * 760;
      const cy = 60 + Math.random() * 240;
      d.style.left = `${cx}px`;
      d.style.top = `${cy}px`;
      d.style.opacity = (0.25 + Math.random() * 0.6).toFixed(2);
      dotsRef.current.appendChild(d);
      dots.push(d);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function genPoints(offset, amp, freq, baseline) {
      const pts = [];
      for (let i = 0; i <= POINTS; i++) {
        const x = (i / POINTS) * W;
        const y =
          baseline +
          Math.sin((i / POINTS) * Math.PI * freq + offset) * amp * (0.5 + 0.5 * Math.sin((i / POINTS) * Math.PI));
        pts.push(`${x},${y}`);
      }
      return pts.join(' ');
    }

    function animate() {
      t += reduceMotion ? 0 : 0.02;
      poly1Ref.current.setAttribute('points', genPoints(t, 46, 5, 190));
      poly2Ref.current.setAttribute('points', genPoints(t * 1.3 + 1, 30, 7, 230));
      if (!reduceMotion) requestAnimationFrame(animate);
    }
    animate();

    return () => {
      dots.forEach((d) => d.remove());
      if (!reduceMotion) cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <div className="waveform-wrap">
      <svg className="wave-line" viewBox="0 0 800 340" preserveAspectRatio="none">
        <polyline ref={poly1Ref} fill="none" stroke="#22D3B8" strokeWidth="2" opacity="0.9" points="" />
        <polyline ref={poly2Ref} fill="none" stroke="#34D399" strokeWidth="1.4" opacity="0.5" points="" />
      </svg>
      <div className="wave-dots" ref={dotsRef} />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative text-white pt-[110px] pb-[90px] overflow-hidden"
      style={{ background: 'radial-gradient(120% 100% at 15% 0%, #123156 0%, #0A192F 55%, #071527 100%)' }}
    >
      <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-teal">
            Laboratorio veterinario de referencia · Medellín
          </p>
          <h1 className="mt-3.5 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-tight text-white">
            Diagnóstico veterinario confiable para{' '}
            <span className="bg-gradient-to-r from-teal to-green bg-clip-text text-transparent">
              profesionales que necesitan precisión
            </span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-gray-mid max-w-[520px]">
            Laboratorio veterinario de referencia con tecnología especializada, resultados confiables y
            servicio de recolección de muestras en Medellín y el área metropolitana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#convenios"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold bg-gradient-to-br from-teal to-green text-navy shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all"
            >
              Solicitar cotización
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-all"
            >
              Conocer nuestro portafolio
            </a>
          </div>
          <div className="mt-11 flex gap-7 flex-wrap">
            <div className="border-l-2 border-teal pl-2.5 font-mono text-xs text-gray-mid">
              <strong className="block text-white font-body font-bold text-[15px]">2 jornadas</strong>
              Recolección diaria
            </div>
            <div className="border-l-2 border-teal pl-2.5 font-mono text-xs text-gray-mid">
              <strong className="block text-white font-body font-bold text-[15px]">7 áreas</strong>
              Química, hematología, hormonas…
            </div>
            <div className="border-l-2 border-teal pl-2.5 font-mono text-xs text-gray-mid">
              <strong className="block text-white font-body font-bold text-[15px]">Interfase</strong>
              Trazabilidad de resultados
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Waveform />
        </div>
      </div>
    </section>
  );
}