/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      colors: {
        'primary': '#035d5e',
        'secondary': '#148387',
      },
      fontFamily: {
        'roboto': '"Roboto", sans-serif'
      }
    },
  },
  plugins: [],
}

