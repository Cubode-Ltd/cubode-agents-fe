module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/**/**/*.{html,js}",
    "./src/**/**/**/*.{html,js}",
    "./src/**/**/**/**/*.{html,js}",
    "./src/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'cubode-darkblue': '#1e395c',
        'cubode-lightblue': '#80a5d6',
        'cubode-orange': '#ffb19a',
      },
      height: {
        '40vh': '40vh',
        '30vh': '30vh',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}