/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-dark': '#343541',
        'chat-darker': '#202123',
        'chat-light': '#444654',
        'chat-lighter': '#565869',
        'chat-border': '#565869',
        'chat-text': '#ECECF1',
        'chat-text-secondary': '#D1D5DB',
      }
    },
  },
  plugins: [],
} 