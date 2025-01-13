"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const TWProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
};

export default TWProvider;
