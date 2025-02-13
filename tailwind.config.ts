import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        vsm: "380px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      cursor: {
        customPointer: 'url("/mouse/mousePointer.svg"), pointer',
      },
      animation: {
        rotateX: "rotateX 1.2s ease-in-out infinite", // Smooth back-and-forth rotation
        rotateX2: "rotateX2 1.2s ease-in-out infinite", // Smooth back-and-forth rotation
      },
      keyframes: {
        rotateX: {
          "0%": { transform: "rotate(45deg)" },
          "100%": { transform: "rotate(225deg)" },
        },
        rotateX2: {
          "0%": { transform: "rotate(-45deg)" },
          "100%": { transform: "rotate(135deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
