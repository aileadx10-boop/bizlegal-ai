import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:   '#050608',
        deep:    '#090b11',
        surface: '#0d1018',
        border:  '#181d2c',
        'border-light': '#222840',
        text:    '#c8cdd8',
        'text-bright': '#e8ecf4',
        muted:   '#4a5468',
        amber:   '#d4a843',
        'amber-dim': '#8c6b24',
        danger:  '#c0392b',
        warning: '#e67e22',
        safe:    '#1e8449',
      },
      fontFamily: {
        mono:  ['"DM Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
