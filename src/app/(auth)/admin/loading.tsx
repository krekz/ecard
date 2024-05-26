import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="col-span-5 flex justify-center p-5 h-screen gap-5">
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="size-64" />
      ))}
    </div>
  );
};

export default Loading;
