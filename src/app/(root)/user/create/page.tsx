import CreateCardForm from "@/components/forms/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CreateCardPage = async () => {
  const session = await auth();
  if (!session) redirect("/api/auth/signin?callbackUrl=/user/create");
  return (
    <section className=" flex items-center justify-center p-5 mx-auto">
      <CreateCardForm />
    </section>
  );
};

export default CreateCardPage;
