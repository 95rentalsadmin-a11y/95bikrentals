/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "turquoise-blue": "#00bcd4",
        "lime-green": "#cddc39",
        orange: "#ff9800",
        "hot-pink": "#e91e63",
        "sunny-yellow": "#ffeb3b",
        "sky-blue": "#87ceeb",
        coral: "#ff6f61",
        "mint-green": "#00c853",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
