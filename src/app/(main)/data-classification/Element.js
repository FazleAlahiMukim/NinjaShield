import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircleIcon, EqualsIcon } from "@heroicons/react/24/outline";

export default function Element({ onElementChange, element }) {
  const [type, setType] = useState("keyword");
  const [text, setText] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      setText([...text, inputValue]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setText(text.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if (element !== undefined) {
      setType(element.data.type);
      setText(element.data.text);
    }
  }, []);

  useEffect(() => {
    const newElementData = { type, text };
    onElementChange(newElementData);
  }, [type, text]);

  return (
    <div className="flex items-end space-x-4">
      <Select value={type} onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-[180px] border-gray-400 focus:border-purple-500">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="keyword">Keyword</SelectItem>
            <SelectItem value="regex">Regex</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <EqualsIcon className="h-6 w-6 text-gray-600" />
      <div className="flex w-full flex-wrap items-center border-b-2 border-gray-400 focus-within:border-purple-500">
        {text &&
          text.map((tag, index) => (
            <div
              key={index}
              className="m-1 flex items-center rounded-full bg-gray-200 px-2 py-1 text-gray-800"
            >
              <span className="mr-2 break-all">{tag}</span>
              <button
                onClick={() => removeTag(index)}
                className="focus:outline-none"
              >
                <XCircleIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ))}
        <input
          type="text"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none px-2 py-1 focus:outline-none"
          placeholder="Type and press Enter"
        />
      </div>
    </div>
  );
}
