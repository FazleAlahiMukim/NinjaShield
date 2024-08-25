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
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import Rule from "./Rule";

export default function ({ dataClass }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative right-5">
          Add Classification
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full text-sm">
        <DialogHeader>
          <DialogTitle>Data Classification</DialogTitle>
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
                className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="bg-purple-100 p-3 text-xs">
            <InformationCircleIcon className="mr-2 inline-block size-6" />
            This data classification will be applied to files that match{" "}
            <span className="font-extrabold">any</span> of the rules below.
          </div>
          <div className="py-3">
            <Rule />
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
