"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoAndName from "./LogoAndName";
import {
  HomeIcon,
  LockClosedIcon,
  UserIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

const navLinks = [
  {
    type: "Analyze",
  },
  {
    name: "Dashboard",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    name: "Data Security",
    icon: LockClosedIcon,
    href: "/data-security",
  },
  {
    name: "User Behaviour",
    icon: UserIcon,
    href: "/user-behaviour",
  },
  {
    type: "Manage",
  },
  {
    name: "Policy",
    icon: ShieldCheckIcon,
    href: "/policy",
  },
  {
    name: "Data Classification",
    icon: CircleStackIcon,
    href: "/data-classification",
  },
  {
    name: "Devices",
    icon: ComputerDesktopIcon,
    href: "/devices",
  },
];

export default function NavBar() {
  const pathname = usePathname() || ''; 
  return (
    <div className="z-50 h-screen w-60 bg-customGray p-4">
      <Link href="/" className="flex border-b-2 border-b-gray-950 pb-4">
        <LogoAndName size="small" />
      </Link>
      <div className="mt-4 flex flex-col gap-4 text-customText">
        {navLinks.map((link, index) => {
          const isActive = pathname.startsWith(link.href);
          if (link.type) {
            return (
              <span key={index} className="font-bold text-gray-400">
                {link.type}
              </span>
            );
          }
          return (
            <Link
              key={index}
              href={link.href}
              className={`group flex items-center rounded-xl p-2 font-semibold hover:bg-white hover:shadow-xl ${isActive ? "bg-white shadow-xl" : ""} `}
            >
              <div
                className={`group-hover:from-customPink group-hover:to-customPink2 mr-3 flex size-8 items-center justify-center rounded-lg bg-white drop-shadow-xl group-hover:bg-gradient-to-br ${
                  isActive
                    ? "from-customPink to-customPink2 bg-gradient-to-br"
                    : ""
                } `}
              >
                <link.icon
                  className={`h-5 w-5 group-hover:text-white ${isActive ? "text-white" : ""}`}
                />
              </div>
              <span
                className={`group-hover:text-customText2 ${isActive ? "text-customText2" : ""} text-sm`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
