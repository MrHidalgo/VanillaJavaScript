/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.{html,js}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {},
      screens: {
        'max-xs': { max: '374px' },
        'max-sm': { max: '767px' },
        'max-md': { max: '1023px' },
        'max-lg': { max: '1279px' },
        'max-xl': { max: '1439px' },
        'max-xxl': { max: '1919px' }
      }
    }
  },
  plugins: []
};
