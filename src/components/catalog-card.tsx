import Link from "next/link";
import Image from "next/image";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardList, checkboxList } from "@/lib/constant";
import CatalogFilter from "@/components/catalog-filter";
import { getAllDesigns } from "../../actions/admin/design-actions";

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

      {/* Card Listing */}
      <section className="p-3 w-full mx-auto ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
          {filtered.map((card, index) => (
            <Card
              key={index}
              className={cn(
                "text-center relative overflow-hidden"
                // card.isPopular &&
                //   "before:content-['Popular'] before:bg-yellow-400 before:absolute before:-left-5 before:-top-2 before:-rotate-[20deg]   before:w-20  before:rounded-lg before:py-1 before:text-white before:font-bold"
              )}
            >
              <Image
                className="mx-auto w-auto h-auto p-3 scale-150 overflow-hidden"
                src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${card.thumbnail_url}`}
                width={300}
                height={300}
                alt={card.name}
                quality={75}
                priority
              />
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>

              <CardFooter className="gap-1 flex flex-col lg:flex-row items-center justify-center md:w-full">
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={`/preview/demo?id=${card.designId}`}
                    target="_blank"
                  >
                    Preview
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-fuchsia-500 hover:bg-fuchsia-600 w-full"
                >
                  <Link href={`/user/create?design_id=${card.designId}`}>
                    Buy now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default CatalogCard;
