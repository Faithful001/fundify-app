"use client";
import {
  useAddress,
  useConnect,
  metamaskWallet,
  useContract,
  useChain,
  Chain,
  WalletConfig,
  MetaMaskWallet,
  SmartContract,
  useContractWrite,
  UseContractResult,
} from "@thirdweb-dev/react";
import { BaseContract, BigNumber } from "ethers";
import { SetStateAction } from "jotai";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

// Blockchain context interface
interface BlockchainContextProps {
  walletConnected: boolean;
  setWalletConnected: Dispatch<SetStateAction<boolean>>;
  address: string | undefined;
  handleConnect: (
    setWalletConnected: (connected: boolean) => void
  ) => Promise<void>;
  publishCampaign: (form: {
    title: string;
    description: string;
    target: BigNumber;
    deadline: string;
    image: string;
  }) => Promise<{
    isSuccess: boolean;
    isError: boolean;
    data: any;
    isLoading: boolean;
    error: any;
  }>;
}

// Create BlockchainContext
const BlockchainContext = createContext<BlockchainContextProps | undefined>(
  undefined
);

const BlockchainContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const address = useAddress();
  const chain = useChain();
  const walletConfig = metamaskWallet();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    setWalletConnected(!!address);
  }, [address]);

  const connect = useConnect();

  //encapsulated functions
  const handleConnect = async (
    setWalletConnected: (connected: boolean) => void
  ) => {
    const connectOptions = {
      chainId: chain?.chainId,
    };

    try {
      const wallet = await connect(walletConfig, connectOptions); // Use connect hook
      console.log("Connected to", wallet);
      setWalletConnected(true);
    } catch (error: any) {
      console.error("Failed to connect", error);
      setWalletConnected(false);
    }
  };

  async function publishCampaign(form: {
    title: string;
    description: string;
    target: BigNumber;
    deadline: string;
    image: string;
  }) {
    const {
      mutateAsync: createCampaign,
      isLoading,
      data,
      isSuccess,
      isError,
      error,
    } = useContractWrite(contract, "createCampaign");

    await createCampaign({
      args: [
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ],
    });

    return {
      isSuccess,
      isError,
      isLoading,
      data,
      error,
    };
  }

  return (
    <BlockchainContext.Provider
      value={{
        address,
        handleConnect,
        publishCampaign,
        walletConnected,
        setWalletConnected,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainContextProvider;

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error(
      "useBlockchain must be used within BlockchainContextProvider"
    );
  }
  return context;
}
