import ECard from "@/components/Ecards/e-card";

const getDemoCard = async (demoId: string) => {
  const res = await fetch(`http://localhost:3000/api/card/${demoId}`,{
    cache: "no-cache"
  });
  const data = await res.json();
  return data;
};

const DemoPage = async () => {
  const data = await getDemoCard("clvxacr4z0001ogcfdwuz8tdt");
  return (
    <>
      <ECard dataFromDB={data} />
    </>
  );
};

export default DemoPage;
