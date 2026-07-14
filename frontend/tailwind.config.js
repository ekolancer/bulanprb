/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F6F8',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#1E40AF',
          light: '#3B82F6',
          dim: '#1a37a0',
          deep: '#172e8a',
        },
        accent: {
          orange: '#E8621A',
        },
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        // Tinted shadows — carry hue of background
        'soft':       '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
        'soft-hover': '0 6px 24px rgba(30, 64, 175, 0.10), 0 2px 8px rgba(15, 23, 42, 0.06)',
        'soft-lg':    '0 12px 40px rgba(30, 64, 175, 0.12), 0 4px 12px rgba(15, 23, 42, 0.08)',
        'glow':       '0 0 0 3px rgba(30, 64, 175, 0.20)',
        'glow-orange':'0 0 0 3px rgba(232, 98, 26, 0.20)',
        'inner-glass':'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: ['Geist', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Geist', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'xxs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight:   '-0.025em',
        snug:    '-0.015em',
      },
      // Clean z-index scale — no 9999 anywhere
      zIndex: {
        base:    '0',
        raised:  '10',
        overlay: '20',
        sticky:  '30',
        fixed:   '40',
        modal:   '50',
        toast:   '60',
      },
      animation: {
        'marquee':      'marquee 35s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'slide-up':     'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'grain':        'grain 0.8s steps(1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Grain noise overlay flicker
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-2%, -3%)' },
          '20%':      { transform: 'translate(3%, 2%)' },
          '30%':      { transform: 'translate(-1%, 4%)' },
          '40%':      { transform: 'translate(4%, -1%)' },
          '50%':      { transform: 'translate(-3%, 3%)' },
          '60%':      { transform: 'translate(2%, -4%)' },
          '70%':      { transform: 'translate(-4%, 1%)' },
          '80%':      { transform: 'translate(1%, -2%)' },
          '90%':      { transform: 'translate(-2%, 4%)' },
        },
      },
    },
  },
  plugins: [],
}
