"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThirdwebProvider>{children}</ThirdwebProvider>
    </div>
  );
};

export default ClientLayout;
