import Link from "next/link";
import BrandLogo from "../components";
import { sidebarLinks } from "@/data/sidebar-links.data";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="sidebar fixed">
      <BrandLogo />
      <div className="flex flex-col gap-1">
        {sidebarLinks.map((node, index) => (
          <Link
            key={index}
            href={node.link}
            className="flex items-center gap-3"
          >
            <node.inactiveIcon />
            <p className="text-sm">{node.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
