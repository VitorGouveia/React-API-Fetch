module.exports = {
  purge: ["./src/pages/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        "4xl": "0px 0px 100px #000000"
      },
      width: {
        "90": "90%",
      },
      height: {
        "90": "85%",
      },
      fontSize: {
        "10xl": "128px"
      },
      gap: {
        "4": "2rem"
      },
      colors: {
        primary: {
          400: '#00E0F3',
          500: '#00c4fd',
        },
        gray: {
          900: "#282828",
          800: "#303030",
          700: "#8D8D8D"
        },
        dark: '#222222',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
