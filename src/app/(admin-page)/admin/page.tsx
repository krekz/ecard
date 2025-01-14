import { auth } from "@/auth";
import Location from "@/components/admin/dashboard/location";
import RecentSales from "@/components/admin/dashboard/recent-sales";
import View from "@/components/admin/dashboard/view";
import { TLogLib } from "@/lib/types";
import { notFound, redirect } from "next/navigation";

const AdminDashboard = async () => {
  const session = await auth();
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "super_admin")
  ) {
    notFound();
  }

  const response = await fetch(
    `https://api.loglib.io/v1/insight?apiKey=${process.env.LOGLIB_API_KEY}&timeZone=asia/kuala_lumpur`,
    {
      next: {
        revalidate: 3 * 60, //3minutes
      },
    }
  );
  const data: TLogLib = await response.json();
  return (
    <>
      <div className="col-span-6 xl:col-span-5 flex flex-col items-center h-full py-10">
        <h1 className="text-4xl font-bold">Overview</h1>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 grid-cols-1 p-5 gap-2">
          <View insight={data.insight} />
          <Location locations={data.data.locations} />
          <RecentSales />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
