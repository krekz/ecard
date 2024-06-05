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
import { checkDate, cn } from "@/lib/utils";

type CardProps = {
  id: string;
  couple: string;
  updatedAt: Date;
  designId: string;
  event: {
    date: Date;
  } | null;
};

const InvoiceTable = ({ card }: { card: CardProps }) => {
  if (!card.event) return;
  const disableEdit = checkDate(card.event.date);
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{card.couple}</TableCell>
          <TableCell className="hidden md:block">
            {format(card.updatedAt, "dd/MM/yyyy")}
          </TableCell>
          <TableCell>
            <span
              className={cn(
                "bg-green-500 text-white py-1 px-3 rounded-md",
                disableEdit ? "bg-red-500" : ""
              )}
            >
              {disableEdit ? "Inactive" : "Active"}
            </span>
          </TableCell>
          <TableCell className="hidden md:block">
            {format(new Date(card.event.date as Date), "dd/MM/yyyy")}
          </TableCell>
          <TableCell className="space-y-2 md:space-x-2">
            {!disableEdit && (
              <Button asChild variant="outline">
                <Link
                  className="w-full md:w-auto"
                  href={`/user/edit?id=${card.id}&design_id=${card.designId}`}
                >
                  Edit
                </Link>
              </Button>
            )}
            <Button asChild>
              <Link
                className="w-full md:w-auto"
                target="_blank"
                href={`/preview/${card.id}`}
              >
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
