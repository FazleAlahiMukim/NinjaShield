"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import LoginCard from "@/components/LoginCard";
import LogoAndName from "@/components/LogoAndName";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Loader from "@/components/Loader";

export default function Home() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (!loading && searchParams.get("redirected") === "true") {
      toast.warning("Please log in to continue", {
        description: "You were redirected because you are not logged in.",
      });
    }
  }, [loading, searchParams]);

  useEffect(() => {
    if (!loading && !!localStorage.getItem("loggedOut")) {
      toast.success("You have successfully logged out.");
      localStorage.removeItem("loggedOut");
    }
  }, [loading]);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-100">
      <Toaster richColors closeButton />
      <div className="absolute left-40 top-52">
        <LogoAndName size="large" />
        <h1 className="text-3xl">Secure Your Data, Protect Your Future:</h1>
        <h1 className="text-3xl">Discover the Ultimate DLP Solution Today!</h1>
      </div>
      <LoginCard className="absolute right-40" />
    </div>
  );
}
