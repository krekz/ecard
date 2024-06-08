"use client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "@/components/delete-button";
import { cn } from "@/lib/utils";
import { deleteVoucher } from "../../../actions/admin/voucher-actions";
import { useState } from "react";

type VoucherProps = {
  code: string;
  description: string;
  active: boolean;
  max_claims: number;
  count_claims: number;
};

const VoucherList = ({ vouchers }: { vouchers: VoucherProps[] }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const checkStatus = (voucher: VoucherProps) => {
    if (voucher.count_claims >= voucher.max_claims) return "expired";
    if (voucher.active) return "active";
    return "inactive";
  };

  const handleSubmit = async (code: string) => {
    try {
      setLoading(true);
      const response = await deleteVoucher(code);
      if (response?.ok) {
        toast({
          title: "Voucher deleted",
          description: "Voucher has been deleted",
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {vouchers && vouchers.length > 0 ? (
        <Table className="mx-auto rounded-lg shadow-lg p-0">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Code</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead>Claimed</TableHead>
              <TableHead>Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher, index) => (
              <TableRow
                key={index}
                className={cn(
                  checkStatus(voucher) === "active"
                    ? ""
                    : "bg-gray-200 dark:bg-gray-800"
                )}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "py-2 px-3 rounded-md capitalize",
                      checkStatus(voucher) === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white dark:bg-gray-600"
                    )}
                  >
                    {checkStatus(voucher)}
                  </span>
                </TableCell>
                <TableCell>{voucher.code}</TableCell>
                <TableCell>{voucher.description}</TableCell>
                <TableCell>{`${voucher.count_claims} / ${voucher.max_claims}`}</TableCell>
                <TableCell className="space-y-2 md:space-x-2">
                  <DeleteButton
                    onSubmit={() => handleSubmit(voucher.code)}
                    loading={loading}
                  >
                    Users who claimed this voucher will be deleted as well
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <div className="col-span-3 h-20 text-center bg-red-500 p-5 w-full rounded-lg text-white font-semibold shadow-lg">
            <p>No vouchers found</p>
          </div>
        </>
      )}
    </>
  );
};

export default VoucherList;
