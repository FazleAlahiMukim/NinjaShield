import React, { useState, useCallback, useEffect } from "react";
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
import {
  InformationCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Element from "./Element";

export default function Rule({ onSaveRule, rule }) {
  const [elements, setElements] = useState([]);
  const [ruleName, setRuleName] = useState("");
  const [occurrences, setOccurrences] = useState(1);

  const addElement = () => {
    setElements((prevElements) => [
      ...prevElements,
      { id: prevElements.length, data: { type: "keyword", text: [] } },
    ]);
  };

  const removeElement = (id) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id),
    );
  };

  const handleElementChange = useCallback((id, data) => {
    setElements((prevElements) => {
      const updatedElements = prevElements.map((element) =>
        element.id === id &&
        JSON.stringify(element.data) !== JSON.stringify(data)
          ? { ...element, data }
          : element,
      );

      // Prevent infinite loop by only updating if there are actual changes
      return JSON.stringify(updatedElements) !== JSON.stringify(prevElements)
        ? updatedElements
        : prevElements;
    });
  }, []);

  useEffect(() => {
    if (rule) {
      setRuleName(rule.name);
      setOccurrences(rule.occurrences);
      setElements(rule.elements);
    }
  }, [rule]);

  const handleSave = () => {
    const newRule = {
      name: ruleName,
      occurrences,
      elements,
    };
    setRuleName("");
    setOccurrences(1);
    setElements([]);
    onSaveRule(newRule, rule);
  };

  const handleCancel = () => {
    if (rule) {
      setRuleName(rule.name || "");
      setOccurrences(rule.occurrences || 1);
      setElements(rule.elements || []);
      return;
    }
    setRuleName("");
    setOccurrences(1);
    setElements([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {rule ? (
          <span className="p-1 hover:cursor-pointer hover:bg-slate-200">
            <EllipsisVerticalIcon className="h-4 w-4 text-gray-600" />
          </span>
        ) : (
          <span className="flex items-center">
            <span className="flex items-center rounded p-1 hover:cursor-pointer hover:bg-slate-200">
              <PlusCircleIcon className="mr-2 inline-block size-6" />
              Create rule
            </span>
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="w-full text-sm">
        <DialogHeader>
          <DialogTitle>Rule</DialogTitle>
          <DialogDescription>
            Add a new rule to your data classification.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mb-4 flex space-x-4">
            <div className="w-3/4">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={ruleName || ""}
                onChange={(e) => setRuleName(e.target.value)}
                className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="occurences"
                className="block text-xs font-medium text-gray-700"
              >
                Occurrences
              </label>
              <input
                type="text"
                id="occurences"
                value={occurrences}
                onChange={(e) => setOccurrences(e.target.value)}
                className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="bg-purple-100 p-3 text-xs">
            <InformationCircleIcon className="mr-2 inline-block size-6" />
            This rule will be applied to files that match{" "}
            <span className="font-extrabold">all</span> the elements below.
          </div>
          <div className="my-2">
            {elements &&
              elements.map((element) => (
                <div key={element.id} className="mb-2 flex items-end space-x-2">
                  <button
                    onClick={() => removeElement(element.id)}
                    className="text-red-500"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                  <Element
                    onElementChange={(data) =>
                      handleElementChange(element.id, data)
                    }
                    element={rule ? element : undefined}
                  />
                </div>
              ))}
          </div>

          <div className="py-3">
            <Button variant="ghost" onClick={addElement}>
              <PlusCircleIcon className="mr-2 inline-block size-6" />
              Add element
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
