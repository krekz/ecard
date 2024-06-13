"use client";
import DeleteButton from "@/components/delete-button";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "react-day-picker";
import { deleteVoucher } from "../../../../actions/admin/voucher-actions";
import { useToast } from "@/components/ui/use-toast";

export type Voucher = {
  code: string;
  description: string;
  active: boolean;
  max_claims: number;
  count_claims: number;
};

export const voucherColumn: ColumnDef<Voucher>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "active",
    header: "Active",
    // cell: ({ row }) => {
    //   const maximum = row.getValue("max_claims");
    //   const minimum = row.getValue("count_claims")
    //   const checkStatus = (voucher: Voucher) => {
    //     if (voucher.count_claims >= voucher.max_claims) return "expired";
    //     if (voucher.active) return "active";
    //     return "inactive";
    //   };
    //   return (

    //   )
    // },
  },
  {
    accessorKey: "count_claims",
    header: "Claims",
  },
  {
    accessorKey: "max_claims",
    header: "Max Claims",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const code = row.original.code;
      return <VoucherActionCell code={code} />;
    },
  },
];

const VoucherActionCell = ({ code }: { code: string }) => {
  const { toast } = useToast();
  return (
    <>
      <DeleteButton
        onSubmit={async () => {
          const response = await deleteVoucher(code);
          if (response?.ok) {
            toast({
              title: response.message,
              variant: "info",
            });
          }
        }}
      >
        Users who claimed this voucher will be deleted
      </DeleteButton>
    </>
  );
};
