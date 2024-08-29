import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Rule from "./Rule";
import { useAuth } from "@/lib/authApi";
import { toast } from "sonner";

export default function Classification({ dataClass, onSave }) {
  const { user } = useUser();
  const [rules, setRules] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { api } = useAuth();
  

  const handleSaveRule = (newRule, prevRule) => {
    if (prevRule) {
      setRules((prevRules) =>
        prevRules.map((rule) =>
          rule.id === prevRule.id ? { ...newRule, id: prevRule.id } : rule,
        ),
      );
      return;
    }
    newRule.id = uuidv4();
    setRules((prevRules) => [...prevRules, newRule]);
  };

  const handleSaveClassification = async () => {
    const ruleTransformed = rules.map((rule) => {
      return {
        name: rule.name,
        occurrences: rule.occurrences,
        elements: rule.elements.map((element) => {
          return {
            type: element.data.type,
            text: element.data.text,
          };
        }),
      };
    });
    const dataClassAndRules = {
      userId: user.userId,
      isActive: true,
      name,
      description,
      events: 0,
      lastUpdated: new Date(),
      rules: ruleTransformed,
    };

    try {
      const response = await api.post(`/api/data-class/save`, dataClassAndRules);
      toast.success(`Data Classification "${name}" saved successfully`);
      onSave(response.data);
    } catch (error) {
      console.error("Data Classification Save error:", error);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setRules([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative right-5">Add Classification</Button>
      </DialogTrigger>
      <DialogContent className="w-full text-sm">
        <DialogHeader>
          <DialogTitle>Data Classification</DialogTitle>
          <DialogDescription>
            Create a new data classification to identify sensitive data.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/4">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="description"
                className="block text-xs font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="bg-purple-100 p-3 text-xs">
            <InformationCircleIcon className="mr-2 inline-block size-6" />
            This data classification will be applied to files that match{" "}
            <span className="font-extrabold">any</span> of the rules below.
          </div>
          <div className="m-2 flex flex-col p-2 font-serif text-base">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="mb-2 flex flex-row items-center justify-between text-gray-800"
              >
                {rule.name}
                <Rule rule={rule} onSaveRule={handleSaveRule} />
              </div>
            ))}
          </div>
          <div className="py-3">
            <Rule onSaveRule={handleSaveRule} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSaveClassification}>Save</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
