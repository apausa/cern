const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '112': '28rem',
        '128': '32rem',
        '192': '48rem',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};

// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
