"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Switch from "@/components/Switch";
import Delete from "@/components/Delete";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/lib/authApi";
import Policy from "./Policy";
import Risk from "./Risk";
import Action from "./Action";

export default function page() {
  const { user } = useUser();
  const [policies, setPolicies] = useState([]);
  const [allDestinations, setDestinations] = useState([]);
  const [allFileCategories, setFileCategories] = useState([]);
  const [allDataClasses, setDataClasses] = useState([]);
  const { api } = useAuth();

  const fetchPolicy = async () => {
    try {
      if (user?.userId) {
        const response = await api.get(`/api/policy?userId=${user.userId}`);
        setPolicies(response.data);
      }
    } catch (error) {
      console.error("Policy Fetch error:", error);
    }
  };

  const fetchDestinations = async () => {
    try {
      const response = await api.get(`/api/policy/destinations`);
      setDestinations(response.data);
    } catch (error) {
      console.error("Destination Fetch error:", error);
    }
  };

  const fetchFileCategories = async () => {
    try {
      const response = await api.get(`/api/policy/file-categories`);
      setFileCategories(response.data);
    } catch (error) {
      console.error("File Categories Fetch error:", error);
    }
  };

  const fetchDataClasses = async () => {
    try {
      const response = await api.get(`/api/data-class?userId=${user.userId}`);
      setDataClasses(response.data);
    } catch (error) {
      console.error("Data Classes Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPolicy();
    fetchDestinations();
    fetchFileCategories();
    fetchDataClasses();
  }, [user]);

  const handleSwitchChange = async (policyId) => {
    const policy = policies.find((policy) => policy.policyId === policyId);
    policy.isActive = !policy.isActive;
    setPolicies((prevPolicies) =>
      prevPolicies.map((prevPolicy) =>
        prevPolicy.policyId === policyId ? policy : prevPolicy,
      ),
    );

    try {
      await api.put(`/api/policy?policyId=${policyId}`);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleAddPolicy = (newPolicy) => {
    setPolicies((prevPolicies) => [...prevPolicies, newPolicy]);
  };

  const handleEditPolicy = () => {
    fetchData();
  };

  const handleDelete = async (policyId, name) => {
    setPolicies((prevPolicies) =>
      prevPolicies.filter((prevPolicy) => prevPolicy.policyId !== policyId),
    );

    try {
      await api.delete(`/api/policy?policyId=${policyId}`);
      toast.info(`Policy "${name}" deleted successfully`);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl bg-white p-4 pt-5 shadow-2xl">
      <Toaster richColors closeButton />
      <div className="flex flex-row justify-between">
        <h1 className="relative left-5 text-xl font-bold">Policy</h1>
        <Policy
          onSave={handleAddPolicy}
          allDestinations={allDestinations}
          allFileCategories={allFileCategories}
          allDataClasses={allDataClasses}
        />
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="font-serif uppercase">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="min-w-[250px]">Name</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Events (last 7 days)</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.policyId}>
                <TableCell className="pt-3">
                  <Switch
                    checked={policy.isActive}
                    onChange={() => handleSwitchChange(policy.policyId)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Policy
                    policy={policy}
                    onSave={handleEditPolicy}
                    allDestinations={allDestinations}
                    allFileCategories={allFileCategories}
                    allDataClasses={allDataClasses}
                  />
                </TableCell>
                <TableCell>
                  <Risk risk={policy.risk} />
                </TableCell>
                <TableCell>
                  <Action action={policy.action} />
                </TableCell>
                <TableCell className="text-right">{policy.events}</TableCell>
                <TableCell className="text-right">
                  {policy.lastUpdated
                    ? new Date(policy.lastUpdated).toLocaleString("en-GB", {
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
                    name={policy.name}
                    onContinue={() =>
                      handleDelete(policy.policyId, policy.name)
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
