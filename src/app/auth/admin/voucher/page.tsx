import VoucherForm from "@/components/admin/voucher-form";

const VoucherPage = () => {
  return (
    <section className="flex flex-col gap-10 justify-center items-center h-full py-10">
      <h1 className="text-4xl font-bold">Create voucher</h1>
      <VoucherForm />
    </section>
  );
};

export default VoucherPage;
