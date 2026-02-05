/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        terminal: {
          dark: '#0b1221',
          light: '#f6f8fb',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(16, 185, 129, 0.35), 0 20px 60px rgba(0,0,0,0.35)',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}
