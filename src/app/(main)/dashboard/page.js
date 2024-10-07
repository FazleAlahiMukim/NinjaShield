"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/lib/authApi";
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
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockClosedIcon, UsersIcon } from "@heroicons/react/24/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [numberOfHighRiskEvents, setNumberOfHighRiskEvents] = useState(0);
  const [numberofHighRiskUsers, setNumberOfHighRiskUsers] = useState(0);
  const [days, setDays] = useState("Last 30 days");
  const { user } = useUser();
  const { api } = useAuth();

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

  const getAllDays = () => {
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
    let chartDays = [];

    if (days === "Last 30 days") {
      chartDays = getLast30Days();
    } else if (days === "Last 7 days") {
      chartDays = getLast7Days();
    } else {
      chartDays = getAllDays();
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

  const fetchEvents = async () => {
    try {
      const response = await api.get(`/api/event?userId=${user.userId}`);
      setAllEvents(response.data);
    } catch (error) {
      console.error("Events Fetch error:", error);
    }
  };

  const countHighRiskEvents = () => {
    setNumberOfHighRiskEvents(
      events.filter((event) => event.risk === "high").length,
    );
  };

  const countHighRiskUsers = () => {
    const highRiskDeviceNames = new Set(
      events
        .filter((event) => event.risk === "high")
        .map((event) => event.deviceName),
    );
    setNumberOfHighRiskUsers(highRiskDeviceNames.size);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!(allEvents.length > 0)) return;

    if (days === "Last 30 days") {
      setEvents(
        allEvents.filter((event) =>
          dayjs(event.time).isAfter(dayjs().subtract(30, "day")),
        ),
      );
    } else if (days === "Last 7 days") {
      setEvents(
        allEvents.filter((event) =>
          dayjs(event.time).isAfter(dayjs().subtract(7, "day")),
        ),
      );
    } else {
      setEvents(allEvents);
    }
  }, [days, allEvents]);

  useEffect(() => {
    if (events.length > 0) {
      countHighRiskEvents();
      countHighRiskUsers();
      setChartData(processData(events));
    }
  }, [events]);

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl">
      <div className="flex flex-row justify-between rounded-3xl bg-white p-4 pt-5">
        <h1 className="relative left-5 text-xl font-bold">Dashboard</h1>
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
      <div className="flex flex-row space-x-4 pt-1">
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="flex flex-row items-center">
              <LockClosedIcon className="mr-2 h-6 w-6" />
              <span>High-risk events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="ml-5">
            <span className="text-2xl font-bold text-red-500">
              {numberOfHighRiskEvents}
            </span>{" "}
            of {events.length} total
          </CardContent>
          <CardFooter className="ml-5 flex justify-between text-gray-400">
            {days}
          </CardFooter>
        </Card>
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="flex flex-row items-center">
              <UsersIcon className="mr-2 h-6 w-6" />
              <span>High-risk users</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="ml-5">
            <span className="text-2xl font-bold text-red-500">
              {numberofHighRiskUsers}
            </span>{" "}
            of 7 total
          </CardContent>
          <CardFooter className="ml-5 flex justify-between text-gray-400">
            {days}
          </CardFooter>
        </Card>
      </div>
      <div className="mt-5 bg-white">
        <ScrollArea usage="chart" className="overflow-x-auto rounded-md border" style={{ width: 'calc(100vw - 340px)'}}>
          <div style={(days === "All time" && chartData.length > 30) ? { width: `${chartData.length * 20}px`, height: "350px" } : { height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => dayjs(date).format("D MMM")}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" fill="#ff4d4d" name="High" />
                <Bar dataKey="medium" fill="#ffa500" name="Medium" />
                <Bar dataKey="low" fill="#82ca9d" name="Low" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
