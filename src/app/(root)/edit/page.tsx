import CardForm from "@/components/create/form";
import FormNavbar from "@/components/create/form-navbar";

const getCardContent = async () => {
  const response = await fetch("http://localhost:3000/api/form-actions", {
    method: "GET",
    cache: "no-cache"
  });
  const data = await response.json();
  return data;

};

const EditCardPage = async () => {
  const data = await getCardContent();
  console.log(data);
  return (
    <>
      <FormNavbar />
      <div className="flex justify-center">
        <CardForm dataFromDB={data} />
      </div>
    </>
  );
};

export default EditCardPage;
