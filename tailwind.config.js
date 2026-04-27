/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d0d0d',
        'purple-accent': '#914bf1',
        'card-bg': 'rgba(43,44,46,0.57)',
        'project-card': 'rgba(39,40,41,0.52)',
        'nav-bg': 'rgba(26,27,27,0.80)',
        'input-bg': '#272829',
        'card-orange': '#f46c38',
        'card-lime': '#c5ff41',
        'hover-card': 'rgba(62,60,60,0.71)',
        'hover-bg': '#272829',
        'tool-text': '#47494b',
      },
      fontFamily: {
        montserrat: ['"Montserrat"', 'serif'],
        outfit: ['"Outfit"', '"Outfit Placeholder"', 'sans-serif'],
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        blink: 'blink 0.7s infinite',
      },
      screens: {
        'max-1442': { max: '1442px' },
        'max-1025': { max: '1025px' },
        'max-992': { max: '992px' },
        'max-920': { max: '920px' },
        'max-563': { max: '563px' },
        'max-451': { max: '451px' },
        'max-445': { max: '445px' },
        'max-426': { max: '426px' },
        'max-384': { max: '384px' },
        'max-372': { max: '372px' },
      },
    },
  },
  plugins: [],
}
