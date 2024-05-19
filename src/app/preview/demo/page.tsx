import ECard from "@/components/Ecards/e-card";

const getDemoCard = async (demoId: string) => {
  try{
    const res = await fetch(`http://localhost:3000/api/card/${demoId}`,{
      cache: "no-cache"
    });
    const data = res.json();
    return data;
  }catch(error){
    console.error(error);
  }
 
};

const DemoPage = async () => {
  const data = await getDemoCard("clw7bkenn0003107sl3jm1js1");
  return (
    <>
      <ECard dataFromDB={data} />
    </>
  );
};

export default DemoPage;
