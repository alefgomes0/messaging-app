/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        borderIn: {
          "0%": { height: "30px", opacity: "0%" },
          "34%": { height: "30px", opacity: "0%" },
          "35%": { height: "30px", opacity: "100%" },
          "75%": { height: "16px" }
        },
        borderOut: {
          "0%": { height: "16px", opacity: "100%" },
          "50%": { height: "16px", opacity: "100%" },
          "80%": {  opacity: "100%" },
          "100%": { height: "30px", opacity: "0%" }
        }
      }
    },
  },
  plugins: [],
}