/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "gray-10": "#e1e1e6",
        "gray-30": "#c4c4cc",
        "gray-40": "#8d8d99",
        "gray-50": "#7c7c8a",
        "gray-60": "#323238",
        "gray-70": "#29292e",
        "gray-80": "#202024",
        "gray-90": "#121214",
        "green-30": "#00b37e",
        "green-50": "#00b75f",
        "green-70": "#015f43",
        "red-50": "#ab222e",
        "red-70": "#7a1921",
        "yellow-50": "#fba94c",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoMon: ['"Roboto Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
