/** @type {import('prettier').Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  tailwindConfig: "./tailwind.config.ts",
}
