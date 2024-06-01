import React from "react";
import { userColumns } from "../../../../components/table/columns";
import prisma from "../../../../../prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import DataTable from "../../../../components/table/data-table";

export const maxDuration = 45;

const UsersPage = async () => {
  const session = await auth();
  if (!session || session.user.role !== "super_admin") {
    notFound();
  }
  const [users, totalUsers] = await prisma.$transaction([
    prisma.user.findMany({
      take: 10,
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
      <section className="col-span-6 xl:col-span-5 flex flex-col gap-10 items-center h-full py-10 overflow-x-auto">
        <h1 className="text-4xl font-bold">Users</h1>
        <h1 className="text-xl font-bold">
          Total registered users: {totalUsers}
        </h1>
        <DataTable columns={userColumns} data={users} action={true} />
      </section>
    </>
  );
};

export default UsersPage;
