import { theme as defaultTheme } from "@chakra-ui/core";
export const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    green: {
      50: "#e6efdb",
      100: "#d9e7ca",
      200: "#c0d7a6",
      300: "#a7c783",
      400: "#8eb760",
      500: "#76a73d",
      600: "#618832",
      700: "#4c6b27",
      800: "#364c1c",
      900: "#212e11"
    },
    red: {
      50: "#fce6dc",
      100: "#fad9cb",
      200: "#f8c0a9",
      300: "#f5a786",
      400: "#f28e64",
      500: "#f07642",
      600: "#c56137",
      700: "#994c2a",
      800: "#6e361e",
      900: "#422112"
    }
  },
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: '"Playfair Display", sans-serif',
    body: '"Open Sans", sans-serif',
    mono: '"Dank Mono", Menlo, monospace'
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem"
  }
};
