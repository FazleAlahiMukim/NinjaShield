import { cn } from "@/lib/utils";

function getBlockClass(risk, blockIndex) {
  return cn(
    "w-3 h-3 rounded",
    risk === "high" && "bg-red-600",
    risk === "medium" && blockIndex <= 2 && "bg-yellow-900",
    risk === "low" && blockIndex === 1 && "bg-yellow-500",
    ((risk === "medium" && blockIndex === 3) ||
      (risk === "low" && blockIndex > 1)) &&
      "bg-gray-300",
  );
}

export default function Risk({ risk }) {
  return (
    <div className="flex items-center">
      <div className="flex space-x-0.5">
        <div className={getBlockClass(risk, 1)}></div>
        <div className={getBlockClass(risk, 2)}></div>
        <div className={getBlockClass(risk, 3)}></div>
      </div>
      <span className="ml-2 text-sm font-medium capitalize">{risk}</span>
    </div>
  );
}
