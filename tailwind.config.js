/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        aura: '0 0 60px rgba(110, 168, 254, 0.2)',
      },
    },
  },
  plugins: [],
}

