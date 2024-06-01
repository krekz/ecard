import prisma from "../../../../../../prisma";
import DesignForm from "@/components/admin/admin-form";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  if (
    !searchParams.action ||
    (searchParams.action !== "create" && searchParams.action !== "edit")
  )
    return notFound();

  let design;
  if (searchParams.designId) {
    design = await prisma.design.findUnique({
      where: {
        designId: searchParams?.designId,
      },
      select: {
        designId: true,
        name: true,
        category: true,
      },
    });
  }

  return (
    <section className="relative col-span-6 xl:col-span-5 flex flex-col gap-10 justify-center items-center h-full py-10">
      <Link href="/admin/designs" className=" p-3 rounded-md bg-purple-500">
        <LuArrowLeft />
      </Link>
      {searchParams.action === "create" ? (
        <>
          <h1 className="text-2xl font-bold">Create a new design</h1>
          <DesignForm formType="upload" />
        </>
      ) : design ? (
        <>
          <h1 className="text-2xl font-bold">Edit: {design.name}</h1>
          <DesignForm design={design} formType="update" />
        </>
      ) : (
        <div className="col-span-3 h-20 text-center bg-red-500 p-5 w-full rounded-lg text-white font-semibold shadow-lg">
          <p>No design found</p>
        </div>
      )}
    </section>
  );
};

export default Page;
