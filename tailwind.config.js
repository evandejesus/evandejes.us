/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F0EFE9',
        ink: '#0E0E0D',
        volt: '#E9FF47',
        muted: '#898982',
      },
      fontFamily: {
        display: ['Polymath Display', 'sans-serif'],
        body: ['Polymath Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
