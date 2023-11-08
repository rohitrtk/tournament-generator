/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-light": "#403e3c",
        "primary": "#302e2b",
        "primary-dark": "#262522",
        "border-dark": "#333230",
        "border-light": "#e8e6e0",
        "secondary": "#80b64b"
      }
    },
  },
  plugins: [],
}