import { Skeleton } from "@/components/ui/skeleton";
const Loading = () => {
  return (
    <>
      <section className="flex flex-row flex-wrap justify-center p-5 gap-5 h-screen ">
        {Array.from(Array(4).keys()).map((key) => (
          <div key={key} className="flex flex-col gap-1">
            <Skeleton className="size-60" />
            <Skeleton className="w-56 h-3" />
            <Skeleton className="w-44 h-3" />
            <Skeleton className="w-52 h-3" />
          </div>
        ))}
      </section>
    </>
  );
};

export default Loading;
