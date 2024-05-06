import CardForm from "@/components/forms/form";
import FormNavbar from "@/components/forms/form-navbar";

const getCardContent = async () => {
  const response = await fetch("http://localhost:3000/api/card", {
    method: "GET",
    cache: "no-cache"
  });
  const data = await response.json();
  return data;

};

const EditCardPage = async () => {
  const data = await getCardContent();
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
