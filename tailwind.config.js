/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "*.hbs",
    "**/*.hbs",
    "partials/**/*.hbs"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

