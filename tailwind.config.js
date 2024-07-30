module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{html,js}",
    "./src/**/**/*.{html,js}",
    "./src/**/**/**/*.{html,js}",
    "./src/**/**/**/**/*.{html,js}",
    "./src/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'cubode-darkblue': '#1e395c',
        'cubode-lightblue': '#80a5d6',
        'cubode-orange': '#ffb19a',

        'cubode-bg': '#g8g8g8',
        'cubode-bg-dark': '#1e1e1e'
      },
      height: {
        '40vh': '40vh',
        '30vh': '30vh',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}