import { useEffect, useState } from 'react';
import { waLink } from '../config';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={waLink('info')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-navy bg-gradient-to-br from-teal to-green shadow-cta hover:shadow-cta-hover hover:-translate-y-1 transition-all animate-pulse-wa ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transition: 'opacity .3s, transform .2s' }}
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.02 3 3.35 8.67 3.35 15.69c0 2.24.59 4.42 1.7 6.35L3.24 29l7.15-1.87a12.63 12.63 0 0 0 5.64 1.36h.01c7.02 0 12.69-5.67 12.69-12.69C28.73 8.67 23.06 3 16.04 3Zm0 23.2h-.01a10.5 10.5 0 0 1-5.36-1.47l-.38-.23-4.24 1.11 1.13-4.13-.25-.39a10.46 10.46 0 0 1-1.61-5.6c0-5.8 4.72-10.52 10.53-10.52 2.81 0 5.45 1.1 7.44 3.08a10.45 10.45 0 0 1 3.08 7.45c0 5.8-4.72 10.51-10.52 10.51Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.58a9.58 9.58 0 0 1-1.76-2.2c-.19-.32-.02-.49.14-.65.14-.14.31-.37.47-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.76.75.32 1.34.52 1.79.66.75.24 1.44.21 1.98.13.6-.09 1.87-.77 2.13-1.51.26-.74.26-1.37.18-1.51-.08-.13-.29-.21-.6-.37Z" />
      </svg>
    </a>
  );
}