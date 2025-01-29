"use client";

import {
  ChakraProvider as Provider,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider theme={theme} disableGlobalStyle={true}>
      {children}
    </Provider>
  );
}
