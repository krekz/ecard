import CatalogCard from "@/components/catalog-card";
import CatalogFilter from "@/components/catalog-filter";
import { checkboxList } from "@/lib/constant";
import { Suspense } from "react";
import Loading from "./loading-skeleton";

const CatalogPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="pb-10 flex flex-col flex-wrap">
      <div className="relative">
        <div
          style={{ backgroundImage: "url('/catalog-banner.jpg')" }}
          className="brightness-50 flex items-center justify-center h-40 bg-cover xl:bg-center bg-no-repeat bg-center"
        ></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white">
          Browse <span className="text-fuchsia-500">Tea</span>Card
        </h1>
      </div>

      <div className="md:container flex flex-col md:flex-row">
        {/* <aside className="p-3 w-52 lg:w-52 lg:block mx-auto">
          <CatalogFilter checkboxList={checkboxList} />
        </aside> */}
        <Suspense fallback={<Loading />}>
          <CatalogCard searchParams={{ page: searchParams.page }} />
        </Suspense>
      </div>
    </main>
  );
};

export default CatalogPage;
