/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
          light: '#58d68d',
        },
        warning: {
          DEFAULT: '#f39c12',
          dark: '#e67e22',
          light: '#f5b041',
        },
        danger: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
          light: '#ec7063',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 5px rgba(0, 0, 0, 0.1)',
        elevated: '0 5px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        card: '8px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
