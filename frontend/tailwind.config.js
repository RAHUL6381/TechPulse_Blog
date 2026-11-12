/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#101828',
          800: '#1d2939',
          700: '#344054',
        },
        electric: {
          DEFAULT: '#2563EB',
          hover: '#1d4ed8',
          light: '#eff6ff',
          dark: '#1e40af',
        },
        pulse: {
          DEFAULT: '#D7FF64',
          hover: '#c3ef48',
          muted: '#f4fec1'
        },
        cloud: '#F5F7FA',
        slate: {
          500: '#667085',
          600: '#475467',
          700: '#344054',
        },
        borderGray: '#EAECF0',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Manrope', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
