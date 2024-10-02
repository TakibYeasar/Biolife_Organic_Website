/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffac1e',
        secondary: '#4d4d4d',
        fontColor: '#0f1113',
        fontLight: '#fff',
        bgColor: '#fff',
        borderColorLight: '#eee',
        navColor: '#292922',
        dropdownColor: '#fff',
        bgLight: 'rgba(130, 115, 252, .05)',
        bgLayer: 'rgba(0, 0, 0, 0.55)',
        bgGrey: '#bab8b8',
        footerBg: '#0f1113',
        cardBg: '#f5f5f5',
      },
      borderRadius: {
        DEFAULT: '6px',
        full: '35px',
      },
      fontSize: {
        base: '14px',
        'p-md': ['18px', '28px'],
        'main-title': ['38px', '48px'],
        'title-two': ['30px', '40px'],
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
