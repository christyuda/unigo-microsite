/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        roboto: ["Roboto", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "#F7F8F7",
        foreground: "#181B19",
        neutral: {
          50: "#f9faf9",
          100: "#f4f5f4",
          200: "#e5e6e5",
          300: "#d3d5d3",
          400: "#a1a3a1",
          500: "#717371",
          600: "#515452",
          700: "#3e413f",
          800: "#252826",
          900: "#161917",
        },
        brand: {
          50: "#fff7ee",
          100: "#feead3",
          200: "#fdd2a7",
          300: "#fbb270",
          400: "#f8883a",
          500: "#f56617",
          600: "#e74d19",
          700: "#c03919",
          800: "#992f1b",
          900: "#7c2b19",
        },
        highlight: {
          50: "#f9fafb",
          100: "#f4f5f7",
          200: "#e6e9ed",
          300: "#d2d8de",
          400: "#9ca6b3",
          500: "#6a7584",
          600: "#495867",
          700: "#344354",
          800: "#1c2a38",
          900: "#0e1928",
        },
      },
      borderRadius: {
        sm: "0.125rem",
        default: "0.25rem",
        md: "0.375rem",
        lg: "0.625rem",
        xl: "0.9375rem",
        "2xl": "1.1563rem",
        "3xl": "1.375rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  },
};
