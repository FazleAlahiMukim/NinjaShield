"use client";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import Risk from "@/components/Risk";
import Action from "@/components/Action";

export const columns = [
  {
    accessorKey: "risk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk" />
    ),
    cell: ({ row }) => {
      return <Risk risk={row.getValue("risk")} />;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return <Action action={row.getValue("action")} />;
    },
  },
  {
    accessorKey: "dataClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Classification" />
    ),
  },
  {
    accessorKey: "file",
    header: "File",
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
  },
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("time")).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return <span>{formatted}</span>;
    },
  },
];
