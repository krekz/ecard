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

export type userCard = {
  cards: {
    id: string;
    userId: string;
    couple: string;
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
    <>
      <div className="flex flex-col max-w-2xl mx-auto">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          {userCards.cards.map((card) => (
            <InvoiceTable key={card.id} card={card} />
          ))}
        </Table>
      </div>
    </>
  );
};

export default UserProfilePage;
