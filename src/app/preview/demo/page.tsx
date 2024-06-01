import ECard from "@/components/Ecards/e-card";
import { GetCardDetail } from "../../../../actions/card-actions";
import { getDesign } from "../../../../actions/admin/design-actions";

const DemoPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const cardData = await GetCardDetail("clww8otiq000161v55p1jpmsn");
  const modifiedData = {
    ...cardData?.data,
    heirs: Array.isArray(cardData?.data?.heirs) ? cardData?.data.heirs : [],
  };
  const designDetail = await getDesign(searchParams?.id);
  return (
    <>
      <ECard dataFromDB={modifiedData} demoDesign={designDetail} />
    </>
  );
};

export default DemoPage;
