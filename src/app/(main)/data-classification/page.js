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
import Delete from "./Delete";
import { useAuth } from "@/lib/authApi";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function page() {
  const { user } = useUser();
  const [dataClasses, setDataClasses] = useState([]);
  const { api } = useAuth();

  const fetchData = async () => {
    try {
      if (user?.userId) {
        const response = await api.get(`/api/data-class?userId=${user.userId}`);
        setDataClasses(response.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
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

  const handleAddClassification = (newClassification) => {
    setDataClasses((prevDataClasses) => [
      ...prevDataClasses,
      newClassification,
    ]);
  };

  const handleEditClassification = () => {
    fetchData();
  };

  const handleDelete = async (dataId, name) => {
    setDataClasses((prevDataClasses) =>
      prevDataClasses.filter(
        (prevDataClass) => prevDataClass.dataId !== dataId,
      ),
    );

    try {
      await api.delete(`/api/data-class?dataId=${dataId}`);
      toast.success(`Data Classification "${name}" deleted successfully`);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl bg-white p-4 pt-5 shadow-2xl">
      <Toaster richColors closeButton />
      <div className="flex flex-row justify-between">
        <h1 className="relative left-5 text-xl font-bold">
          {" "}
          Data Classification{" "}
        </h1>
        <Classification onSave={handleAddClassification} />
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="font-serif uppercase">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Events (last 7 days)</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataClasses.map((dataClass) => (
              <TableRow key={dataClass.dataId}>
                <TableCell className="pt-3">
                  <Switch
                    checked={dataClass.isActive}
                    onChange={() => handleSwitchChange(dataClass.dataId)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Classification
                    dataClass={dataClass}
                    onSave={handleEditClassification}
                  />
                </TableCell>
                <TableCell>{dataClass.description}</TableCell>
                <TableCell className="text-right">{dataClass.events}</TableCell>
                <TableCell className="text-right">
                  {dataClass.lastUpdated
                    ? new Date(dataClass.lastUpdated).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })
                    : "--"}
                </TableCell>
                <TableCell>
                  <Delete
                    name={dataClass.name}
                    onContinue={() =>
                      handleDelete(dataClass.dataId, dataClass.name)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
