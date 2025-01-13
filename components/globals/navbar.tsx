"use client";
import Button from "../ui/buttons";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Format } from "@/utils/format.util";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { LocalStorage } from "@/utils/localStorage.util";
import { sidebarIsOpenAtom } from "@/atoms/SidebarAtom";
import { Skeleton, useMediaQuery } from "@chakra-ui/react";
import { useAtom } from "jotai";

const Navbar = () => {
  // const [sidebarIsOpen] = useAtom(sidebarIsOpenAtom);
  // const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { walletConnected, setWalletConnected, handleConnect, address } =
    useBlockchain();

  console.log("walletConnected: ", walletConnected);
  console.log("address: ", address);

  const { walletAddress, isLoading } = useUser();
  console.log("wallet Adress from local storage: ", walletAddress);

  // const [walletAddress, setWalletAddress] = useState("");

  // useEffect(() => {
  //   const storedWalletAddress = LocalStorage.get("wallet-address");
  //   console.log("storedWalletAddress", storedWalletAddress);
  //   if (storedWalletAddress) {
  //     setWalletAddress(storedWalletAddress);
  //   }
  // }, []);

  // console.log("walletAddress from userUser", walletAddress);

  const connectWallet = async () => {
    await handleConnect(setWalletConnected);
    if (address) LocalStorage.set("wallet-address", address);
  };

  return (
    <div
      className={`navbar h-[4.35rem] w-full fixed flex items-center justify-end border-b-2 border-white/20 bg-[#05060F] p-2 px-4 `}
    >
      {isLoading ? (
        <Skeleton height="30px" width="60px" />
      ) : walletConnected || (address && walletAddress) ? (
        <p>
          {address && walletAddress && Format.truncateString(walletAddress)}
        </p>
      ) : (
        <Button type="button" className="text-sm" onClick={connectWallet}>
          Connect
        </Button>
      )}
    </div>
  );
};

export default Navbar;
