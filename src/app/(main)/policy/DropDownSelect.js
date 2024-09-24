import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export default function DropDownSelect ({ allObjects, objects, setObjects, name }) {

  const handleObjectChange = (name) => {
    if (objects.includes(name)) {
      setObjects(objects.filter((obj) => obj !== name));
    } else {
      setObjects([...objects, name]);
    }
  };

  const selectedObjects = objects.join(", ");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between border-b-2 border-gray-300 p-2 transition duration-300 ease-in-out focus:border-purple-500 focus:outline-none">
        <span className="-mx-2 text-gray-400 w-32 text-left"> {name} </span>
        <span className="w-80 text-left truncate">{selectedObjects}</span>
        <ChevronDownIcon className="-mx-2 h-5 w-5 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[530px] rounded-md border border-gray-400 p-2 shadow-2xl">
        <ScrollArea>
          {allObjects.map((object) => (
            <div
              key={object.name}
              className={cn(
                "flex items-center px-2 py-2 hover:bg-gray-100",
                objects.includes(object.name) ? "text-purple-800" : "",
              )}
            >
              <Checkbox
                id={object.name}
                checked={objects.includes(object.name)}
                onCheckedChange={() => handleObjectChange(object.name)}
                className="mr-3"
              />
              <label
                htmlFor={object.name}
                className="w-full hover:cursor-pointer"
              >
                {object.name}
              </label>
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
