"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const TWProvider = ({ children }: { children: React.ReactNode }) => {
  const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

  const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  const sepoliaChain = {
    chainId: 11155111,
    rpc: [`https://eth-sepolia.g.alchemy.com/v2/${alchemyAPIKey}`],
    name: "Sepolia Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Sepolia Ether",
      symbol: "ETH",
    },
    shortName: "sepolia",
    slug: "sepolia",
    testnet: true,
    chain: "Ethereum Sepolia",
    networkId: 11155111,
  };

  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={sepoliaChain}
      supportedChains={[sepoliaChain]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default TWProvider;
