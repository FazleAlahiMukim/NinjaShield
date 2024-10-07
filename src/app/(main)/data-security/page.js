"use client";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./table";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/lib/authApi";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [events, setEvents] = useState([]);
  const { user } = useUser();
  const { api } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await api.get(`/api/event?userId=${user.userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Events Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl bg-white p-4 pt-5 shadow-2xl">
      <div className="flex flex-row items-center">
        <h1 className="relative left-5 text-xl font-bold">Events Overview</h1>
        <button className="relative left-10" onClick={fetchEvents}>
          <ArrowPathIcon className="h-5 w-5 transform text-gray-400 transition-transform duration-300 hover:scale-125"></ArrowPathIcon>
        </button>
      </div>
      <DataTable columns={columns} data={events} />
    </div>
  );
}
