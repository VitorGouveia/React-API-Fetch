import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./lib/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          accent: {
            light: "var(--accent-light)",
            base: "var(--accent-base)",
          },
          secondary: {
            base: "var(--secondary-base)",
          },
          paragraph: "var(--paragraph)",
          placeholder: "var(--placeholder)",
          title: "var(--title)",
          primary: {
            lighter: "var(--primary-lighter)",
            light: "var(--primary-light)",
            base: "var(--primary-base)",
            dark: "var(--primary-dark)",
            darker: "var(--primary-darker)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
export default config
