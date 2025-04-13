"use client";

import { Campaign } from "@/types";
import profile_icon from "@/public/assets/icons/campaign-card-profile-icon.svg";
import target_icon from "@/public/assets/icons/campaign-card-target-icon.svg";
import wallet_icon from "@/public/assets/icons/campaign-card-amount-icon.svg";
import calendar_icon from "@/public/assets/icons/campaign-card-deadline-icon.svg";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { Format } from "@/utils/format.util";
import Button from "@/components/ui/buttons";
import { ethers } from "ethers";
import { useMediaQuery } from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

const CampaignCard = ({
  id,
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
}: Omit<Campaign, "donators">) => {
  const { walletAddress } = useUser();
  const [isBelowMobile] = useMediaQuery("(max-width: 275px)");

  // Ensure target and amountCollected are valid BigNumber-compatible strings or integers
  // const formattedDeadline = deadline
  //   ? ethers.utils.formatEther(
  //       ethers.BigNumber.from(Math.floor(Number(target) * 1e18).toString())
  //     )
  //   : "0";
  const formattedTarget = Format.bigNumber(target);

  const formattedAmountCollected = Format.bigNumber(amountCollected);

  return (
    <div className="bg-[#05060F] flex flex-col gap-5 w-full border-2 text-off-white border-white/20 rounded-lg p-[18px]">
      <div
        className="relative w-full h-[8rem] rounded-lg overflow-hidden"
        style={{
          clipPath: "inset(0 0 0 0 round 0.5rem)",
        }}
      >
        {image && (
          <Image
            src={image}
            alt="image"
            className="object-cover"
            fill
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>

      <div className="flex items-center gap-3 w-full justify-between">
        <div className="">
          <p className="font-semibold text-xl">{title}</p>
          <p className="text-off-white/60">
            {description && Format.truncateString(description, 0, 25)}
          </p>
        </div>
        {walletAddress && walletAddress === owner ? (
          // <div className="relative group">
          //   <p className="absolute -top-10 right-0 text-white bg-white/60 p-2 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          //     Owner
          //   </p>
          <span className="p-1 rounded-full border-2 border-white/20">
            <IoPersonOutline color="#37383F" />
          </span>
        ) : (
          // </div>
          ""
        )}
      </div>
      <div
        className={`grid ${
          isBelowMobile ? "grid-cols-1" : "grid-cols-2"
        } w-full gap-[14px]`}
      >
        <span className="flex items-center gap-[6px]">
          <Image src={profile_icon} alt="profile" height={30} />
          <p className="text-sm">{Format.truncateString(owner)}</p>
        </span>
        <span className="flex items-center gap-[6px]">
          <Image src={target_icon} alt="target" height={30} />
          <p className="text-sm">{formattedTarget} ETH</p>
        </span>
        <span className="flex items-center gap-[6px]">
          <Image src={wallet_icon} alt="wallet" height={30} />
          <p className="text-sm">{formattedAmountCollected} ETH</p>
        </span>
        <span className="flex items-center gap-[6px]">
          <Image src={calendar_icon} alt="calendar" height={30} />
          <p className="text-sm">
            {deadline
              ? // ? new Date(deadline * 1000).toLocaleDateString() // Convert Unix timestamp to date
                Format.daysLeft(deadline) > 1
                ? Format.daysLeft(deadline) + " day(s) left"
                : "Expired " + Math.abs(Format.daysLeft(deadline)) + " days ago" // Convert Unix timestamp to date
              : "No deadline"}
          </p>
        </span>
      </div>

      <Button type="link" href={`/campaign/${id}`} className="text-sm">
        See Details <MdArrowOutward />
      </Button>
    </div>
  );
};

export default CampaignCard;
