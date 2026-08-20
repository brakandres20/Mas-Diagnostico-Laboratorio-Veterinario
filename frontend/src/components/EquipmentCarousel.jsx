import { useEffect, useRef, useState } from 'react';
import { EQUIPMENT } from '../data/services';

const items = EQUIPMENT.map((e) => ({ tag: e.tag, title: e.title, img: e.image }));

function sizingFor(w) {
  if (w < 560) return { activeWidth: w * 0.72, activeHeight: 260, restWidth: 64, restHeight: 170, gap: 12 };
  if (w < 900) return { activeWidth: 460, activeHeight: 300, restWidth: 110, restHeight: 190, gap: 18 };
  return { activeWidth: 560, activeHeight: 330, restWidth: 150, restHeight: 210, gap: 22 };
}

export default function EquipmentCarousel() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [sizing, setSizing] = useState(null);

  const count = items.length;
  const R = Math.max(1, Math.min(6, Math.floor(count / 2) - 1)) || Math.floor(count / 2);

  const stateRef = useRef({ pos: 0, target: 0, raf: null, lastT: null, dwellAcc: 0, hovered: false, autoplaying: true, dir: 1 });

  function relOf(index, pos) {
    let rel = (((index - pos) % count) + count) % count;
    if (rel > count / 2) rel -= count;
    return rel;
  }
  function xForRel(rel, s, gap) {
    const ar = Math.abs(rel);
    const c1 = s.activeWidth / 2 + gap + s.restWidth / 2;
    const pitch = s.restWidth + gap;
    const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
    return (rel < 0 ? -1 : 1) * mag;
  }
  function blendForRel(rel) {
    return Math.min(Math.abs(rel), 1);
  }

  function render(s) {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const rel = relOf(i, stateRef.current.pos);
      const ar = Math.abs(rel);
      const x = xForRel(rel, s, s.gap);
      const a = blendForRel(rel);
      const width = s.activeWidth + (s.restWidth - s.activeWidth) * a;
      const height = s.activeHeight + (s.restHeight - s.activeHeight) * a;
      const radius = 16 * (1 - a) + 12 * a;
      const opacity = ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R);
      const z = Math.round(1000 - ar * 100);
      const inner = card.querySelector('.cf-card-inner');
      card.style.transform = `translateX(${x}px)`;
      card.style.zIndex = z;
      card.style.opacity = opacity;
      inner.style.width = `${width}px`;
      inner.style.height = `${height}px`;
      inner.style.borderRadius = `${radius}px`;
      inner.style.boxShadow = ar < 0.5 ? '0 24px 60px rgba(10,25,47,0.4)' : '0 12px 30px rgba(10,25,47,0.28)';
      card.classList.toggle('is-rest', a > 0.5);
    });
  }

  function ensureRunning(s) {
    const st = stateRef.current;
    if (st.raf == null) {
      st.lastT = null;
      st.raf = requestAnimationFrame(tick);
    }
  }
  function tick(t) {
    const st = stateRef.current;
    const last = st.lastT ?? t;
    const dt = Math.min((t - last) / 1000, 1 / 30);
    st.lastT = t;
    const diff = st.target - st.pos;
    const step = (1 / 0.5) * dt;
    const arriving = Math.abs(diff) <= step;
    if (arriving) {
      st.pos = st.target;
      render(sizing);
      if (st.autoplaying && !st.hovered) {
        st.dwellAcc += dt;
        if (st.dwellAcc >= 3.2) {
          st.dwellAcc = 0;
          st.target += st.dir;
        }
        st.raf = requestAnimationFrame(tick);
        return;
      }
      st.raf = null;
      st.lastT = null;
      return;
    }
    st.pos += Math.sign(diff) * step;
    render(sizing);
    st.raf = requestAnimationFrame(tick);
  }
  const goNext = () => {
    stateRef.current.target += 1;
    ensureRunning(sizing);
  };
  const goPrev = () => {
    stateRef.current.target -= 1;
    ensureRunning(sizing);
  };
  const goTo = (index) => {
    const st = stateRef.current;
    let d = index - st.target;
    d = ((d % count) + count) % count;
    if (d > count / 2) d -= count;
    st.target += d;
    ensureRunning(sizing);
  };

  useEffect(() => {
    setSizing(sizingFor(wrapRef.current.clientWidth));
  }, []);

  useEffect(() => {
    if (!sizing) return;
    const wrap = wrapRef.current;
    const st = stateRef.current;

    const onResize = () => setSizing(sizingFor(wrap.clientWidth));
    window.addEventListener('resize', onResize);
    wrap.addEventListener('mouseenter', () => (st.hovered = true));
    wrap.addEventListener('mouseleave', () => {
      st.hovered = false;
      ensureRunning(sizing);
    });
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    wrap.addEventListener('keydown', onKey);

    render(sizing);
    ensureRunning(sizing);

    return () => {
      window.removeEventListener('resize', onResize);
      wrap.removeEventListener('mouseenter', () => (st.hovered = true));
      wrap.removeEventListener('mouseleave', () => (st.hovered = false));
      wrap.removeEventListener('keydown', onKey);
      if (st.raf) cancelAnimationFrame(st.raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizing]);

  return (
    <div className="coverflow-wrap" id="coverflow" ref={wrapRef} tabIndex="0" aria-label="Galería de equipos">
      <div className="coverflow-track" ref={trackRef}>
        {items.map((item, i) => (
          <div
            key={item.title}
            className="cf-card"
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => goTo(i)}
          >
            <div className="cf-card-inner">
              <div
                className="cf-img"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="cf-caption">
                <p className="cf-tag">{item.tag}</p>
                <h4>{item.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="cf-arrow cf-left" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Anterior">‹</button>
      <button className="cf-arrow cf-right" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Siguiente">›</button>
    </div>
  );
}