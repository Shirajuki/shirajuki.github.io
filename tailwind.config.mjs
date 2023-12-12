/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#543DCB', // Main
          500: '#57526E', // Outline
          600: '#443D5B', // Light
          700: '#2B2642', // Dark
          900: '#0E0A25', // Background
        },
        clear: 'rgba(207,194,232,0.15)',
        gray: '#C4C4C4',
      },
    },
  },
  plugins: [],
};
