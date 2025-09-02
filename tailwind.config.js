/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#f5f5f5',
        muted: '#151515',
        card: '#141414',
        border: '#262626',
        accent: '#ff6a00'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space)', 'Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl: '16px' },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.4)'
      }
    },
  },
  plugins: [],
}
