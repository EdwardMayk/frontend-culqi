/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#EB6F25", //orange
        secondary: "#01A09B", //green
        tertiary: "#763383", //purple
      }
    },

  },
  plugins: [],
}

