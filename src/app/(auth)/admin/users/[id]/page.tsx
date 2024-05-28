import React from "react";
import prisma from "../../../../../../prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export const maxDuration = 45

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

  return (
    <>
      <h1>{user?.cards.map((card) => card.id)}</h1>
    </>
  );
};

export default Manage;
