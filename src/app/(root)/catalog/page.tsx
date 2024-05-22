import { Suspense } from "react";
import HomeLoading from "@/app/(root)/loading";
import CatalogCard from "@/components/catalog-card";

const CatalogPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="p-24 sm:container flex flex-col flex-wrap">
      <h1 className="text-center text-4xl font-bold uppercase">
        Browse E-card
      </h1>
      <Suspense fallback={<HomeLoading />}>
        <div className="flex flex-col md:flex-row">
          <CatalogCard searchParams={searchParams} />
        </div>
      </Suspense>
    </main>
  );
};

export default CatalogPage;
