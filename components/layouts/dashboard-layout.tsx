"use client";
import { useAtom } from "jotai";
import Navbar from "../globals/navbar";
import Sidebar from "../globals/sidebar";
import { sidebarIsOpenAtom } from "@/atoms/SidebarAtom";
import { useMediaQuery } from "@chakra-ui/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarIsOpen] = useAtom(sidebarIsOpenAtom);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content relative w-full">
        <Navbar />
        <div
          className={`dashboard-main-content pt-24 ${
            isMobile
              ? sidebarIsOpen
                ? "pl-5"
                : "pl-5"
              : sidebarIsOpen
              ? "pl-72"
              : "pl-24"
          } p-5`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
