"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/lib/authApi";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Request from "./Request";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useUser();
  const { api } = useAuth();

  const fetchData = async () => {
    try {
      const deviceResponse = await api.get(`/api/device?userId=${user.userId}`);
      setDevices(deviceResponse.data);
      const eventResponse = await api.get(`/api/event?userId=${user.userId}`);
      setEvents(eventResponse.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!(events.length > 0 && devices.length > 0)) return;

    const updatedDevices = devices.map((device) => {
      const deviceEvents = events.filter(
        (event) =>
          event.deviceId === device.deviceId &&
          dayjs(event.time).isAfter(dayjs().subtract(7, "day")),
      );
      let lastUpdate = deviceEvents.length > 0 ? deviceEvents[0].time : "N/A";
      if (lastUpdate != "N/A") {
        lastUpdate = new Date(lastUpdate).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
      }
      return {
        ...device,
        events: deviceEvents.length,
        lastUpdate,
      };
    });
    setDevices(updatedDevices);
  }, [events]);

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl bg-white p-4 pt-5 shadow-2xl">
      <div className="relative left-5 text-xl font-bold">Devices Overview</div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="font-serif uppercase">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Events (last 7 days)</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.deviceId}>
                <TableCell>{device.name}</TableCell>
                <TableCell>
                  {device.status === "active" ? (
                    <Badge className="capitalize">{device.status}</Badge>
                  ) : device.status === "inactive" ? (
                    <Badge variant="outline" className="capitalize">
                      {device.status}
                    </Badge>
                  ) : (
                    <Request device={device} />
                  )}
                </TableCell>
                <TableCell className="text-right">{device.events}</TableCell>
                <TableCell className="text-right">
                  {device.lastUpdate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
