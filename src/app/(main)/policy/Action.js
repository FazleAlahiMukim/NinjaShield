import { NoSymbolIcon, BellIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Action({ action }) {
  return (
    <div>
      {action === "block" && (
        <div className="flex items-center space-x-2">
          <NoSymbolIcon className="h-5 w-5 text-red-600" />
          <span>Block</span>
        </div>
      )}
      {action === "warn" && (
        <div className="flex items-center space-x-2">
          <BellIcon className="h-5 w-5" />
          <span>Notify</span>
        </div>
      )}
      {action === "log" && (
        <div className="flex items-center space-x-2">
          <PencilSquareIcon className="h-5 w-5" />
          <span>Log</span>
        </div>
      )}
    </div>
  );
}
