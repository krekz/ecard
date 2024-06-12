import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getAllDesigns } from "@/actions/admin/design-actions";
import DataTable from "@/components/table/data-table";
import { designColumns } from "./design-column";
import Link from "next/link";
import prisma from "../../../../../prisma";

export const maxDuration = 45;

const UploadDesignPage = async () => {
  const session = await auth();
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "super_admin")
  ) {
    notFound();
  }

  // const { designs } = await getAllDesigns();

  const designs = await prisma.design.findMany({
    select: {
      name: true,
      category: true,
      thumbnail_url: true,
    },
  });
  return (
    <>
      {designs && designs.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold">Designs</h1>
          <Link
            className="p-3 rounded-md bg-primary"
            href="/admin/designs/create"
          >
            Create new
          </Link>
          <DataTable columns={designColumns} data={designs} />
        </>
      ) : (
        //  NO design section
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl font-semibold">No Designs</h1>
          <Link
            className="p-3 rounded-md bg-primary"
            href="/admin/designs/create"
          >
            Create new
          </Link>
        </div>
      )}
    </>
  );
};

export default UploadDesignPage;
