"use client";
import dynamic from "next/dynamic";

const HomeComponent = dynamic(() => import("./HomeComponent"), {
  ssr: false,
});

export default function Home() {
  return <HomeComponent />;
}
