module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#1a1a1a', 
          700: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#1E40AF',
          dark: '#1E3A8A'
        },
        secondary: {
          DEFAULT: '#1E3A8A',
          dark: '#1E1E40'
        },
        accent: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF'
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A'
        },
        text: {
          DEFAULT: '#1E293B',
          dark: '#F8FAFC'
        }
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms'
      }
    },
  },
  plugins: [],
}
