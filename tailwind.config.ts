import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#f9f9f0',
        ink:      '#0f0e0b',
        coal:     '#21201c',
        ash:      '#3d3b34',
        tan:      '#9d937c',
        mint:     '#d5fad3',
        blue:     '#badbee',
        cream:    '#efecca',
        sand:     '#f0efe6',
      },
      fontFamily: {
        display:           ['"Dopis"', 'system-ui', 'sans-serif'],
        'display-condensed': ['"Dopis Condensed"', 'system-ui', 'sans-serif'],
        serif:             ['"Season Serif"', 'Georgia', '"Times New Roman"', 'serif'],
        mono:              ['"Akkurat Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        drawPath: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        ticker:    'ticker 36s linear infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        float:     'float 4s ease-in-out infinite',
        'draw-path': 'drawPath 2s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
