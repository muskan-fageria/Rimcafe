import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        espresso: {
          dark: "#120a06",
          base: "#1a0f0a",
          light: "#261710",
        },
        crimson: {
          dark: "#5c0b0d",
          base: "#7a0f12",
          light: "#8b1418",
        },
        gold: {
          dark: "#a3821a",
          base: "#c59b27",
          light: "#d4af37",
        },
        cream: {
          dark: "#e3d5ca",
          base: "#f5ebe0",
          light: "#faf6f0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
