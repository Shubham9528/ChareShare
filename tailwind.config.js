/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    'text-blue-600',
    'text-emerald-600',
    'hover:text-blue-700',
    'hover:text-emerald-700',
    'bg-blue-50',
    'text-green-600',
    'bg-green-50',
    'text-red-600',
    'bg-red-50',
    'text-gray-600',
    'bg-gray-50',
    'text-orange-600',
    'bg-orange-50',
    'text-yellow-600',
    'bg-yellow-50'
  ],
  plugins: [],
};