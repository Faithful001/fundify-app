"use client";
import Link from "next/link";
import BrandLogo from "../components";
import { sidebarLinks } from "@/data/sidebar-links.data";
import {
  TbLayoutSidebarFilled,
  TbLayoutSidebarRightFilled,
} from "react-icons/tb";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { sidebarIsOpenAtom } from "@/atoms/SidebarAtom";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useAtom(sidebarIsOpenAtom);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarIsOpen(false);
      } else {
        setSidebarIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <div
      className={`sidebar z-10 fixed flex flex-col justify-between border-r-2 border-white/20 bg-[#05060F] h-screen transition-all duration-300 ${
        isMobile
          ? sidebarIsOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-20"
          : sidebarIsOpen
          ? "w-64"
          : "w-20"
      }`}
    >
      <div>
        <div
          className={`h-[4.35rem] w-full flex items-center ${
            !sidebarIsOpen ? "justify-center" : "justify-between"
          } border-b-2 border-white/20 p-2`}
        >
          {sidebarIsOpen && <BrandLogo />}
          {sidebarIsOpen ? (
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
          )}
        </div>

        <div
          className={`flex flex-col ${
            !sidebarIsOpen && "items-center"
          } gap-3 pt-4 px-2`}
        >
          {sidebarLinks.map((node, index) =>
            node.link !== null ? (
              <Link
                key={index}
                href={node.link}
                className={`${
                  pathname === node.link ? "bg-primary" : ""
                } px-4 flex items-center gap-3 hover:bg-primary p-2 rounded-md transition-opacity duration-300`}
              >
                <node.inactiveIcon size={"20px"} />
                {sidebarIsOpen && (
                  <p
                    className={` ${
                      sidebarIsOpen ? "opacity-100" : "opacity-0"
                    } font-light`}
                  >
                    {node.name}
                  </p>
                )}
              </Link>
            ) : (
              <span
                key={index}
                className={`${
                  pathname === node.link ? "bg-primary" : ""
                } cursor-not-allowed opacity-50 px-4 flex items-center gap-3 hover:bg-primary p-2 rounded-md transition-opacity duration-300`}
              >
                <node.inactiveIcon size={"20px"} />
                {sidebarIsOpen && (
                  <p
                    className={` ${
                      sidebarIsOpen ? "opacity-100" : "opacity-0"
                    } font-light`}
                  >
                    {node.name}
                  </p>
                )}
              </span>
            )
          )}
        </div>
      </div>
      <div className="p-4">
        <span
          className={`flex items-center w-full ${
            !sidebarIsOpen && "justify-center"
          }  gap-3 hover:cursor-pointer p-2 rounded-md transition-opacity duration-300`}
        >
          <IoLogOutOutline size={"20px"} />
          {sidebarIsOpen && (
            <p
              className={` ${
                sidebarIsOpen ? "opacity-100" : "opacity-0"
              } font-light`}
            >
              Logout
            </p>
          )}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
