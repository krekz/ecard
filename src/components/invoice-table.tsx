import { format } from "date-fns";
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
  userId: string;
  couple: string;
  updatedAt: Date;
  Design: {
    designId: string;
    front_design_url: string;
  };
};

const InvoiceTable = ({ card }: { card: CardProps }) => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{card.couple}</TableCell>
          <TableCell>{format(card.updatedAt, "dd/MM/yyyy")}</TableCell>
          <TableCell>
            <span className="bg-green-500 text-white py-1 px-3 rounded-md">
              Active
            </span>
          </TableCell>
          <TableCell className="space-y-2 md:space-x-2">
            <Button asChild variant="secondary">
              <Link className="w-full md:w-auto" href={`/user/edit?id=${card.id}&design_id=${card.Design.designId}`}>Edit</Link>
            </Button>
            <Button asChild>
              <Link className="w-full md:w-auto" target="_blank" href={`/preview/${card.id}`}>
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
