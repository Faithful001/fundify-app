"use client";
import {
  useAddress,
  useConnect,
  metamaskWallet,
  useContract,
  useChain,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers, BigNumber } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Campaign, Donator } from "@/types";
import { contractABI, contractAddress } from "@/constants/contract-constants";

// Blockchain context interface
interface BlockchainContextProps {
  walletConnected: boolean;
  setWalletConnected: React.Dispatch<React.SetStateAction<boolean>>;
  address: string | undefined;
  handleConnect: () => Promise<void>;
  publishCampaign: (form: {
    title: string;
    description: string;
    target: BigNumber;
    deadline: string;
    image: string;
  }) => Promise<
    | {
        success: boolean;
        response: any;
      }
    | { success: boolean; error: any }
  >;
  getCampaigns: () => Promise<Campaign[]>;
  getCampaign: (id: string | number) => Promise<Campaign | null>;
  getDonators: (id: string | number) => Promise<Donator[]>;
  donateToCampaign: (pId: string | number, amount: string) => Promise<any>;
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
  const { contract } = useContract(contractAddress, contractABI);
  const [walletConnected, setWalletConnected] = useState(false);
  const toast = useToast();

  const {
    mutateAsync: createCampaign,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useContractWrite(contract, "createCampaign");

  useEffect(() => {
    setWalletConnected(!!address);
  }, [address]);

  const connect = useConnect();

  const handleConnect = async () => {
    try {
      const connectOptions = { chainId: chain?.chainId };
      console.log("handle connect function reached");
      const wallet = await connect(walletConfig, connectOptions);
      console.log("Connected to", wallet);
      setWalletConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error: any) {
      console.error("Failed to connect", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Unable to connect your wallet.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const publishCampaign = async (form: {
    title: string;
    description: string;
    target: BigNumber;
    deadline: string;
    image: string;
  }) => {
    try {
      console.log("publishCampaign function reached");
      // Ensure deadline is properly formatted as a timestamp
      const deadlineTimestamp = Math.floor(
        new Date(form.deadline).getTime() / 1000
      );
      if (isNaN(deadlineTimestamp)) {
        throw new Error("Invalid deadline format.");
      }

      // create the campaign
      const response = await createCampaign({
        args: [
          form.title,
          form.description,
          form.target,
          deadlineTimestamp,
          form.image,
        ],
      });

      console.log("response", response);

      // Check the transaction status from the receipt
      const receipt = response.receipt;
      if (receipt.status === 0) {
        throw new Error(
          "Transaction failed on the blockchain. Please check the contract logic."
        );
      }

      // Notify the user of success
      toast({
        title: "Campaign Published",
        description: "Your campaign has been successfully published.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Return success and response details
      return { success: true, response };
    } catch (error: any) {
      // Differentiate between error types for better debugging
      let errorMessage = "An unexpected error occurred.";
      if (error.code === "INSUFFICIENT_FUNDS") {
        errorMessage =
          "You have insufficient funds to cover the transaction fees.";
      } else if (error.code === "ACTION_REJECTED") {
        errorMessage = "Transaction was rejected by the user.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("Error publishing campaign:", error);

      // Notify the user of failure
      toast({
        title: "Publish Failed",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Return failure details
      return { success: false, error };
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract?.call("getCampaigns");
      // if (!campaigns) throw new Error("No campaigns found");

      const parsedCampaigns = campaigns?.map(
        (campaign: Campaign, index: number) => ({
          id: campaign.id,
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline,
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: index,
        })
      );

      console.log("campaigns from blockchain context", parsedCampaigns);

      return parsedCampaigns;
    } catch (error: any) {
      console.error("Error fetching campaigns:", error);
      toast({
        title: "Fetch Failed",
        description: error.message || "Unable to fetch campaigns.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return [];
    }
  };

  const getCampaign = async (id: string | number) => {
    try {
      const campaign = await contract?.call("getCampaign", [id]);
      return campaign || null;
    } catch (error: any) {
      console.error("Error fetching campaign:", error);
      toast({
        title: "Fetch Failed",
        description: error.message || "Unable to fetch campaign details.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return null;
    }
  };

  const getDonators = async (id: string | number) => {
    try {
      const donators = await contract?.call("getDonators", [id]);
      const parsedDonators = donators.map((donator: Donator) => ({
        amount: ethers.utils.formatEther(donator.amount.toString()),
        donator: donator.donator,
      }));
      return parsedDonators;
    } catch (error: any) {
      console.error("Error fetching donators:", error);
      toast({
        title: "Fetch Failed",
        description: error.message || "Unable to fetch donators.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return [];
    }
  };

  const donateToCampaign = async (id: string | number, amount: string) => {
    try {
      const response = await contract?.call("donateToCampaign", [id], {
        value: ethers.utils.parseEther(amount),
      });

      toast({
        title: "Donation Successful",
        description: "Your donation was successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return response;
    } catch (error: any) {
      console.error("Error donating to campaign:", error);
      toast({
        title: "Donation Failed",
        description: error.message || "Unable to process your donation.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return null;
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        address,
        handleConnect,
        walletConnected,
        setWalletConnected,
        publishCampaign,
        getCampaigns,
        getCampaign,
        getDonators,
        donateToCampaign,
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
