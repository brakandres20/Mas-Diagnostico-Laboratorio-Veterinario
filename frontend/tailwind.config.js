/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A192F',
        'navy-2': '#0E2340',
        'navy-3': '#123156',
        teal: '#22D3B8',
        'teal-dim': '#1AA894',
        green: '#34D399',
        'gray-light': '#F3F6F8',
        'gray-mid': '#B9C4D1',
        'ink-muted': '#7C8CA3',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl: '16px',
      },
      boxShadow: {
        soft: '0 16px 32px -18px rgba(10,25,47,0.25)',
        card: '0 18px 34px -20px rgba(10,25,47,0.3)',
        cta: '0 8px 24px -8px rgba(34,211,184,0.55)',
        'cta-hover': '0 12px 28px -6px rgba(34,211,184,0.7)',
      },
      animation: {
        'pulse-wa': 'pulseWa 2.6s ease-in-out infinite',
        'fade-up': 'fadeUp .6s ease both',
      },
      keyframes: {
        pulseWa: {
          '0%, 100%': { boxShadow: '0 12px 30px -8px rgba(34,211,184,0.6)' },
          '50%': { boxShadow: '0 12px 40px -4px rgba(34,211,184,0.85)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};