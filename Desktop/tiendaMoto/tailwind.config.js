/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yamaha: {
          blue: '#0033A0',
          dark: '#001E60',
          light: '#E6F0FF'
        }
      }
    },
  },
  plugins: [],
}