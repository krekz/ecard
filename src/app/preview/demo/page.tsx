import ECard from "@/components/Ecards/e-card";
import { GetCardDetail } from "../../../../actions/card-actions";

const DemoPage = async () => {
  const cardData = await GetCardDetail("clwncu447000111e38141goww");
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

export default DemoPage;
