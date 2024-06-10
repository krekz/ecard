import { getDesign } from "@/actions/admin/design-actions";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { auth } from "@/auth";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  if (!session) notFound();
  const designId = searchParams.designId;
  if (!designId) notFound();
  const design = await getDesign(designId as string);
  if (!design) notFound();

  return <CheckoutForm userId={session.user.id} />;
};

export default CheckoutPage;
