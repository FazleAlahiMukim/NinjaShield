"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";

export default function MainLayout({ children }) {
  const { user, userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading) {
      if (!user && router.pathname !== "/") {
        router.replace("/?redirected=true");
      }
    }
  }, [userLoading, user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <div className="fixed left-0 top-0 h-full">
        <NavBar />
      </div>
      <div className="ml-[240px] flex-grow">
        <TopBar />
        <div className="bg-customGray">{children}</div>
      </div>
    </div>
  );
}
