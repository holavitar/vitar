/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#11325b",
        secondary: "#e7ba61",
        accent: "#ac1c37",
        bg: "#f2f2f2",
      },
      fontFamily: {
        display: [
          "Helvetica Now Display",
          "Helvetica Now",
          "Inter",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        body: ["Verdana", "Geneva", "DejaVu Sans", "sans-serif"],
        sans: ["Verdana", "Geneva", "sans-serif"],
      },
    },
  },
  plugins: [],
};
