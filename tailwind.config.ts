import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary":                   "#775a19",
        "on-primary":                "#ffffff",
        "primary-container":         "#d4ad65",
        "primary-fixed":             "#ffdea5",
        "on-primary-fixed":          "#261900",
        "surface":                   "#faf9f6",
        "on-surface":                "#1a1c1a",
        "on-surface-variant":        "#4d4635",
        "surface-container":         "#efeeeb",
        "surface-container-low":     "#f4f3f1",
        "surface-container-high":    "#e9e8e5",
        "surface-container-highest": "#e3e2e0",
        "surface-container-lowest":  "#ffffff",
        "secondary":                 "#625e51",
        "on-secondary":              "#ffffff",
        "secondary-container":       "#e6dfce",
        "tertiary":                  "#5f5e5a",
        "on-tertiary":               "#ffffff",
        "tertiary-container":        "#b5b3ae",
        "on-tertiary-container":     "#464541",
        "outline-variant":           "#d0c5af",
        "outline":                   "#7f7663",
        "inverse-surface":           "#2f312f",
        "error":                     "#ba1a1a",
        "on-error":                  "#ffffff",
        "error-container":           "#ffdad6",
        "on-error-container":        "#93000a",
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        body:     ["Plus Jakarta Sans", "sans-serif"],
        label:    ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
};

export default config;
