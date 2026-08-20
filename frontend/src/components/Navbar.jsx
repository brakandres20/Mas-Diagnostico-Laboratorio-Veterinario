import { useEffect, useState } from 'react';
import { SITE } from '../config';

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#tecnologia', label: 'Tecnología' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#convenios', label: 'Convenios' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{
        background: scrolled ? 'rgba(10,25,47,0.94)' : 'rgba(10,25,47,0.88)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-[1180px] mx-auto px-6 h-[74px] flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={close}>
          <img src="/logo-256.png" alt="Más Diagnóstico Laboratorio Veterinario" className="w-10 h-10 rounded-lg object-contain" loading="eager" />
          <span className="text-white font-extrabold text-[15px] leading-tight">
            Más Diagnóstico
            <small className="block font-mono text-[9px] tracking-[0.1em] text-teal uppercase">Laboratorio Veterinario</small>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'true' : undefined}
              className={`text-sm font-medium transition-colors ${
                active === l.href ? 'text-teal' : 'text-gray-mid hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#convenios"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-[13px] bg-gradient-to-br from-teal to-green text-navy shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all"
          >
            Solicitar cotización
          </a>
          <button
            className="lg:hidden w-10 h-10 rounded-[10px] bg-white/10 text-white text-lg flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-movil" className="lg:hidden flex flex-col bg-navy-2 border-t border-white/10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              aria-current={active === l.href ? 'true' : undefined}
              className={`px-6 py-3.5 text-[15px] border-b border-white/5 ${
                active === l.href ? 'text-teal' : 'text-gray-mid hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="#convenios" onClick={close} className="px-6 py-3.5 text-teal font-semibold">
            Solicitar cotización
          </a>
        </div>
      )}
    </header>
  );
}