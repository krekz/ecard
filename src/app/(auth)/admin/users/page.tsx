import React from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import prisma from "../../../../../prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UsersPage = async () => {
  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    }),
    prisma.user.count(),
  ]);

  return (
    <section className="col-span-6 xl:col-span-5 flex flex-col gap-10 items-center h-full py-10">
      <h1 className="text-4xl font-bold">Users</h1>
      <h1 className="text-xl font-bold">Total registered users: {count}</h1>
      <Table>
        <TableCaption>Lis of total users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        {users?.map((user) => (
          <TableBody key={user.id}>
            <TableRow>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="space-y-2 md:space-x-2">
                <Button>
                  <Link
                    className="w-full md:w-auto"
                    href={`/admin/users/${user.id}`}
                  >
                    Manage
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </section>
  );
};

export default UsersPage;
