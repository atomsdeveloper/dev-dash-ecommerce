/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

const config: import("tailwindcss").Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar({ nocompatible: true }), // importante!
  ],
};

export default config;
