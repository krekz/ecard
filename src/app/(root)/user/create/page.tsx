import CardForm from "@/components/forms/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import VoucherClaim from "@/components/forms/voucher-claim";

const CreateCardPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const designId = searchParams.design_id;
  const session = await auth();
  if (!session) redirect(`/api/auth/signin?callbackUrl=/user/create?design_id=${designId}`);
  return (
    <section className=" flex items-center justify-center p-5 mx-auto">
      <CardForm user={session?.user} />
      <VoucherClaim />
    </section>
  );
};

export default CreateCardPage;
