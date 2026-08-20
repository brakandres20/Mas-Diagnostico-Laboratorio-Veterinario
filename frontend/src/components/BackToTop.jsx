import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-6 z-40 w-11 h-11 rounded-full bg-navy text-teal border border-white/15 shadow-lg flex items-center justify-center text-lg transition-opacity ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bottom-[170px] lg:bottom-24`}
      style={{ transition: 'opacity 0.3s' }}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}