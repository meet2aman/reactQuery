/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        4000: "4000ms",
      },
      animation: {
        vibrate: "vibrate 1s infinite linear",
        tilt: "tilt 5s infinite linear",
        roll: "roll 5s linear infinite",
      },
      keyframes: {
        roll: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: " rotate(360deg)",
          },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
        vibrate: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(5deg)",
          },
          "75%": {
            transform: "rotate(-5deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
