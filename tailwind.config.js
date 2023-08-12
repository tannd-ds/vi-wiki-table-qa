/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          500: "#101010",
          400: "#151515",
          300: "#1A1A19",
          200: "#1E1F1E",
          100: "#222423",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(5em)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
