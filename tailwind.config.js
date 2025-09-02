/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // src 폴더 내 모든 파일 체크
  ],
  theme: {
    screens: {
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      boxShadow: {
        problem: '0px 2px 6px 0px #00000014',
      },
    },
  },
  plugins: [],
};
