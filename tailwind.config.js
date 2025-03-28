/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ui/**/*.{html,ts,tsx,js,jsx}",
    "./src/**/*.{html,ts,tsx,js,jsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3498db',
          dark: '#2980b9',
          light: '#5dade2',
        },
        secondary: {
          DEFAULT: '#2c3e50',
          dark: '#1a252f',
          light: '#34495e',
        },
        accent: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
          light: '#ec7063',
        },
        success: {
          DEFAULT: '#2ecc71',
          dark: '#27ae60',
          light: '#5edc9e',
        },
        warning: {
          DEFAULT: '#f39c12',
          dark: '#e67e22',
          light: '#f6b93b',
        },
        danger: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
          light: '#ec7063',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT: '0 2px 5px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.12)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}