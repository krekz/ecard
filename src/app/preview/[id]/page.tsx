import ECard from "@/components/Ecards/e-card";
import { notFound } from "next/navigation";
import { GetCardDetail } from "../../../../actions/card-actions";

const CardDetailPage = async ({ params }: { params: { id: string } }) => {
  const cardData = await GetCardDetail(params.id);
  if (cardData?.data?.id !== params.id) {
    notFound();
  }
  const modifiedData = {
    ...cardData?.data,
    heirs: Array.isArray(cardData?.data?.heirs) ? cardData?.data.heirs : [],
  };

  return (
    <>
      <ECard dataFromDB={modifiedData} />
    </>
  );
};

export default CardDetailPage;
