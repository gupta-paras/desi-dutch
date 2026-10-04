import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jaipur: {
          50: "#FCF5F3",
          100: "#F9ECE7",
          200: "#F2D4CA",
          300: "#EAB4A5",
          400: "#E4927E",
          terracotta: "#E07A5F",
          rose: "#C84B5B",
          dark: "#9E3C2B",
        },
        saffron: {
          DEFAULT: "#F4A261",
          gold: "#E9C46A",
          mughal: "#D4AF37",
        },
        peacock: {
          light: "#2E7C88",
          DEFAULT: "#1A535C",
          dark: "#0B3C49",
        },
        amsterdam: {
          brick: "#6E2D25",
          canal: "#2B1E1A",
          water: "#183244",
        },
        delft: {
          ice: "#EBF2F7",
          blue: "#1F4E79",
          cobalt: "#0D2E54",
        },
        cream: {
          DEFAULT: "#FDFBF7",
          parchment: "#F5EBE1",
          warm: "#FAF6F0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(224, 122, 95, 0.35)",
        goldGlow: "0 0 25px -5px rgba(233, 196, 106, 0.4)",
        card: "0 10px 30px -10px rgba(43, 30, 26, 0.08)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
