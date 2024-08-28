"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";

export default function MainLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && router.pathname !== "/") {
      router.replace("/?redirected=true");
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <NavBar />
      <div className="flex-grow">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
