"use client";
import { LocalStorage } from "@/utils/localStorage.util";
// import { LocalStorage } from "@/utils/localStorage.util";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBlockchain } from "./BlockchainContext";

interface UserContextProps {
  walletAddress: string | null;
  setWalletAddress: (walletAddress: string) => void;
  unSetWalletAddress: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddressState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { address } = useBlockchain();

  useEffect(() => {
    const loadWalletAddress = async () => {
      setIsLoading(true);
      const userWalletAddress = LocalStorage.get("wallet-address");
      if (userWalletAddress) {
        setWalletAddressState(userWalletAddress);
      }
      setIsLoading(false);
    };

    loadWalletAddress();
  }, []);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    } else {
      unSetWalletAddress();
    }
  }, [address]);

  const setWalletAddress = (newWalletAddress: string) => {
    if (newWalletAddress !== walletAddress) {
      setWalletAddressState(newWalletAddress);
      LocalStorage.set("wallet-address", newWalletAddress); // Ensure correct key
    }
  };

  const unSetWalletAddress = () => {
    setWalletAddressState(null);
    LocalStorage.remove("wallet-address"); // Ensure correct key
  };

  return (
    <UserContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        unSetWalletAddress,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "The `useUser` hook must be used within a `UserContextProvider`."
    );
  }
  return context;
}
