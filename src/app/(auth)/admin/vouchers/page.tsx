import VoucherForm from "@/components/admin/voucher-form";
import VoucherList from "@/components/admin/voucher-list";
import prisma from "../../../../../prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

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
    <section className="col-span-6 xl:col-span-5 flex flex-col  gap-10  items-center h-full py-10">
      <h1 className="text-4xl font-bold">Create voucher</h1>
      <div className="grid grid-cols-4 gap-10 w-3/4">
        <VoucherForm />
        <VoucherList vouchers={vouchers} />
      </div>
    </section>
  );
};

export default VoucherPage;
