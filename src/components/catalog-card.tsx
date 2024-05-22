import Link from "next/link";
import Image from "next/image";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardList, checkboxList } from "@/lib/constant";
import CatalogFilter from "@/components/catalog-filter";
import { getAllDesigns } from "@/lib/utils";

type TCards = {
  designId: string;
  category: string;
  name: string;
  thumbnail_url: string;
};

const CatalogCard = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const getFilteredCards = async () => {
    const cards = await getAllDesigns();
    let filteredCards = cards;

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
    // switch (sortBy) {
    //   case "popular":
    //     filteredCards = filteredCards.filter((card) => card.isPopular);
    //     break;
    //   case "newest":
    //     filteredCards = filteredCards.filter((card) => card.isNewest);
    //     break;
    //   default: // no sorting applied
    //     break;
    // }

    return filteredCards;
  };

  const filtered: TCards[] = await getFilteredCards();

  return (
    <>
      {/* Filter */}
      <aside className="p-3 w-52 lg:w-52 lg:block">
        <CatalogFilter checkboxList={checkboxList} />
      </aside>
      {/* Card Listing */}
      <section className="p-3 w-full mx-auto ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
          {filtered.map((card, index) => (
            <Card
              key={index}
              className={cn(
                "text-center relative "
                // card.isPopular &&
                //   "before:content-['Popular'] before:bg-yellow-400 before:absolute before:-left-5 before:-top-2 before:-rotate-[20deg]   before:w-20  before:rounded-lg before:py-1 before:text-white before:font-bold"
              )}
            >
              <Image
                className="mx-auto p-3"
                src={`https://bkduabhaudrkgjloqnck.supabase.co/storage/v1/object/public/e-card%20bucket/${card.thumbnail_url}`}
                width={200}
                height={200}
                alt={card.name}
              />
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>

              <CardFooter className="gap-2 flex flex-col lg:flex-row items-center justify-center md:w-full">
                <Link
                  href="/preview/demo"
                  target="_blank"
                  className={cn(
                    "w-full",
                    buttonVariants({ variant: "secondary" })
                  )}
                >
                  Preview
                </Link>
                <Link
                  href={`/user/create?design_id=${card.designId}`}
                  className={cn(
                    "w-full",
                    buttonVariants({ variant: "default" })
                  )}
                >
                  Buy now
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default CatalogCard;
