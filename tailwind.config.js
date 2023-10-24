/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  screens: {
    'sm': { 'min': '320px', 'max': '575px' }
  }
};
export const plugins = [];