import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2CACE2",
        secondary: "#F3BC3B",
        "primary-bg": "#0F0F0F",
        "secondary-bg": "#272727",
        "primary-btn": "#3EA6FF"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class'
    }),
    require('tailwind-scrollbar'),
  ],
};
export default config;
