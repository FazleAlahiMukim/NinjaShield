"use client";
import { useUser } from "../context/UserContext";
import React from "react";

export default function () {
  const { user } = useUser();

  return (
    <div className="flex h-20 flex-row items-center justify-between bg-customGray">
      <div className="flex flex-row relative left-10 items-end">
        <span className="text-xl uppercase">
          {user?.organization || "Organization"}
        </span>
        <span className="text-gray-500 ml-2">
          Managed by {user?.firstName || "John"} {user?.lastName || "Doe"}
        </span>
      </div>
      <button className="relative right-10"> Log Out </button>
    </div>
  );
}
