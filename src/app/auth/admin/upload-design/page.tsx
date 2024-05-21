import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DesignForm from "@/components/admin/admin-form";
import EditDesign from "@/components/admin/edit-form";
import { getAllDesigns } from "@/lib/utils";


const UploadDesignPage = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  const cards = await getAllDesigns();
  //  TODO: admin role check
  return (

    <section className="flex flex-col gap-10 justify-center items-center h-full py-10">
      {/* upload design */}
      <h1 className="text-4xl font-bold">Design Upload</h1>
      <DesignForm formType="upload" />
      {/* edit design */}
      <h2 className="text-4xl font-bold"> Edit design</h2>
      <EditDesign cards={cards}/>
    </section>
  );
};

export default UploadDesignPage;
