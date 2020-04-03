import { theme as defaultTheme } from "@chakra-ui/core";
export const theme = {
  ...defaultTheme,
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