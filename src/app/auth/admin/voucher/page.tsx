import VoucherForm from "@/components/admin/voucher-form";
import VoucherList from "@/components/admin/voucher-list";
import prisma from "../../../../../prisma";

const getVouchers = async () => {
  const vouchers = await prisma.voucher.findMany();
  return vouchers;
};

const VoucherPage = async () => {
  const vouchers = await getVouchers();
  return (
    <section className="flex flex-col  gap-10 justify-center items-center h-full py-10">
      <h1 className="text-4xl font-bold">Create voucher</h1>
      <div className="grid grid-cols-4 gap-10 w-3/4">
        <VoucherForm />
        <VoucherList vouchers={vouchers} />
      </div>
    </section>
  );
};

export default VoucherPage;
