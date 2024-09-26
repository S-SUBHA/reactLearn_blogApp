/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        twoColumn: "repeat(2, calc(45vw - 2.5em))",
        simpleTwoColumn: "repeat(2, 1fr)",
      },
      boxShadow:{
        postCardShadow: "0.2rem 0.2rem 0.2rem #0000ff40, -0.2rem 0.2rem 0.2rem #0000ff40"
      }
    },
  },
  plugins: [],
};
