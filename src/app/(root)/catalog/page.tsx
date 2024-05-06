import Link from "next/link";
import Image from "next/image";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cardList, checkboxList } from "@/lib/constant";
import { cn } from "@/lib/utils";
import CatalogFilter from "@/components/catalog-filter";

const CatalogPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const getFilteredCards = () => {
    let filteredCards = cardList;

    // sort based on 'filter' query parameter
    const filters = searchParams.filter;
    if (filters) {
      const filterArrayParams = Array.isArray(filters) ? filters : [filters]; // convert the 'filter' params to an array if it's not and vice versa
      filteredCards = filteredCards.filter((card) =>
        filterArrayParams.some((filter) =>
          card.category.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    // sorting based on 'sortBy' query parameter
    const sortBy = searchParams.sortBy as string;
    switch (sortBy) {
      case "popular":
        filteredCards = filteredCards.filter((card) => card.isPopular);
        break;
      case "newest":
        filteredCards = filteredCards.filter((card) => card.isNewest);
        break;
      default: // no sorting applied
        break;
    }

    return filteredCards;
  };

  const filtered = getFilteredCards();

  return (
    <main className="p-10 sm:container flex flex-col flex-wrap">
      <h1 className="text-center text-4xl font-bold uppercase">
        Browse E-card
      </h1>
      <div className="flex flex-col md:flex-row">
        {/* Filter */}
        <aside className="p-3 w-52 lg:w-52 lg:block">
          <h1 className="text-2xl font-medium">Sort By</h1>
          <CatalogFilter checkboxList={checkboxList} />
        </aside>
        {/* Card Listing */}
        <section className="p-3 w-full mx-auto ">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
            {filtered.map((card, index) => (
              <Card
                key={index}
                className={cn(
                  "text-center relative ",
                  card.isPopular &&
                    "before:content-['Popular'] before:bg-yellow-400 before:absolute before:-left-5 before:-top-2 before:-rotate-[20deg]   before:w-20  before:rounded-lg before:py-1 before:text-white before:font-bold"
                )}
              >
                <Image
                  className="mx-auto p-3"
                  src={card.image}
                  width={card.width}
                  height={card.height}
                  alt={card.alt}
                />
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>

                <CardFooter className="gap-2 flex flex-col lg:flex-row items-center justify-center md:w-full">
                  <Link
                    href="/preview/demo"
                    target="_blank"
                    className={cn("w-full", buttonVariants({ variant: "secondary" }))}
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/user/create`}
                    className={cn("w-full", buttonVariants({ variant: "default" }))}
                  >
                    Buy now
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CatalogPage;
