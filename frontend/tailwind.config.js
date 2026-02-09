/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary is now the Deep Teal scale
        primary: {
          50: '#f0fdfd',
          100: '#ccfbfb',
          200: '#99f6f6',
          300: '#5ceded',
          400: '#22dcdc',
          500: '#06b6b6', // Teal Blue
          600: '#049191',
          700: '#037474',
          800: '#025b5b', // Deep Teal
          900: '#013d3d', // Very Deep Teal
          950: '#002525',
        },
        // Peach is now Pure White / Transparent placeholder
        peach: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#ffffff',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        accent: ['Instrument Serif', 'Georgia', 'serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
