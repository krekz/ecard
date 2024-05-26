import Spinner from "@/components/admin/spinner";
import React from "react";

const AdminLoading = () => {
  return (
    <div className="col-span-5 flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

export default AdminLoading;
