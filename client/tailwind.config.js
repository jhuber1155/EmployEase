/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main": "url('mylink')"
      },
      colors: {
        jobPageBlue: '#3179ba',
      }
    }
  },
  plugins: [],
}

