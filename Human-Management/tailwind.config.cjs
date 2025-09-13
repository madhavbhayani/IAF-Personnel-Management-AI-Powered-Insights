/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iaf: {
          blue: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}