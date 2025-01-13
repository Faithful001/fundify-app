"use client";

import { atom } from "jotai";
import {
  useAddress,
  useConnect,
  metamaskWallet,
  useContract,
  useContractWrite,
  useChain,
} from "@thirdweb-dev/react";
// import { Campaign } from "@/types";

export const walletConnectionState = atom(false);

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const { contract } = useContract(contractAddress);

const chain = useChain();

export const addressAtom = useAddress();

const walletConfig = metamaskWallet();

export async function handleConnectAtom(
  setWalletConnected: (connected: boolean) => void
) {
  const connect = useConnect();
  const chain = useChain();

  const connectOptions = {
    chainId: chain?.chainId,
  };

  try {
    const wallet = await connect(walletConfig, connectOptions);
    setWalletConnected(true);
  } catch (e: any) {
    console.error("Failed to connect", e);
    setWalletConnected(false);
  }
}

const {
  mutateAsync: createCampaign,
  isLoading,
  error,
} = useContractWrite(contract, "createCampaign");
