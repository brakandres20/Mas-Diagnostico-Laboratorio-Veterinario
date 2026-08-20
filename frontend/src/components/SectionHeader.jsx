export default function SectionHeader({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="max-w-2xl mb-12">
      <p
        className="font-mono text-xs uppercase tracking-[0.14em] font-semibold"
        style={{ color: light ? '#22D3B8' : '#1AA894' }}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2.5 text-[clamp(26px,3.4vw,38px)] font-extrabold leading-tight ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base leading-relaxed ${light ? 'text-gray-mid' : 'text-ink-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}