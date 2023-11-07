/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1:{
              color: "var(--text-primary)",
              fontWeight: "700",
              fontSize: "48px",
              lineHeight: "56px",
              letterSpacing: "-0.5px",
            },
            h3: {
              color: "var(--text-primary)",
              fontWeight: "500",
              fontSize: "23px",
              lineHeight: "24px",
              letterSpacing: "-0.5px",
            },
            h5: {
              color: "var(--text-primary)",
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "28px",
              letterSpacing: "-0.5px",
            },
            h6: {
              color: "var(--text-primary)",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "16px",
              letterSpacing: "0.4px",
            },
            p: {
              color: "var(--text-primary)",
              fontWeight: "400",
              fontSize: "16",
              lineHeight: "18px",
              letterSpacing: "0.4px",
            },
            body: {
              color: "var(--text-secondary)",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "14px",
              letterSpacing: "0.4px",
            },
            a: {
              color: "var(--text-secondary)", 
              fontWeight: "400", 
            },
            input: {
              color: "var(--text-secondary)",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "14px",
              letterSpacing: "0.4px",

            },
          }
        }
      }),
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "light-accent-secondary": "var(--light-accent-secondary)",
        "light-border-input": "var(--light-border-input)",
        "light-text-secondary": "var(--light-text-secondary)",
        "light-text-primary": "var(--light-text-primary)",
        "light-btn-secondary": "#EFF0F2",
        "accent-primary": "var(--accent-primary)",
        "accent-secondary": "var(--accent-secondary)",
        "accent-on-primary": "var(--accent-on-primary)",
        "accent-on-secondary": "var(--accent-on-secondary)",
        greywhite: "#FFFFFF", 
        textg: "#6B7684", 
        textb: "#101113", 
        text: {
          "primary": "var(--text-primary)",
          "secondary": "var(--text-secondary)",
          "placeholder": "var(--text-placeholder)",
        },
        background: {
          "base": "var(--background-base)",
          "layer-1": "var(--background-layer-1)",
          "layer-2": "var(--background-layer-2)",
        },
        border: {
          "input": "var(--border-input)",
          "primary": "var(--border-primary)",
          "secondary": "var(--border-secondary)",
          "div": "var(--border-div)",
        },
        button: {
          "secondary": "var(--button-secondary)",
          "secondary-hover": "var(--button-secondary-hover)",
          "secondary-disabled": "var(--button-secondary-disabled)",
          "secondary-pressed": "var(--button-secondary-pressed)",
        },
        state: {
          "error": "var(--state-error-primary)",
          "success": "var(--state-success-primary)",
          "warning": "var(--state-warning-primary)",
          "info": "var(--state-info-primary)",
          "error-secondary": "var(--state-error-secondary)",
          "success-secondary": "var(--state-success-secondary)",
          "warning-secondary": "var(--state-warning-secondary)",
          "info-secondary": "var(--state-info-secondary)",

        },
        black: {
          DEFAULT: "#101113",
          normal: "#101113",
          800: "#101113",
          medium: "#F6F7F8",
          light: "#EFF0F2",
          700: "#6B7684",
          400: "#EFF0F2",
          300: "rgba(150, 166, 180, 1)",
          200: "#F6F7F8",
          100: "rgba(239, 240, 242, 1)", 
        },
        green: {
          DEFAULT: "#19C900",
          medium: "#19C900", 
          300:  "#DEFFD9", 
          400: "#DBFDF0",
          500: "#00D41D", 
          800: "rgba(15, 219, 139, 1)", 
          light: "#DEFFD9",
        },
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
          DEFAULT: "hsl(var(--accent-secondary))",
          foreground: "hsl(var(--accent-primary))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "20px",
        sm: "12px",
        xs: "8px",
      },
      gap: {
        "md": "24px", 
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
      backgroundImage: {
        'footer-texture': "url('/public/onboard-bg.png')",
      },
      boxShadow: {
        "custom": "2px 2px 10px 0px rgba(0, 0, 0, 0.05)"
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      text: {
        large: "48px", 
        medium: "24px",
      },
      fontSize: {
        'sm': ['0.875rem', { lineHeight: '0.875rem'},{ fontWeight: '400' }],
        'md': ['1rem', { lineHeight: '1.5rem'},{ fontWeight: '400' }, { letterSpacing: '0.5px' }],  
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}