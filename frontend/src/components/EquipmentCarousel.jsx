import { useCallback, useEffect, useRef, useState } from 'react';
import { EQUIPMENT } from '../data/services';

const items = EQUIPMENT.map((e) => ({ tag: e.tag, title: e.title, img: e.image }));
const count = items.length;

function sizingFor(w) {
  if (w < 560) return { activeWidth: w * 0.72, activeHeight: 260, restWidth: 64, restHeight: 170, gap: 12 };
  if (w < 900) return { activeWidth: 460, activeHeight: 300, restWidth: 110, restHeight: 190, gap: 18 };
  return { activeWidth: 560, activeHeight: 330, restWidth: 150, restHeight: 210, gap: 22 };
}

export default function EquipmentCarousel() {
  const wrapRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(() => sizingFor(800));

  const R = Math.max(1, Math.min(6, Math.floor(count / 2) - 1)) || Math.floor(count / 2);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const update = () => setSize(sizingFor(wrap.clientWidth || 800));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const pausedRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % count);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const go = useCallback((d) => setIndex((i) => (i + d + count) % count), []);
  const goTo = useCallback((i) => setIndex(i), []);

  const swipeRef = useRef(null);
  const swipedRef = useRef(false);
  const onPointerDown = (e) => {
    pausedRef.current = true;
    swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const s = swipeRef.current;
    swipeRef.current = null;
    if (s) {
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        swipedRef.current = true;
        go(dx < 0 ? 1 : -1);
      }
    }
    setTimeout(() => {
      swipedRef.current = false;
      pausedRef.current = false;
    }, 5000);
  };
  const onPointerCancel = () => {
    swipeRef.current = null;
    setTimeout(() => {
      swipedRef.current = false;
      pausedRef.current = false;
    }, 5000);
  };

  const relOf = (i) => {
    let rel = ((i - index) % count + count) % count;
    if (rel > count / 2) rel -= count;
    return rel;
  };

  const c1 = size.activeWidth / 2 + size.gap + size.restWidth / 2;
  const pitch = size.restWidth + size.gap;

  return (
    <div
      className="coverflow-wrap"
      id="coverflow"
      ref={wrapRef}
      tabIndex="0"
      aria-label="Galería de equipos"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerCancel}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => {
        swipeRef.current = null;
        pausedRef.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        }
      }}
    >
      <div className="coverflow-track">
        {items.map((item, i) => {
          const rel = relOf(i);
          const ar = Math.abs(rel);
          const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
          const x = (rel < 0 ? -1 : 1) * mag;
          const a = Math.min(ar, 1);
          const width = size.activeWidth + (size.restWidth - size.activeWidth) * a;
          const height = size.activeHeight + (size.restHeight - size.activeHeight) * a;
          const radius = 16 * (1 - a) + 12 * a;
          const opacity = ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R);
          const z = Math.round(1000 - ar * 100);
          return (
            <div
              key={item.title}
              className={`cf-card${a > 0.5 ? ' is-rest' : ''}`}
              style={{ transform: `translateX(${x}px)`, zIndex: z, opacity }}
              onClick={() => {
                if (!swipedRef.current && i !== index) goTo(i);
              }}
            >
              <div
                className="cf-card-inner"
                style={{
                  width,
                  height,
                  borderRadius: radius,
                  boxShadow:
                    ar < 0.5 ? '0 24px 60px rgba(10,25,47,0.4)' : '0 12px 30px rgba(10,25,47,0.28)',
                }}
              >
                <div className="cf-img" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="cf-caption">
                  <p className="cf-tag">{item.tag}</p>
                  <h4>{item.title}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="cf-arrow cf-left" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior">‹</button>
      <button className="cf-arrow cf-right" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Siguiente">›</button>
    </div>
  );
}