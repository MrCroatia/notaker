module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4c1d95', // Deep purple
        'primary-light': '#7c3aed', // Lighter purple
        'secondary': '#facc15', // Yellow
        'background': '#f5f5f4', // Light gray
        'background-dark': '#1c1c1c', // Dark gray
        'text-color': '#1c1c1c', // Dark gray (for light theme)
        'text-color-dark': '#f5f5f4', // Light gray (for dark theme)
        'note-item-bg': '#fefce8', // Light yellow (for light theme)
        'note-item-bg-dark': '#4338ca', // Deep indigo (for dark theme)
        'note-item-hover': '#fde047', // Brighter yellow (for light theme)
        'note-item-hover-dark': '#6366f1', // Lighter indigo (for dark theme)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Lexend', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}