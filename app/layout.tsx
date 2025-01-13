import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@/providers/ChakraProvider";
import { Provider } from "jotai";
import BlockchainContextProvider from "@/contexts/BlockchainContext";
// import ClientLayout from "./client-layout";
import UserContextProvider from "@/contexts/UserContext";
import TWProvider from "@/providers/ThirdwebProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fonddify",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolageGrotesque.className}>
        <TWProvider>
          <ReactQueryProvider>
            <BlockchainContextProvider>
              <UserContextProvider>
                <Provider>
                  <ChakraProvider>{children}</ChakraProvider>
                </Provider>
              </UserContextProvider>
            </BlockchainContextProvider>
          </ReactQueryProvider>
        </TWProvider>
      </body>
    </html>
  );
}
