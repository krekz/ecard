import { auth } from "@/auth";
import InvoiceTable from "@/components/invoice-table";
import { redirect } from "next/navigation";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type userCard = {
  cards: {
    id: string;
    userId: string;
    couple: string;
    updatedAt: Date;
  }[];
};

const getUserCards = async (user_id: string | undefined) => {
  const res = await fetch(`http://localhost:3000/api/user/${user_id}`);
  const data: userCard = await res.json();
  return data;
};

const UserProfilePage = async () => {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  const userCards = await getUserCards(session?.user?.id);
  return (
    // TODO : pagination
    <>
      {userCards.cards.length === 0 ? (
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-start justify-center h-screen md:px-8">
          <div className="max-w-lg mx-auto space-y-3 text-center">
            <h3 className="text-indigo-600 font-semibold">Uh ohh..</h3>
            <p className="text-gray-800 text-2xl font-semibold">
              Apparently, you don&apos;t have any cards yet.
            </p>
            <p className="text-gray-600">
              You can create a new card by clicking the button below.
            </p>
          </div>
          <Link
            href="/catalog"
            className="mx-auto mt-5 py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg"
          >
            Create card
          </Link>
        </div>
      ) : (
        <div className="flex flex-col max-w-2xl mx-auto py-24 gap-5">
          <h1 className="text-center font-bold text-2xl">Purchased cards</h1>
          <Table>
            <TableCaption>A list of your recent cards.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Last updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            {userCards.cards.map((card) => (
              <InvoiceTable key={card.id} card={card} />
            ))}
          </Table>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
