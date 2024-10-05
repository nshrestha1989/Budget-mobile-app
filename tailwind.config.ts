import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        "0": "0",
      },
   
      colors: {
        bars: {
          DEFAULT: "var(--f7-bars-bg-color)",
        },
        error: {
          DEFAULT: "var(--f7-input-error-text-color)",
        },
        primary: {
          DEFAULT: "var(--f7-color-primary)",
          foreground: "var(--f7-color-white)",
        },
        secondary: {
          DEFAULT: "var(--f7-color-orange)",
          foreground: "var(--f7-color-white)",
        },
        link: {
          DEFAULT: "var(--f7-color-teal)",
          foreground: "var(--f7-color-black)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      fontFamily: {
        sans: ['"Arial"', 'sans-serif'],
        serif: ['"Georgia"', 'serif'],
        mono: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
