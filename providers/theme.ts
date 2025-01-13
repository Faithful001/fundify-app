// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Default to dark mode
    useSystemColorMode: false, // Disable system color mode preference
  },
  styles: {
    global: {
      body: {
        bg: "#05060F",
        color: "white",
      },
    },
  },
});

export default theme;
