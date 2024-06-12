import React from "react";
import { userColumns } from "@/components/table/columns";
import prisma from "../../../../../prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import DataTable from "@/components/table/data-table";

export const maxDuration = 45;

const UsersPage = async () => {
  const session = await auth();
  if (!session || session.user.role !== "super_admin") {
    notFound();
  }
  const [users, totalUsers] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        cards: {
          select: {
            id: true,
          },
        },
      },
    }),
    prisma.user.count(),
  ]);

  if (!users) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-4xl font-bold">Users</h1>
      <h1 className="text-xl font-bold">
        Total registered users: {totalUsers}
      </h1>
      <DataTable columns={userColumns} data={users} action={true} />
    </>
  );
};

export default UsersPage;
