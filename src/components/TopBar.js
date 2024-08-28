"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserIcon,
  QuestionMarkCircleIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";
import { useAuth } from '@/lib/authApi';

export default function TopBar() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const { api } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem("user");

    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.setItem("loggedOut", "true");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="flex h-20 flex-row items-center justify-between bg-customGray">
      <div className="relative left-5 flex flex-row items-end">
        <span className="text-xl uppercase">
          {user?.organization || "Organization"}
        </span>
        <span className="ml-2 text-gray-500">
          Managed by {user?.firstName || "John"} {user?.lastName || "Doe"}
        </span>
      </div>
      <div className="relative right-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Bars4Icon className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative right-10 w-40">
            <DropdownMenuItem>
              <Button variant="ghost">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="ghost">
                <QuestionMarkCircleIcon className="mr-2 h-4 w-4" />
                <span>Help</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <Button variant="ghost">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
