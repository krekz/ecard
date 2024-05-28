"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Users table
export type User = {
  id: string | null;
  name: string | null;
  email: string | null;
  cards: { id: string; }[]
  role: "user" | "admin" | "super_admin" | string;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "cards",
    header: "Cards",
    cell: ({ row }) => {
      const cards = row.original.cards;
      return <span>{cards.length}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role.replace("_", " ");
      let bgColor = "bg-gray-200 text-black"; // default color for users
      if (role === "admin") {
        bgColor = "bg-8lue-500 text-white";
      } else if (role === "super admin") {
        bgColor = "bg-purple-800";
      }
      return <span className={cn("px-2 py-1 rounded", bgColor)}>{role}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userid = row.getValue("id");

      return (
        <Button variant="outline">
          <Link href={`/admin/users/${userid}`}>Manage</Link>
        </Button>
      );
    },
  },
];

// Designs table
