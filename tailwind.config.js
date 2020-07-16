module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {},
    screens: {
      xsm: { min: "360px", max: "599px" },
      sm: { min: "600px", max: "839px" },
      md: { min: "840px", max: "1283px" },
      lg: { min: "1284px", max: "1679px" },
      xl: { min: "1680px" },
    },
  },
  variants: {},
  plugins: [],
};
