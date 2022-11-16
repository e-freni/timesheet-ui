/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts,css}'],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: '#0675ff',
        'light-bg': '#fff',
        'navbar-bg': '#f3f4f6',
        'navbar-text': '#6b7280',
        'navbar-hover': '#374151',

        // Dark theme colors
        'dark-primary': '#ff500b',
        'dark-navbar-bg': '#3b3f41',
        'dark-text': '#fff',
        'dark-switch-bar': '#494e50',
        'dark-navbar-hover': '#b7b7b7',
        'dark-bg': '#2b2b2b',
        'dark-logged-bg': '#1e3a8a',
        'dark-not-working-bg': '#7f1d1d',
        'dark-working-bg': '#78350f',
        'dark-special-bg': '#064e3b',
        'dark-outer-bg': '#374151',
      },
    },
  },
  plugins: [],
};
