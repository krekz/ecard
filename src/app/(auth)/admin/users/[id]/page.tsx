import React from "react";
import prisma from "../../../../../../prisma";

const Manage = async ({ params }: { params: { id: string } }) => {
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
