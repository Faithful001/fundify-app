// import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

import { IconType } from "react-icons";
import {
  IoLogOut,
  IoLogOutOutline,
  IoPersonCircle,
  IoPersonCircleOutline,
} from "react-icons/io5";
import {
  MdCampaign,
  MdDashboard,
  MdOutlineCampaign,
  MdOutlineDashboard,
  MdOutlinePayments,
  MdPayments,
} from "react-icons/md";
import { PiHandWithdraw, PiHandWithdrawFill } from "react-icons/pi";

interface SidebarLinksProps {
  name: string;
  inactiveIcon: IconType;
  activeIcon: IconType;
  link: string;
  disabled: boolean;
}

export const sidebarLinks: SidebarLinksProps[] = [
  {
    name: "Dashboard",
    inactiveIcon: MdOutlineDashboard,
    activeIcon: MdDashboard,
    link: "/",
    disabled: false,
  },
  {
    name: "Campaign",
    inactiveIcon: MdOutlineCampaign,
    activeIcon: MdCampaign,
    link: "/create-campaign",
    disabled: false,
  },
  {
    name: "Payment",
    inactiveIcon: MdOutlinePayments,
    activeIcon: MdPayments,
    link: "/",
    disabled: true,
  },
  {
    name: "Withdraw",
    inactiveIcon: PiHandWithdraw,
    activeIcon: PiHandWithdrawFill,
    link: "/",
    disabled: true,
  },
  {
    name: "Profile",
    inactiveIcon: IoPersonCircleOutline,
    activeIcon: IoPersonCircle,
    link: "/profile",
    disabled: false,
  },
  {
    name: "Logout",
    inactiveIcon: IoLogOutOutline,
    activeIcon: IoLogOut,
    link: "/",
    disabled: true,
  },
];
