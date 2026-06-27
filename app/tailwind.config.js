/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive) / <alpha-value>)", foreground: "hsl(var(--destructive-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        "forest-deep": "#022c22", "forest-base": "#064e3b", "forest-light": "#34d399",
        "slate-base": "#1e293b", "off-white": "#f8fafc", "parchment": "#f1f5f9",
        canvas: { light: "#f8fafc", dark: "#09090b", surface: { light: "#ffffff", dark: "#18181b" }, muted: { light: "#64748b", dark: "#a1a1aa" } },
        botanical: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 900: "#14532d" },
        regulatory: {
          active: { DEFAULT: "#047857", bg: "#ecfdf5", text: "#047857", border: "rgba(16,185,129,0.2)" },
          superseded: { DEFAULT: "#b45309", bg: "#fff7ed", text: "#b45309", border: "rgba(245,158,11,0.2)" },
          overruled: { DEFAULT: "#be123c", bg: "#fff1f2", text: "#be123c", border: "rgba(244,63,94,0.2)" },
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)", lg: "var(--radius)", md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)", xs: "calc(var(--radius) - 6px)",
        "bento-cell": "14px", "interactive": "8px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        subtle: "0 4px 20px rgba(2,44,34,0.05)", elevated: "0 12px 40px rgba(2,44,34,0.12)",
        "tactile-sm": "0 1px 2px 0 rgba(0,0,0,0.02), 0 0 0 1px rgba(9,9,11,0.04)",
        "tactile-card": "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.03), 0 0 0 1px rgba(9,9,11,0.05)",
        "tactile-hover": "0 10px 15px -3px rgba(0,0,0,0.03), 0 4px 6px -4px rgba(0,0,0,0.03), 0 0 0 1px rgba(22,163,74,0.15)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        slideIn: { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0)" } },
        fadeInUp: { "0%": { opacity: "0", transform: "translateY(6px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "drawer-slide-in": "slideIn 0.24s cubic-bezier(0.16,1,0.3,1) forwards",
        "canvas-fade-in": "fadeInUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}