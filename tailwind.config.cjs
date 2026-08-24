/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        misionero: {
          50: "#F8EBCB",
          100: "#F1E3C0",
          200: "#E4D5B0",
          300: "#C5B590",
          400: "#9E8E6B",
          500: "#7A6B4A",
          600: "#5C4F35",
          700: "#3D3524",
          800: "#264F4A",
          900: "#103D37",
          950: "#08211E",
        },
        accent: {
          100: "#FBEFC9",
          200: "#F5DE94",
          500: "#C5A065",
          600: "#A8854E",
          700: "#8C6D3D",
        },
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        script: ["Great Vibes", "cursive"],
        mono: ["Courier Prime", "monospace"],
      },
    },
  },
  plugins: [],
};
