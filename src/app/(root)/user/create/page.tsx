import CardForm from "@/components/forms/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CreateCardPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const designId = searchParams.design_id;
  const session = await auth();
  if (!session)
    redirect(`/api/auth/signin?callbackUrl=/user/create?design_id=${designId}`);


  return (
    <>
      <CardForm user={session?.user} />
    </>
  );
};

export default CreateCardPage;
