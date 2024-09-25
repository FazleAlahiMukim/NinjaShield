"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockClosedIcon, UsersIcon } from "@heroicons/react/24/solid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getData() {
  return [
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "Email",
      source: "C:\\",
      time: "2024-09-24 10:23:00",
    },
    {
      id: "728ed52f",
      risk: "low",
      action: "warn",
      dataClass: "Personal",
      file: "file.txt",
      user: "Mijan",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-23 11:56:00",
    },
    {
      id: "728ed52f",
      risk: "medium",
      action: "log",
      dataClass: "Personal",
      file: "file.txt",
      user: "Sayeed",
      destination: "Email",
      source: "C:\\",
      time: "2024-09-22 16:34:00",
    },
    {
      id: "728ed52f",
      risk: "low",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Junayed",
      destination: "Email",
      source: "C:\\",
      time: "2024-09-21 14:18:00",
    },
    {
      id: "728ed52f",
      risk: "medium",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Foisal",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-23 23:12:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Karim",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-22 06:30:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Junayed",
      destination: "Web",
      source: "C:\\",
      time: "2024-09-23 07:15:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "Web",
      source: "C:\\",
      time: "2024-09-22 09:10:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-24 12:18:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Foisal",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-20 13:15:00",
    },
    {
      id: "728ed52f",
      risk: "low",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-20 15:20:00",
    },
    {
      id: "728ed52f",
      risk: "low",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Karim",
      destination: "Web",
      source: "C:\\",
      time: "2024-09-18 16:15:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "Web",
      source: "C:\\",
      time: "2024-09-22 05:20:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "Onedrive",
      source: "C:\\",
      time: "2024-09-23 16:20:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Karim",
      destination: "USB",
      source: "C:\\",
      time: "2024-09-23 19:30:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Sayeed",
      destination: "Web",
      source: "C:\\",
      time: "2024-09-24 19:50:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "Web",
      source: "C:\\",
      time: "2024-09-21 12:30:00",
    },
    {
      id: "728ed52f",
      risk: "high",
      action: "block",
      dataClass: "Personal",
      file: "file.txt",
      user: "Alahi",
      destination: "Email",
      source: "C:\\",
      time: "2024-09-23 18:30:00",
    },
  ];
}

const getLast30Days = () => {
  const last30Days = [];
  for (let i = 0; i < 30; i++) {
    last30Days.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }
  return last30Days.reverse();
};

const processData = (data) => {
  const last30Days = getLast30Days();

  const processedData = last30Days.map((date) => ({
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

export default function Dashboard() {
  const { user } = useUser();
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState("Last 30 days");

  useEffect(() => {
    const data = getData();
    setChartData(processData(data));
  }, []);

  return (
    <div className="relative top-4 mx-10 mb-10 p-4 pt-5">
      <div className="flex flex-row justify-between rounded-lg bg-white p-3">
        <div className="relative left-5 text-xl font-bold">Dashboard</div>
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
            <span className="text-2xl font-bold text-red-500">16</span> of 18
            total
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
            <span className="text-2xl font-bold text-red-500">5</span> of 7
            total
          </CardContent>
          <CardFooter className="ml-5 flex justify-between text-gray-400">
            {days}
          </CardFooter>
        </Card>
      </div>
      <div className="mt-5 bg-white">
        <ResponsiveContainer width="100%" height={350}>
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
    </div>
  );
}
