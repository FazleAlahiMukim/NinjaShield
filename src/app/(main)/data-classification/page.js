"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Switch from "@/components/Switch";
import Classification from "./Classification";
import api from "@/lib/api";

export default function page() {
  const { user } = useUser();
  const [dataClasses, setDataClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.userId) {
          const response = await api.get(
            `/api/data-class?userId=${user.userId}`,
          );
          setDataClasses(response.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleSwitchChange = async (dataId) => {
    const dataClass = dataClasses.find(
      (dataClass) => dataClass.dataId === dataId,
    );
    dataClass.isActive = !dataClass.isActive;
    setDataClasses((prevDataClasses) =>
      prevDataClasses.map((prevDataClass) =>
        prevDataClass.dataId === dataId ? dataClass : prevDataClass,
      ),
    );

    try {
      await api.post(`/api/data-class`, dataClass);
    } catch (error) {
      console.error("Update error:", error);
    }
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
