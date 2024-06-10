import React from "react";
import prisma from "../../../../../../prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import UserForm from "@/components/admin/user/user-form";
import Image from "next/image";

export const maxDuration = 45;

const Manage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session || session.user.role !== "super_admin") {
    notFound();
  }
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      cards: {
        select: {
          id: true,
        },
      },
    },
  });

  console.log(user);

  return (
    <section className="col-span-6 xl:col-span-5 flex flex-col gap-10 items-center h-full py-10 overflow-x-auto">
      <div className="flex items-center gap-5">
        <Image
          className="rounded-lg"
          src={user?.image || ""}
          alt={user?.name || ""}
          width={100}
          height={100}
        />

        <p className="border p-3 text-xs rounded-lg">{user?.name}</p>
        <UserForm user={user} />
      </div>
    </section>
  );
};

export default Manage;
