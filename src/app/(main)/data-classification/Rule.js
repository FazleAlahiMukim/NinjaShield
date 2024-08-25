import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InformationCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Element from "./Element";

export default function ({ dataClass }) {
  const [elements, setElements] = useState([]);

  const addElement = () => {
    setElements([...elements, { id: elements.length }]);
  };

  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PlusCircleIcon className="mr-2 inline-block size-6" />
          Create rule
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full text-sm">
        <DialogHeader>
          <DialogTitle>Rule</DialogTitle>
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
                className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="occurences"
                className="block text-xs font-medium text-gray-700"
              >
                Occurences
              </label>
              <input
                type="text"
                id="description"
                defaultValue={1}
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
            {elements.map((element) => (
              <div
                key={element.id}
                className="mb-2 flex items-center space-x-2"
              >
                <button
                  onClick={() => removeElement(element.id)}
                  className="text-red-500"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
                <Element />
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
          <Button>Save</Button>
          <Button>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
