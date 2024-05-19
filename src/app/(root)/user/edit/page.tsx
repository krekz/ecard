import CardForm from "@/components/forms/form";
import FormNavbar from "@/components/forms/form-navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const getCardContent = async (cardId: string | string[] | undefined) => {
  try {
    const response = await fetch(`http://localhost:3000/api/card/${cardId}`, {
      method: "GET",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Card not found or API error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch card content:", error);
    throw error;
  }
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

  if (!session) redirect(`/api/auth/signin?`);
  if (!cardId || typeof cardId !== "string") redirect("/user/cards");

  try {
    const userCard = await getCardContent(cardId);
    if (userCard.userId !== session?.user?.id) {
      throw new Error("Unauthorized access");
    }

    return (
      <>
        <FormNavbar />
        <div className="flex justify-center">
          <CardForm dataFromDB={userCard} user={session?.user} />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    redirect("/user/cards");
  }
};

export default EditCardPage;
