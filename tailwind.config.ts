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
        white: '#f9f9f0',
        mint: '#d5fad3',
        blue: '#badbee',
        coal: '#21201c',
        black: '#0f0e0b',
        'pure-black': '#000000',
        'pure-white': '#ffffff',
        ash: '#3d3b34',
        tan: '#9d937c',
        cream: '#efecca',
      },
      fontFamily: {
        serif: ['Season Serif', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['Akkurat Mono', 'SF Mono', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      fontSize: {
        'display-hero': ['120px', { lineHeight: '114px', letterSpacing: '-3.6px' }],
        'display-large': ['90px', { lineHeight: '85.5px', letterSpacing: '-1.8px' }],
        'display-medium': ['55px', { lineHeight: '55px', letterSpacing: '-1.1px' }],
        'heading-2xl': ['24px', { lineHeight: '26.4px', letterSpacing: '-0.48px' }],
        'body-large': ['18px', { lineHeight: '25.2px', letterSpacing: '0.18px' }],
        'body-base': ['16px', { lineHeight: '24px' }],
        'code-label': ['11px', { lineHeight: '14.3px', letterSpacing: '0.33px' }],
        'code-micro': ['9px', { lineHeight: '11.7px', letterSpacing: '0.18px' }],
      },
      borderRadius: {
        pill: '9999px',
        sharp: '0px',
      },
      spacing: {
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '30px',
        7: '40px',
        8: '45px',
        9: '50px',
        10: '60px',
        11: '120px',
        12: '150px',
        13: '180px',
      },
      boxShadow: {
        'inset-black': 'inset -1px 0px 0px 0px rgb(15,14,11)',
        'inset-tan': 'inset -1px 0px 0px 0px rgb(204,197,163)',
        'inset-blue': 'inset -1px 0px 0px 0px rgb(186,219,238)',
      },
      keyframes: {
        'draw-path': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'draw-path': 'draw-path 2s ease forwards',
        'fade-up': 'fade-up 0.7s ease forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
