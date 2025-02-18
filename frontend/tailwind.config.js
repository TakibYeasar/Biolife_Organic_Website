/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4caf50', // Fresh green for primary accents
        secondary: '#2e7d32', // Vibrant green for secondary elements
        fontColor: '#1b5e20', // Rich green for text
        fontLight: '#ffffff', // Bright white for contrast
        bgColor: '#f1f8e9', // Soft greenish-white for a clean background
        borderColorLight: '#dcedc8', // Light green for borders
        navColor: '#388e3c', // Eye-catching green for navigation
        dropdownColor: '#e8f5e9', // Light green tint for dropdowns
        bgLight: 'rgba(76, 175, 80, 0.1)', // Subtle green tint for backgrounds
        bgLayer: 'rgba(0, 0, 0, 0.3)', // Softer overlay for contrast
        bgGrey: '#c8e6c9', // Gentle green-grey for subtle backgrounds
        footerBg: '#1b5e20', // Rich green for footer
        cardBg: '#e0f2f1', // Refreshing teal for card backgrounds
      },
      borderRadius: {
        DEFAULT: '6px',
        full: '35px',
      },
      fontSize: {
        base: '14px',
        'p-md': ['18px', '28px'],
        'main-title': ['38px', '48px'],
        'title-two': ['18px', '26px'],
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      lineHeight: {
        '24': '24px',
        '28': '28px',
        '40': '40px',
        '48': '48px',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
