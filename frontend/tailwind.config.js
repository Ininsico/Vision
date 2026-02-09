/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFBF7',
          100: '#F9F5EE',
          200: '#F3E9DD',
          300: '#E8D5C4',
          400: '#D9BBA4',
          500: '#C9A084',
          600: '#B88565',
          700: '#8B5E3C',
          800: '#6B4628',
          900: '#4A2F1A',
        },
        peach: {
          50: '#FEF7F4',
          100: '#FCEEE8',
          200: '#F9DDD1',
          300: '#F5C4B0',
          400: '#F0A88E',
          500: '#EB8C6C',
          600: '#E6704A',
          700: '#C85A35',
          800: '#A04628',
          900: '#78331E',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
