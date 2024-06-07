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
import { GetCards } from "../../../../../actions/card-actions";
import { LuAlertOctagon } from "react-icons/lu";

export type userCard = {
  cards: {
    id: string;
    userId: string;
    couple: string;
    updatedAt: Date;
    Design: {
      designId: string;
      front_design_url: string;
    };
    event: {
      date: Date;
    };
  }[];
};

const UserProfilePage = async () => {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  const getAllCards = await GetCards(session.user?.id);
  return (
    // TODO : pagination
    <>
      {getAllCards?.length === 0 ? (
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center my-auto h-[70vh] md:px-8">
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
        <div className="flex flex-col container mx-auto py-10 gap-2">
          <h1 className="text-center font-bold text-2xl">Purchased card(s)</h1>
          <Table>
            <TableCaption>
              <p className="flex justify-center gap-1 items-center text-gray-500 text-xs text-center">
                <LuAlertOctagon size={25} color="yellow" />
                You are not allowed to edit card once wedding date is passed
              </p>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead className="hidden md:inline">Last updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:block">Wedding date</TableHead>
              </TableRow>
            </TableHeader>
            {getAllCards?.map((card) => (
              <InvoiceTable key={card.id} card={card} />
            ))}
          </Table>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
