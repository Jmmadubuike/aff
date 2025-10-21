// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matte: {
          black: "#0A0A0A",
          dark: "#141414",
        },
        gold: {
          metallic: "#D4AF37",
          light: "#F0D98C",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#C0B283",
        },
      },
    },
  },
  plugins: [],
};
