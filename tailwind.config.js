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
      backgroundImage: {
        'auth-background': 'url("/auth-bg.jpeg"), linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)',
        'dark-auth-background': 'url("/dark-auth-bg.png")',
      },
      colors: {
        gray: {
          100: 'var(--tw-gray-100)',
          200: 'var(--tw-gray-200)',
          300: 'var(--tw-gray-300)',
          400: 'var(--tw-gray-400)',
          500: 'var(--tw-gray-500)',
          600: 'var(--tw-gray-600)',
          700: 'var(--tw-gray-700)',
          800: 'var(--tw-gray-800)',
          900: 'var(--tw-gray-900)'
        },       
        primary: {
          DEFAULT: 'var(--tw-primary)',
          active: 'var(--tw-primary-active)',
          light: 'var(--tw-primary-light)',
          clarity: 'var(--tw-primary-clarity)',
          inverse: 'var(--tw-primary-inverse)'
        },
        success: {
          DEFAULT: 'var(--tw-success)',
          active: 'var(--tw-success-active)',
          light: 'var(--tw-success-light)',
          clarity: 'var(--tw-success-clarity)',
          inverse: 'var(--tw-success-inverse)'
        },
        warning: {
          DEFAULT: 'var(--tw-warning)',
          active: 'var(--tw-warning-active)',
          light: 'var(--tw-warning-light)',
          clarity: 'var(--tw-warning-clarity)',
          inverse: 'var(--tw-warning-inverse)'
        },
        danger: {
          DEFAULT: 'var(--tw-danger)',
          active: 'var(--tw-danger-active)',
          light: 'var(--tw-danger-light)',
          clarity: 'var(--tw-danger-clarity)',
          inverse: 'var(--tw-danger-inverse)'
        },
        info: {
          DEFAULT: 'var(--tw-info)',
          active: 'var(--tw-info-active)',
          light: 'var(--tw-info-light)',
          clarity: 'var(--tw-info-clarity)',
          inverse: 'var(--tw-info-inverse)'
        },
        dark: {
          DEFAULT: 'var(--tw-dark)',
          active: 'var(--tw-dark-active)',
          light: 'var(--tw-dark-light)',
          clarity: 'var(--tw-dark-clarity)',
          inverse: 'var(--tw-dark-inverse)'
        },
        secondary: {
          DEFAULT: 'var(--tw-secondary)',
          active: 'var(--tw-secondary-active)',
          light: 'var(--tw-secondary-light)',
          clarity: 'var(--tw-secondary-clarity)',
          inverse: 'var(--tw-secondary-inverse)'
        },
        light: {
          DEFAULT: 'var(--tw-light)',
          active: 'var(--tw-light-active)',
          light: 'var(--tw-light-light)',
          clarity: 'var(--tw-light-clarity)',
          inverse: 'var(--tw-light-inverse)'
        },
        brand: {
          DEFAULT: 'var(--tw-brand)',
          active: 'var(--tw-brand-active)',
          light: 'var(--tw-brand-light)',
          clarity: 'var(--tw-brand-clarity)',
          inverse: 'var(--tw-brand-inverse)'
        },
        coal: {
          100: '#15171C',
          200: '#13141A',
          300: '#111217',
          400: '#0F1014',
          500: '#0D0E12',
          600: '#0B0C10',
          black: '#000000',
          clarity: 'rgba(24, 25, 31, 0.50)'
        },
        'light-dark': {
          DEFAULT: 'var(--tw-dark-light)',
          active: 'var(--tw-dark-active-light)',
          light: 'var(--tw-dark-light-light)',
          clarity: 'var(--tw-dark-clarity-light)',
          inverse: 'var(--tw-dark-inverse-light)'
        },
        'dark-dark': {
          DEFAULT: 'var(--tw-dark-dark)',
          active: 'var(--tw-dark-active-dark)',
          light: 'var(--tw-dark-light-dark)',
          clarity: 'var(--tw-dark-clarity-dark)',
          inverse: 'var(--tw-dark-inverse-dark)'
        }
      },
      boxShadow: {
        card: 'var(--tw-card-box-shadow)',
        default: 'var(--tw-box-shadow)',
        primary: 'var(--tw-primary-box-shadow)',
        success: 'var(--tw-success-box-shadow)',
        danger: 'var(--tw-danger-box-shadow)',
        info: 'var(--tw-info-box-shadow)',
        warning: 'var(--tw-warning-box-shadow)',
        dark: 'var(--tw-dark-box-shadow)'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        base: ['0.875rem', { // 14px
          lineHeight: '0.875rem' // 14
        }],
        '4xs': ['0.563rem', { // 9px
          lineHeight: '0.6875rem' // 11px
        }],
        '3xs': ['0.6rem', { // 10px
          lineHeight: '0.75rem' // 12px
        }],
        '2xs': ['0.6875rem', { // 11px
          lineHeight: '0.75rem' // 12px
        }],
        '2sm': ['0.8125rem', { // 13px
          lineHeight: '1.125rem' // 18px
        }],
        'md': ['0.9375rem', {  // 15px
          lineHeight: '1.375rem' // 22px
        }],
        '2md': ['1.1', { // 16
          lineHeight: '1.1rem' // 16
        }],
        lg: ['1.125rem', { // 18px
          lineHeight: '1.125rem' // 26px
        }],
        '1.5xl': ['1.375rem', { // 22px
          lineHeight: '1.8125rem' // 29px
        }],
        '2.5xl': ['1.625rem', { // 26px
          lineHeight: '2.125rem' // 34px
        }]
      },
      lineHeight: {
        '5.5': '1.375rem', // 22px
      },
      zIndex: {
        '1': '1',
        '5': '5',
        '15': '15',
        '25': '25'
      },
      borderWidth: {
        '3': '3px'
      },
      spacing: {
        '0.75': '0.1875rem', 
        '5.5': '1.375rem', 
        '6.5': '1.625rem', 
        '7.5': '1.875rem', 
        '1.75': '0.4375rem'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Merriweather', ...fontFamily.serif],
        mono: ['Roboto Mono', ...fontFamily.mono]
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
