module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        1.25: "0.3125rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
