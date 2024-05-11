import CardForm from "@/components/forms/form";
import FormNavbar from "@/components/forms/form-navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const getCardContent = async (cardId: string | string[] | undefined) => {
  const response = await fetch(`http://localhost:3000/api/card/${cardId}`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

const EditCardPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const cardId = searchParams.id;

  if (!session)
    redirect(`/api/auth/signin?callbackUrl=/user/edit?id=${cardId}`);

  const userCard = await getCardContent(cardId);
  if (userCard.userId !== session?.user?.id) {
    throw new Error("Unauthorized access");
  }
  return (
    <>
      <FormNavbar />
      <div className="flex justify-center">
        <CardForm dataFromDB={userCard} />
      </div>
    </>
  );
};

export default EditCardPage;
