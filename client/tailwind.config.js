/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(255, 255, 255, 0.1)',
        'custom-dark': '0 2px 10px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}