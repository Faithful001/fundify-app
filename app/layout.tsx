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
import { Suspense } from "react";
import ClientLayout from "./client-layout";
import { ModalContextProvider } from "@/contexts/ModalContextProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <Suspense>
          <TWProvider>
            <ReactQueryProvider>
              <BlockchainContextProvider>
                <UserContextProvider>
                  <ModalContextProvider>
                    <Provider>
                      <ChakraProvider>
                        <ClientLayout>{children}</ClientLayout>
                      </ChakraProvider>
                    </Provider>
                  </ModalContextProvider>
                </UserContextProvider>
              </BlockchainContextProvider>
            </ReactQueryProvider>
          </TWProvider>
        </Suspense>
      </body>
    </html>
  );
}
