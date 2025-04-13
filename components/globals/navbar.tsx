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
// import { ConnectWallet } from "@thirdweb-dev/react";
import {
  TbLayoutSidebarFilled,
  TbLayoutSidebarRightFilled,
} from "react-icons/tb";
import Searchbar from "../ui/searchbar";

const Navbar = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useAtom(sidebarIsOpenAtom);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { walletConnected, handleConnect, address } = useBlockchain();

  const { isLoading, walletAddress } = useUser();

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

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
    await handleConnect();
    // console.log("wallet connected");
    if (address) LocalStorage.set("wallet-address", address);
  };

  return (
    <div
      className={`navbar h-[4.35rem] w-full fixed flex items-center z-10 justify-between border-b-2 border-white/20 bg-[#05060F] p-2 px-4 `}
    >
      {isMobile ? (
        sidebarIsOpen ? (
          <TbLayoutSidebarFilled
            size={"20px"}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <TbLayoutSidebarRightFilled
            size={"20px"}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        )
      ) : (
        ""
        // <p></p>
      )}
      <div
        className={`flex items-center justify-between w-full ${
          isMobile
            ? sidebarIsOpen
              ? "pl-0"
              : "pl-0"
            : sidebarIsOpen
            ? "pl-64"
            : "pl-20"
        }`}
      >
        <Searchbar />

        {/* <ConnectWallet/> */}
        {isLoading ? (
          <Skeleton height="30px" width="60px" />
        ) : walletConnected || (address && walletAddress) ? (
          <p>
            {address && walletAddress && Format.truncateString(walletAddress)}
          </p>
        ) : (
          <Button type="button" className="text-sm" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
