/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      colors: {
      "secondaryText": "rgb(141, 49, 49)",
      "primaryText": "#1f3e72",
      "airbnb-theme-color":"#FF385C",
      "airbnb-theme-color": "#FF385C",
      "airbnb-light-black": "#222222",
      "airbnb-light-gray": "#717171",
    },},
    screens:{
      'phone':'320px',
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
