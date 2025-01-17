"use client";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Campaign } from "@/types";
import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import profile_icon from "@/public/assets/icons/campaign-card-profile-icon.svg";
import target_icon from "@/public/assets/icons/campaign-card-target-icon.svg";
import wallet_icon from "@/public/assets/icons/campaign-card-amount-icon.svg";
import calendar_icon from "@/public/assets/icons/campaign-card-deadline-icon.svg";
import { Format } from "@/utils/format.util";
import { ethers } from "ethers";
import { MdCallReceived } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";

const CampaignDetails = () => {
  const { getCampaign } = useBlockchain();
  const [campaignIsLoading, setCampaignIsLoading] = useState(true);
  const params: { _id: string } = useParams();
  const [campaignData, setCampaignData] = useState<Campaign | null>(null);
  const [campaignError, setCampaignError] = useState<string>("");

  // const [donators, seto]

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setCampaignIsLoading(true);
        const campaign = await getCampaign(params._id);
        setCampaignData(campaign);
      } catch (error: any) {
        console.error("Error fetching campaign:", error);
        setCampaignError(error?.message || "Failed to fetch campaign.");
      } finally {
        setCampaignIsLoading(false);
      }
    };

    if (params._id) {
      fetchCampaign();
    }
  }, [params._id, getCampaign]);

  console.log("campaignData", campaignData);
  console.log("campaignError", campaignError);
  console.log("campaignIsLoading", campaignIsLoading);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* <h1 className="text-2xl font-bold">Campaign Details</h1> */}
        {campaignIsLoading || !campaignData ? (
          <div className="flex flex-col gap-4 w-full">
            <Skeleton
              className="-z-10"
              height="8rem"
              rounded="8px"
              width="100%"
            />
            <Skeleton
              className="-z-10"
              height="20rem"
              rounded="8px"
              width="100%"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div
              className="relative w-full h-[8rem] rounded-lg overflow-hidden"
              style={{
                clipPath: "inset(0 0 0 0 round 0.5rem)",
              }}
            >
              {campaignData?.image && (
                <Image
                  src={campaignData?.image}
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
            <span className="flex flex-col">
              {/* Title */}
              <h1 className="text-2xl">{campaignData?.title}</h1>
              {/* Description */}
              <h1 className="text-white/70">{campaignData?.description}</h1>

              {/* <p>See more</p> */}
            </span>
            {/* Campaign details */}
            <div className="flex sm:flex-row flex-col justify-between gap-4 relative">
              <div className="flex flex-col gap-2">
                {/* Owner */}
                <span className="flex flex-col">
                  <span className="flex items-center gap-1">
                    {/* <Image src={profile_icon} alt="profile" height={20} /> */}
                    <p className="text-white/70 font-bold">OWNER</p>
                  </span>
                  <p className="text-sm">{campaignData.owner}</p>
                </span>
                {/* Target */}
                <span className="flex flex-col">
                  <span className="flex items-center gap-1">
                    {/* <Image src={target_icon} alt="profile" height={40} /> */}
                    <p className="text-white/70 font-bold">TARGET</p>
                  </span>
                  <p className="text-sm">
                    {ethers.utils.formatEther(campaignData.target)}
                  </p>
                </span>
                {/* Amount Collected */}
                <span className="flex flex-col">
                  <span className="flex items-center gap-1">
                    {/* <Image src={wallet_icon} alt="profile" height={40} /> */}
                    <p className="text-white/70 font-bold">AMOUNT COLLECTED</p>
                  </span>
                  <p className="text-sm">
                    {ethers.utils.formatEther(campaignData.amountCollected)}
                  </p>
                </span>
                {/* Deadline */}
                <span className="flex flex-col">
                  <span className="flex items-center gap-1">
                    {/* <Image src={calendar_icon} alt="profile" height={40} /> */}
                    <p className="text-white/70 font-bold">DEADLINE</p>
                  </span>
                  <p className="text-sm">
                    {Format.convertToDate(Number(campaignData.deadline))}
                  </p>
                </span>
              </div>
              {/* Donors */}
              <div className="p-3 rounded-lg bg-[#1d1e2e] sticky top-20 right-2 sm:w-full w-[20rem] h-[20rem] overflow-auto">
                {campaignData.donators.length < 1 ? (
                  <span className="flex flex-col gap-4 items-center justify-center w-full">
                    <p className="flex items-center gap-1">
                      No donor yet <BiDonateHeart />
                    </p>
                    <FaRegSadTear
                      size={"8rem"}
                      // opacity={50}
                      className="opacity-10"
                    />
                  </span>
                ) : (
                  campaignData.donators.map((donator, index) => (
                    <div className="flex items-center w-full">
                      <span className="flex flex-col items-start">
                        <p key={index}>
                          {Format.truncateString(donator.donator)}
                        </p>
                        <p key={index} className="text-sm text-white/70">
                          {ethers.utils.formatEther(donator.amount)}
                        </p>
                      </span>
                      <MdCallReceived color="#21d830" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetails;
