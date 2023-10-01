/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        borderIn: {
          "0%": { height: "30px", opacity: "0%" },
          "34%": { height: "30px", opacity: "0%" },
          "35%": { height: "30px", opacity: "100%" },
          "75%": { height: "16px" },
        },
        borderOut: {
          "0%": { height: "16px", opacity: "100%" },
          "50%": { height: "16px", opacity: "100%" },
          "80%": { opacity: "100%" },
          "100%": { height: "30px", opacity: "0%" },
        },

        loading1: {
          "0%, 100%": { transform: "translateY(0%)" },
          "16.65%": { transform: "translateY(-15%)" },
          "33.3%": { transform: "translateY(0%)" },
        },
        loading2: {
          "0%, 100%": { transform: "translateY(0%)" },
          "33.2%": { transform: "translateY(0%)" },
          "49.95%": { transform: "translateY(-15%)" },
          "66.6%": { transform: "translateY(0%)" },
        },
        loading3: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(0%)" },
          "66.5%": { transform: "translateY(0%)" },
          "83.25%": { transform: "translateY(-15%)" },
        },
      },
      fontFamily: {
        Cormorant: "Cormorant",
        Cormorant_Italic: "Cormorant_Italic",
      },
    },
  },
  plugins: [],
};
