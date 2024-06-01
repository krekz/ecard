import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getAllDesigns } from "../../../../../actions/admin/design-actions";
import DataTable from "../../../../components/table/data-table";
import { designColumns } from "./design-column";
import Link from "next/link";

export const maxDuration = 30;

const UploadDesignPage = async () => {
  const session = await auth();
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "super_admin")
  ) {
    notFound();
  }

  const designs = await getAllDesigns();
  return (
    <section className="col-span-6 xl:col-span-5 flex flex-col gap-10 justify-center items-center h-full py-10">
      {designs && designs.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold">Designs</h1>
          <Link
            className="p-3 rounded-md bg-primary"
            href="/admin/designs/q?action=create"
          >
            Create new
          </Link>
          <DataTable columns={designColumns} data={designs} />
        </>
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl font-semibold">No Designs</h1>
          <Link
            className="p-3 rounded-md bg-primary"
            href="/admin/designs/q?action=create"
          >
            Create new
          </Link>
        </div>
      )}
    </section>
  );
};

export default UploadDesignPage;
