import { waLink } from '../config';

export default function MobileCTA() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-white/10 bg-navy/95 backdrop-blur px-3 pt-2.5 pb-2.5 flex gap-2.5"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href={waLink('info')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-[13px] text-navy bg-gradient-to-br from-teal to-green"
      >
        WhatsApp
      </a>
      <a
        href="#convenios"
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-[13px] text-white border border-white/30"
      >
        Solicitar cotización
      </a>
    </div>
  );
}