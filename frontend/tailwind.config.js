/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'redCustom' : '#A62639',
        'blackCustom' : '#56494E',
        'blueCustom' : '#1a1a1a'
      }
    },
  },
  plugins: [],
}

