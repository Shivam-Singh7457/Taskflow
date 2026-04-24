/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: { 50:'#FFF5F0', 100:'#FFE8DC', 200:'#FFCDB5', 400:'#F4956A', 600:'#D4622E' },
        cream: { 50:'#FDFAF6', 100:'#F7F1E8', 200:'#EDE3D3', 400:'#C8B49A' },
        ink:   { DEFAULT:'#2C1A0E', mid:'#6B4226' }
      }
    }
  },
  plugins: []
}
