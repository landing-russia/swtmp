const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {colors},
  },

  plugins: [require('@tailwindcss/typography'),],
};

module.exports = config;
