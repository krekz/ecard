import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "../../../../prisma";
import Image from "next/image";

const RecentSales = async () => {
  const cards = await prisma.eCard.findMany({
    take: 5,
    select: {
      User: {
        select: {
          image: true,
          name: true,
          email: true,
        },
      },
      createdAt: true,
      Design: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <Card className="col-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between">
            Recent Sales
          </CardTitle>
          <CardDescription className="flex justify-between">
            <span>Users</span>
            <span className="hidden md:block">Choosen Designs</span>
            <span>Date purchased</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cards.map((card, index) => (
            <div key={index} className="flex flex-row justify-between items-center p-1">
              <div className="flex gap-2">
                <Image
                  src={card.User?.image || ""}
                  alt={card.User?.name || ""}
                  width={40}
                  height={40}
                  className="rounded-full w-auto h-auto"
                ></Image>
                <div className="flex flex-col">
                  <p className="font-medium">{card.User?.name}</p>
                  <p className="text-gray-500 italic text-xs">{card.User?.email}</p>
                </div>
              </div>
              <p className="hidden md:block">{card.Design?.name}</p>
              <p>{card.createdAt.toLocaleDateString()}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <p>{}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecentSales;
