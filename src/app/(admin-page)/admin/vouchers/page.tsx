import VoucherForm from "@/components/admin/voucher-form";
import VoucherList from "@/components/admin/voucher-list";
import prisma from "../../../../../prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import DataTable from "@/components/table/data-table";
import { voucherColumn } from "./voucher-column";
import Link from "next/link";

const VoucherPage = async () => {
  const session = await auth();
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "super_admin")
  ) {
    notFound();
  }
  const vouchers = await prisma.voucher.findMany({
    take: 10,
  });
  return (
    <section className="col-span-6 xl:col-span-5 flex flex-col  gap-10 justify-center items-center h-full py-10">
      {vouchers && vouchers.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold">Create voucher</h1>
          <Link
            className="p-3 rounded-md bg-primary"
            href="/admin/vouchers/q?action=create"
          >
            Create new
          </Link>
          <DataTable columns={voucherColumn} data={vouchers} />
        </>
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl font-semibold">Voucher not found</h1>
          <Link
            className="p-3 rounded-md bg-primary"
            href="/admin/vouchers/q?action=create"
          >
            Create new
          </Link>
        </div>
      )}
    </section>
  );
};

export default VoucherPage;
