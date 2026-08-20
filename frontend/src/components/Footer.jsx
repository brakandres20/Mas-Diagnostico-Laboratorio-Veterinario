import { SITE } from '../config';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-gray-mid">
      <div className="max-w-[1180px] mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo-256.png" alt="Más Diagnóstico Laboratorio Veterinario" width="36" height="36" decoding="async" className="w-9 h-9 rounded-lg object-contain" />
            <span className="text-white font-extrabold text-[15px]">
              Más Diagnóstico
              <small className="block font-mono text-[9px] tracking-[0.1em] text-teal uppercase">Laboratorio Veterinario</small>
            </span>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-gray-mid">
            Laboratorio veterinario de referencia en Medellín, con recolección de muestras para clínicas y
            hospitales del área metropolitana.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-[14px] uppercase tracking-wide mb-4">Contacto</h4>
          <ul className="space-y-2.5 text-[13.5px]">
            <li>{SITE.addressShort}</li>
            <li>
              <a href={SITE.phoneTel} className="hover:text-teal transition-colors">{SITE.phoneDisplay}</a>
            </li>
            <li>
              <a href={SITE.emailHref} className="hover:text-teal transition-colors">{SITE.email}</a>
            </li>
            <li>{SITE.schedule}</li>
            <li>{SITE.coverage}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-[14px] uppercase tracking-wide mb-4">Laboratorio</h4>
          <ul className="space-y-2.5 text-[13.5px]">
            <li><a href="#servicios" className="hover:text-teal transition-colors">Servicios</a></li>
            <li><a href="#tecnologia" className="hover:text-teal transition-colors">Equipos</a></li>
            <li><a href="#convenios" className="hover:text-teal transition-colors">Convenios</a></li>
            <li><a href="#contacto" className="hover:text-teal transition-colors">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 pb-[76px] lg:pb-5">
        <div className="max-w-[1180px] mx-auto px-6 flex flex-wrap justify-between gap-3 text-[12.5px] text-gray-mid">
          <span>© {year} {SITE.name}. Todos los derechos reservados.</span>
          <span className="font-mono">Medellín · Colombia</span>
        </div>
      </div>
    </footer>
  );
}