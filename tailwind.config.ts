import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        app_blue: "var(--app_blue)",
        app_text_blue: "var(--app_text_blue)",
        overlay_gradient: "var(--app_overlay_gradient)",
        
        app_text: "var(--app_text)",
        app_text_grayed: "var(--app_text_grayed)",
        app_text_invert: "var(--app_text_invert)",
        app_text_dark: "var(--app_text_dark)",
        app_text_white: "var(--app_text_white)",
        app_border: "var(--app_border)",
        app_border_thick: "var(--app_border_thick)",
        app_border_error: "var(--app_border_error)",

        app_bg: "var(--app_bg)",
        app_bg_light: "var(--app_bg_light)",
        app_bg_grayed: "var(--app_bg_grayed)",
        app_bg_invert: "var(--app_bg_invert)",
        app_black: "var(--app_black)",
        app_white: "var(--app_white)",
        app_orange: "var(--app_orange)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        primary_app_width: "var(--primary_app_width)",
        secondary_app_width: "var(--secondary_app_width)",
        tertiary_app_width: "var(--tertiary_app_width)",

        main_min_height: "var(--main_min_height)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
