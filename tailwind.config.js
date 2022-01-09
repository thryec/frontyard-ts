module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightblack: '#0D0D0D',
        lightgrey: '#F3F3F3',
        forestgreen: '#0B1C03',
        lightorange: '#F5AA5B',
        sand: '#F4F2EC',
        grey: '#ebebeb',
      },
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
        Lora: ['Lora', 'serif'],
        Montserrat: ['Montserrat', 'sans-serif'],
        OpenSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
