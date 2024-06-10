import prisma from "../../../../../../prisma";
import DesignForm from "@/components/admin/design-form";
import { notFound } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import Link from "next/link";
import { auth } from "@/auth";

export const maxDuration = 60;

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: "create" | "update" };
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await auth();
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "super_admin")
  )
    notFound();

  if (params.slug !== "create" && params.slug !== "update") notFound();

  let design;
  if (params.slug === "update" && !searchParams.designId) notFound();
  if (params.slug === "update" && searchParams.designId) {
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
    if (!design) notFound();
  }

  console.log(params.slug);

  return (
    <section className="relative col-span-6 xl:col-span-5 flex flex-col gap-10 justify-center items-center h-full py-10">
      <Link href="/admin/designs" className=" p-3 rounded-md bg-purple-500">
        <LuArrowLeft />
      </Link>
      {params.slug === "update" ? (
        <>
          <h1 className="text-2xl font-bold">Edit: {design?.name}</h1>
          <DesignForm design={design} params={params.slug} />
        </>
      ) : params.slug === "create" ? (
        <>
          <h1 className="text-2xl font-bold">Create a new design</h1>
          <DesignForm params={params.slug} />
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
