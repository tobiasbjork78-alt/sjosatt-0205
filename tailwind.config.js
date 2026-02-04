/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'yatsy-green': '#4ade80',
        'yatsy-blue': '#3b82f6',
        'yatsy-yellow': '#f59e0b',
        'yatsy-red': '#ef4444',
      },
      backgroundImage: {
        'dots-light': 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        'dots-dark': 'radial-gradient(circle, #374151 1px, transparent 1px)',
      },
      backgroundSize: {
        'dots': '20px 20px',
      },
    },
  },
  plugins: [],
}