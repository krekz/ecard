import CardForm from "@/components/forms/form";
import FormNavbar from "@/components/forms/form-navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GetCardDetail } from "@/actions/card-actions";
import { checkDate } from "@/lib/utils";

export const maxDuration = 60;

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

  try {
    if (!cardId || typeof cardId !== "string") redirect("/user/cards");
    const userCard = await GetCardDetail(cardId);
    if (cardId !== userCard?.data?.id) throw new Error("Card not existed");
    if (userCard?.data?.userId !== session?.user?.id)
      throw new Error("Unauthorized access");

    const disableEdit = checkDate(userCard?.data?.event?.date);
    if (disableEdit) throw new Error("Cannot edit no more..");
    const transformedData = {
      ...userCard?.data,
      heirs: Array.isArray(userCard?.data?.heirs) ? userCard?.data?.heirs : [],
    };

    return (
      <>
        <h1 className="font-bold text-5xl pt-10 text-center">Edit TeaCard</h1>
        <FormNavbar />
        <div className="flex justify-center">
          <CardForm dataFromDB={transformedData} user={session?.user} />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    redirect("/user/cards");
  }
};

export default EditCardPage;
