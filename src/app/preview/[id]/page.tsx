import ECard from "@/components/Ecards/e-card";


const getDetailPage = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/card/${id}`,{
      cache: "no-cache"
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const CardDetailPage = async ({ params }: { params: { id: string } }) => {
  const cardData = await getDetailPage(params.id);
  return (
    <>
      <ECard dataFromDB={cardData} />
    </>
  );
};

export default CardDetailPage;
