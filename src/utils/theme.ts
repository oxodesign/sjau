import { theme as defaultTheme } from "@chakra-ui/core";
export const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    green: {
      50: "#76a73d",
      100: "#76a73d",
      200: "#76a73d",
      300: "#76a73d",
      400: "#76a73d",
      500: "#76a73d",
      600: "#76a73d",
      700: "#76a73d",
      800: "#76a73d",
      900: "#76a73d"
    },
    red: {
      50: "#f07642",
      100: "#f07642",
      200: "#f07642",
      300: "#f07642",
      400: "#f07642",
      500: "#f07642",
      600: "#f07642",
      700: "#f07642",
      800: "#f07642",
      900: "#f07642"
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
