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
            transform: "translateY(50px) scale(0.9)",
          },
          "50%": {
            transform: "translateY(10px) scale(1)",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.2s cubic-bezier(0, 0, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};
