/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'yatsy-green': '#4ade80',
        'yatsy-blue': '#3b82f6',
        'yatsy-yellow': '#f59e0b',
        'yatsy-red': '#ef4444',
      },
    },
  },
  plugins: [],
}