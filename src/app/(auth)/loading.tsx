import Spinner from "@/components/admin/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="col-span-5 flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

export default Loading;
