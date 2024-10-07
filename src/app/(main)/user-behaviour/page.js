"use client";
import React, { useState, useEffect } from "react";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function UserBehaviour() {
  const [allEvents, setAllEvents] = useState([]);
  const [chartData, setChartData] = useState({});
  const [devices, setDevices] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [days, setDays] = useState("Last 30 days");
  const { user } = useUser();
  const { api } = useAuth();

  const toggleRow = (deviceId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [deviceId]: !prevExpandedRows[deviceId],
    }));
  };

  const getLast30Days = () => {
    const last30Days = [];
    for (let i = 0; i < 30; i++) {
      last30Days.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
    }
    return last30Days.reverse();
  };

  const getLast7Days = () => {
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      last7Days.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
    }
    return last7Days.reverse();
  };

  const getAllDays = (events) => {
    if (events === undefined || events.length < 2) {
      return [];
    }
    const allDays = [];
    const oldestDate = events[events.length - 1].time;
    const newestDate = events[0].time;
    const days = dayjs(newestDate).diff(oldestDate, "day");

    for (let i = 0; i < days; i++) {
      allDays.push(dayjs(oldestDate).add(i, "day").format("YYYY-MM-DD"));
    }

    return allDays;
  };

  const processData = (data) => {
    if (data === undefined) {
      return [];
    }
    let chartDays = [];

    if (days === "Last 30 days") {
      chartDays = getLast30Days();
    } else if (days === "Last 7 days") {
      chartDays = getLast7Days();
    } else {
      chartDays = getAllDays(data);
    }

    const processedData = chartDays.map((date) => ({
      date,
      high: 0,
      medium: 0,
      low: 0,
    }));

    data.forEach((item) => {
      const itemDate = dayjs(item.time).format("YYYY-MM-DD");
      const risk = item.risk.toLowerCase();

      const dateEntry = processedData.find((entry) => entry.date === itemDate);

      if (dateEntry) {
        dateEntry[risk] += 1;
      }
    });

    return processedData;
  };

  const fetchData = async () => {
    try {
      const deviceResponse = await api.get(`/api/device?userId=${user.userId}`);
      const tempDevices = deviceResponse.data.filter(
        (device) => device.status !== "requested",
      );
      setDevices(tempDevices);
      const eventResponse = await api.get(`/api/event?userId=${user.userId}`);
      setAllEvents(eventResponse.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!(allEvents.length > 0)) return;

    const updatedDevices = devices.map((device) => {
      let deviceEvents;
      if (days === "Last 30 days") {
        deviceEvents = allEvents.filter(
          (event) =>
            event.deviceId === device.deviceId &&
            dayjs(event.time).isAfter(dayjs().subtract(30, "day")),
        );
      } else if (days === "Last 7 days") {
        deviceEvents = allEvents.filter(
          (event) =>
            event.deviceId === device.deviceId &&
            dayjs(event.time).isAfter(dayjs().subtract(7, "day")),
        );
      } else {
        deviceEvents = allEvents.filter(
          (event) => event.deviceId === device.deviceId,
        );
      }

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
        events: deviceEvents,
        high: deviceEvents.filter((event) => event.risk === "high").length,
        medium: deviceEvents.filter((event) => event.risk === "medium").length,
        low: deviceEvents.filter((event) => event.risk === "low").length,
        lastUpdate,
      };
    });

    setDevices(updatedDevices);
  }, [allEvents, days]);

  useEffect(() => {
    if (devices.length > 0) {
      devices.forEach((device) => {
        const data = processData(device.events);
        setChartData((prevChartData) => ({
          ...prevChartData,
          [device.deviceId]: data,
        }));
      });
    }
  }, [devices]);

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl bg-white p-4 pt-5 shadow-2xl">
      <div className="flex flex-row justify-between rounded-3xl bg-white p-4 pt-5">
        <h1 className="relative left-5 text-xl font-bold">User Behaviour</h1>
        <div>
          <Select value={days} onValueChange={(value) => setDays(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last 30 days">Last 30 days</SelectItem>
              <SelectItem value="Last 7 days">Last 7 days</SelectItem>
              <SelectItem value="All time">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="font-serif uppercase">
              <TableHead>Name</TableHead>
              <TableHead className="text-center">High Risk Events</TableHead>
              <TableHead className="text-center">Medium Risk Events</TableHead>
              <TableHead className="text-center">Low Risk Events</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <React.Fragment key={device.deviceId}>
                <TableRow
                  key={device.deviceId}
                  onClick={() => toggleRow(device.deviceId)}
                  className="cursor-pointer"
                >
                  <TableCell>{device.name}</TableCell>
                  <TableCell className="text-center">{device.high}</TableCell>
                  <TableCell className="text-center">{device.medium}</TableCell>
                  <TableCell className="text-center">{device.low}</TableCell>
                  <TableCell className="text-right">
                    {device.lastUpdate}
                  </TableCell>
                </TableRow>

                {expandedRows[device.deviceId] && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <ScrollArea
                        usage="chart"
                        className="overflow-x-auto rounded-md border"
                        style={{ width: "calc(100vw - 340px)" }}
                      >
                        <div
                          style={
                            days === "All time" &&
                            chartData[device.deviceId].length > 30
                              ? {
                                  width: `${chartData[device.deviceId].length * 20}px`,
                                  height: "350px",
                                }
                              : { height: "350px" }
                          }
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData[device.deviceId]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="date"
                                tickFormatter={(date) =>
                                  dayjs(date).format("D MMM")
                                }
                              />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="high" fill="#ff4d4d" name="High" />
                              <Bar
                                dataKey="medium"
                                fill="#ffa500"
                                name="Medium"
                              />
                              <Bar dataKey="low" fill="#82ca9d" name="Low" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
