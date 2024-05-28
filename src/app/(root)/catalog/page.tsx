import CatalogCard from "@/components/catalog-card";
import CatalogFilter from "@/components/catalog-filter";
import { checkboxList } from "@/lib/constant";

const CatalogPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="py-10 md:container flex flex-col flex-wrap">
      <h1 className="text-center text-4xl font-bold uppercase">
        Browse E-card
      </h1>
      <div className="flex flex-col md:flex-row">
        <aside className="p-3 w-52 lg:w-52 lg:block mx-auto">
          <CatalogFilter checkboxList={checkboxList} />
        </aside>
        <CatalogCard searchParams={searchParams} />
      </div>
    </main>
  );
};

export default CatalogPage;
