/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: '600px',
          md: '700px',
          lg: '800px',
          xl: '900px',
          '2xl': '1000px',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

