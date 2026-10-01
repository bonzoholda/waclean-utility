/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wa: {
          dark: '#111b21',
          panel: '#202c33',
          border: '#222d34',
          green: '#00a884',
          light: '#005c4b',
          hover: '#2a3942',
        }
      }
    },
  },
  plugins: [],
}