"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Switch from "@/components/Switch";
import Classification from "./Classification";

export default function page() {
  const { user, setUser } = useUser();
  const [dataClasses, setDataClasses] = useState([]);

  useEffect(() => {
    // Set the userId and token for development purposes
    setUser((prevUser) => ({
      ...prevUser,
      userId: "66bd0fcf05f286017428eaef",
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NmJkMGZjZjA1ZjI4NjAxNzQyOGVhZWYiLCJpYXQiOjE3MjQzMTM1MjR9.HnXX1HKKtoTOVdjhLoK8Vac0ViUjWAtkmxIb0FI0Ld_-TJdv7QnyIUC_m5TbOythuoxXaUc39_mfvOxgFA-fzQ",
    }));
  }, [setUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.userId && user?.token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data-class?userId=${user.userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `${user.token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setDataClasses(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleSwitchChange = (dataId) => {
    const dataClass = dataClasses.find(
      (dataClass) => dataClass.dataId === dataId,
    );
    dataClass.isActive = !dataClass.isActive;
    setDataClasses((prevDataClasses) =>
      prevDataClasses.map((prevDataClass) =>
        prevDataClass.dataId === dataId ? dataClass : prevDataClass,
      ),
    );
    const putChange = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data-class`,
          {
            method: "POST",
            headers: {
              Authorization: `${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataClass),
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    putChange();
  };

  return (
    <div className="relative top-5">
      <div className="flex flex-row justify-between">
        <h1 className="relative left-5 text-xl font-bold">
          {" "}
          Data Classification{" "}
        </h1>
        <Classification />
      </div>
      <Table className="text-base">
        <TableHeader>
          <TableRow className="font-serif uppercase">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Events (last 7 days)</TableHead>
            <TableHead className="text-right">Last Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataClasses.map((dataClass) => (
            <TableRow key={dataClass.dataId}>
              <TableCell>
                <Switch
                  checked={dataClass.isActive}
                  onChange={() => handleSwitchChange(dataClass.dataId)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <span className="rounded bg-violet-100 p-2">
                  {dataClass.name}
                </span>
              </TableCell>
              <TableCell>{dataClass.description}</TableCell>
              <TableCell className="text-right">{dataClass.events}</TableCell>
              <TableCell className="text-right">
                {dataClass.lastUpdated
                  ? new Date(dataClass.lastUpdated).toLocaleString()
                  : "--"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell colSpan={1} className="text-right">
              Total Events
            </TableCell>
            <TableCell className="text-right">
              {dataClasses.reduce(
                (total, dataClass) => total + dataClass.events,
                0,
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
