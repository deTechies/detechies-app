/** @type {import('tailwindcss').Config} */

const {fontFamily} = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border-div))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          "on-primary": "var(--accent-on-primary)",
          "on-secondary": "var(--accent-on-secondary)",
          tertiary: "var(--accent-tertiary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          placeholder: "var(--text-placeholder)",
          fixed: "var(--text-fixed)"
        },
        icon: {
          primary: "var(--icon-primary)",
          secondary: "var(--icon-secondary)",
        },
        background: {
          base: "var(--background-base)",
          "layer-1": "var(--background-layer-1)",
          "layer-2": "var(--background-layer-2)",
          "input-inactive": "var(--background-input-inactive)",
          "tooltip": "var(--background-tooltip)",
        },
        border: {
          input: "var(--border-input)",
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          div: "var(--border-div)",
          "on-base": "var(--border-on-base)",
        },
        button: {
          secondary: "var(--button-secondary)",
          "secondary-hover": "var(--button-secondary-hover)",
          "secondary-disabled": "var(--button-secondary-disabled)",
          "secondary-pressed": "var(--button-secondary-pressed)",
        },
        state: {
          error: "var(--state-error-primary)",
          success: "var(--state-success-primary)",
          warning: "var(--state-warning-primary)",
          info: "var(--state-info-primary)",
          "error-secondary": "var(--state-error-secondary)",
          "success-secondary": "var(--state-success-secondary)",
          "warning-secondary": "var(--state-warning-secondary)",
          "info-secondary": "var(--state-info-secondary)",
          status: "var(--state-status-primary)",
          "status-secondary": "var(--state-status-secondary)",
        },
        type: {
          purple: {
            primary: "var(--type-purple-primary)",
            secondary: "var(--type-purple-secondary)",
          },
          yellow: {
            primary: "var(--type-yellow-primary)",
            secondary: "var(--type-yellow-secondary)",
          },
        },
        black: {
          DEFAULT: "#101113",
          800: "#101113",
          700: "#6B7684",
          400: "#EFF0F2",
          300: "rgba(150, 166, 180, 1)",
          200: "#F6F7F8",
          100: "rgba(239, 240, 242, 1)",
        },
        green: {
          DEFAULT: "#19C900",
          300: "#DEFFD9",
          400: "#DBFDF0",
          500: "#00D41D",
          800: "rgba(15, 219, 139, 1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "12px",
        sm: "6px",
        xs: "4px",
      },
      gap: {
        md: "30px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      boxShadow: {
        custom: "2px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        card: "0px 3px 4px 0px #00000008",
        switch: "0px 1px 1px 0px rgba(0, 0, 0, 0.16), 0px 3px 8px 0px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        "b-14-14-500": [
          "0.875rem",
          { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.15px" },
        ],
        sm: ["0.875rem", { lineHeight: "1.1rem" }, { fontWeight: "400" }],
        md: [
          "1rem",
          { 
            lineHeight: "1rem",
            letterSpacing: "0.15pxrem" 
          },
        ],
        heading_l: [
          "3rem", // 
          { 
            lineHeight: 1.3,
            fontWeight: "700",
            letterSpacing: "0px" 
          },
        ],
        heading_m: [ // 34px 1.3 0px 700
          "2.125rem", 
          { 
            lineHeight: 1.3,
            fontWeight: "700",
            letterSpacing: "0px" 
          },
        ],
        heading_s: [ // 28px 1.3 0 700
          "1.75rem",  
          { 
            lineHeight: 1,
            fontWeight: "600",
            letterSpacing: "0px" 
          },
        ],
        subhead_l: [ // 26px 1.3 0 600
          "1.625rem",
          { 
            lineHeight: 1.3,
            fontWeight: "600",
            letterSpacing: "0px" 
          },
        ],
        subhead_m: [ // 24px 1.3 0 600
          "1.5rem",
          { 
            lineHeight: 1.3,
            fontWeight: "600",
            letterSpacing: "0px" 
          },
        ],
        subhead_s: [ // 20px 1.3 0 600
          "1.25rem", 
          { 
            lineHeight: 1.3,
            fontWeight: "600",
            letterSpacing: "0px" 
          },
        ],
        title_l: [ // 18px 1.3 0.1px 600
          "1.125rem",
          { 
            lineHeight: 1.3,
            fontWeight: "600",
            letterSpacing: "0.1px" 
          },
        ],
        title_m: [ // 16 1.3 0.15px 600
          "1rem",
          { 
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "-0.1px" 
          },
        ],
        title_s: [ // 14px 1.4 0.15px 600
          "0.875rem",
          { 
            lineHeight: "1.4",
            fontWeight: "600",
            letterSpacing: "0.15px" 
          },
        ],
        label_l: [ // 16px 1.3 0.4px 400
          "1rem",
          { 
            lineHeight: 1.3,
            fontWeight: "400",
            letterSpacing: "0.4px" 
          },
        ],
        label_m: [ // 14px 1.3 0.4px 400
          "0.875rem",
          { 
            lineHeight: 1.3,
            fontWeight: "400",
            letterSpacing: "0.4px" 
          },
        ],
        label_s: [ // 12px 1.3 0.4px 400
          "0.75rem",
          { 
            lineHeight: 1.3,
            fontWeight: "400",
            letterSpacing: "0.4px" 
          },
        ],
        body_l: [ // 18px 1.5 0.4px 400
          "1.125rem",
          { 
            lineHeight: 1.5,
            fontWeight: "400",
            letterSpacing: "0.4px" 
          },
        ],
        body_m: [ // 16px 1.5 0.5px 400
          "1rem",
          { 
            lineHeight: 1.5,
            fontWeight: "400",
            letterSpacing: "0.5px" 
          },
        ],
        body_s: [ // 14px 1.5 0.5px 400
          "0.875rem",
          { 
            lineHeight: 1.5,
            fontWeight: "400",
            letterSpacing: "0.5px" 
          },
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
