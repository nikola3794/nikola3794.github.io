/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/app.js', './assets/projects.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#30BAFB',
        'accent-dark': '#1a9fd8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '64rem',
      },
    },
  },
  // Tag pills + accent filter buttons are built from JS template strings; keep
  // their classes even if the content scanner misses a template literal.
  safelist: [
    'bg-accent', 'border-accent', 'text-accent',
    {
      pattern: /(text|bg|ring)-(blue|emerald|amber|violet)-(50|200|300|700|900|950)/,
      variants: ['dark'],
    },
  ],
}
