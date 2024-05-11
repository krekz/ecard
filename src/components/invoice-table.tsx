import { userCard } from "@/app/(root)/user/profile/page";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type CardProps = {
  id: string;
  couple: string;
};

const InvoiceTable = ({ card }: { card: CardProps }) => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>
            <span className="bg-green-500 text-white py-1 px-3 rounded-md">
              Paid
            </span>
          </TableCell>
          <TableCell>{card.couple}</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
          <TableCell className="space-x-1">
            <Button asChild variant="secondary">
              <Link href={`/user/edit?id=${card.id}`}>Edit</Link>
            </Button>
            <Button asChild>
              <Link target="_blank" href={`/preview/${card.id}`}>
                View
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default InvoiceTable;
