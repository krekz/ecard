import ECard from "@/components/Ecards/e-card";

const getDemoCard = async (demoId: string) => {
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/card/${demoId}`,{
      cache: "no-cache"
    });
    const data = res.json();
    return data;
  }catch(error){
    console.error(error);
  }
 
};

const DemoPage = async () => {
  const data = await getDemoCard("clwh9xs390001fjdxtd7l55h7");
  return (
    <>
      <ECard dataFromDB={data} />
    </>
  );
};

export default DemoPage;
