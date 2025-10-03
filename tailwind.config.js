/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f7f8f3',
          100: '#eef0e6',
          200: '#dde1cc',
          300: '#c8d0a8',
          400: '#b3c084',
          500: '#9db060',
          600: '#8a9d4a',
          700: '#6d7a3a',
          800: '#56602e',
          900: '#454d25',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
