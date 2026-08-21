/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#70B2FF",
          "blue-hover": "#58A1F8",
          dark: "#0F172A",
          bg: "#FFFFFF",
          card: "#F8F9FA",
          gray: "#F3F4F7",
          text: "#0F172A",
          muted: "#64748B",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", "Sora", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-sora)", "Sora", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
