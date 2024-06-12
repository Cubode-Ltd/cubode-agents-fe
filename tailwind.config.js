module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cubode-darkblue': '#1e395c',
        'cubode-lightblue': '#80a5d6',
        'cubode-orange': '#ffb19a',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('daisyui')
  ],
}