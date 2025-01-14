import CardForm from "@/components/forms/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FormNavbar from "@/components/forms/form-navbar";

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
      <h1 className="font-bold text-5xl pt-10 text-center">Create TeaCard</h1>
      <FormNavbar />
      <CardForm user={session?.user} />
    </>
  );
};

export default CreateCardPage;
