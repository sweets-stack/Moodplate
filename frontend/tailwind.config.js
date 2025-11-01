/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)'
          }
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'ingredient-appear': 'ingredientAppear 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        ingredientAppear: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px) scale(0.8)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        }
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        'mood-happy': 'linear-gradient(135deg, #FFD93D 0%, #059669 100%)',
        'mood-cozy': 'linear-gradient(135deg, #AEE2FF 0%, #B983FF 100%)',
        'mood-energetic': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'mood-relaxed': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      }
    },
  },
  plugins: [],
}