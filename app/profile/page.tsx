"use client";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Campaign } from "@/types";
import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSparklingLine } from "react-icons/ri";
import CampaignCard from "@/components/pages/index/campaign-card";
import Button from "@/components/ui/buttons";
import { useUser } from "@/contexts/UserContext";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { walletAddress } = useUser();
  const { getUserCampaigns } = useBlockchain();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const fetchedCampaigns =
        walletAddress && (await getUserCampaigns(walletAddress));

      const normalizedCampaigns =
        fetchedCampaigns &&
        fetchedCampaigns?.map((campaign: any) => ({
          ...campaign,
          deadline: campaign.deadline
            ? new Date(campaign.deadline * 1000)?.toISOString().split("T")[0] ||
              "0"
            : "0",
        }));

      setCampaigns(normalizedCampaigns as Omit<Campaign[], "donators">);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [getUserCampaigns]);

  const renderCampaigns = () => {
    if (isLoading) {
      return (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="-z-10"
              height="22rem"
              rounded="8px"
              width="100%"
            />
          ))}
        </div>
      );
    }

    if (campaigns?.length === 0) {
      return (
        <div className="flex flex-col gap-1">
          <p>No campaign from you yet</p>
          <Button type="link" href="/create-campaign" className="text-sm w-max">
            Start creating <RiSparklingLine color="#ffffff" />
          </Button>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
        {campaigns?.map((campaign, index) => (
          <CampaignCard key={index} {...campaign} />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Your campaigns</h1>
          {/* <p className="text-off-white/60 text-sm">Donate to a project today</p> */}
        </header>
        {!walletAddress ? (
          <p className="text-lg">Connect wallet to view your campaign</p>
        ) : (
          renderCampaigns()
        )}
      </div>
    </DashboardLayout>
  );
}
