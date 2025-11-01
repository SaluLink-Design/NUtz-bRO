/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9F62ED',
          light: '#B98BF3',
          dark: '#7848B8'
        },
        secondary: {
          DEFAULT: '#1C1C1C',
          light: '#2D2D2D',
          dark: '#0D0D0D'
        }
      }
    },
  },
  plugins: [],
}

