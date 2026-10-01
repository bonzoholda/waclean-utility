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
          dark: '#0b141a',
          panel: '#111b21',
          card: '#1f2c34',
          hover: '#2a3942',
          border: '#222d34',
          green: '#00a884',
          lightGreen: '#25d366',
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}