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
  const cardData = await GetCardDetail("clx3fjard0001n2y09o193bwh");
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
