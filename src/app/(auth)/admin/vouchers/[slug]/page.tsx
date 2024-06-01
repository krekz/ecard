import VoucherForm from "@/components/admin/voucher-form";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

export const maxDuration = 60

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  if (!searchParams.action || searchParams.action !== "create")
    return notFound();
  return (
    <section className="relative col-span-6 xl:col-span-5 flex flex-col gap-10 justify-center items-center h-full py-10">
      <Link href="/admin/vouchers" className=" p-3 rounded-md bg-purple-500">
        <LuArrowLeft />
      </Link>
      <VoucherForm />
    </section>
  );
};

export default Page;
