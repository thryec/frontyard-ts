module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightblack: '#0D0D0D',
        lightgrey: '#F3F3F3',
        forestgreen: '#0B1C03',
        // lightorange: '#F3BA2F',
        lightorange: '#F5AA5B',
        brightorange: '#F7931A',
        // sand: '#F4F2EC',
        sand: '#FFFFFF',
        mblue: '#006097',
        footerbg: '#262626',
        grey: '#ebebeb',
      },
      fontFamily: {
        // Lato: ['Lato', 'sans-serif'],
        // Lora: ['Lora', 'serif'],
        // Montserrat: ['Montserrat', 'sans-serif'],
        Montserrat: ['Open Sans', 'sans-serif'],
        Lora: ['Montserrat', 'sans-serif'],
        LogoFont: ['Space Grotesk', 'sans-serif'],
        TitleFont: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
