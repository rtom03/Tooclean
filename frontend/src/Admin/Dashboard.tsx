import { useMemo } from "react";
import { useOrders } from "../api/orderQuery";
import { useGetAllOrders } from "../api/paymentQuery";
import OrderTable from "../components/OrderTable";

const Dashboard = () => {
  const { data: orders, isError, error } = useGetAllOrders();

  const stats = useMemo(() => {
    const totalRevenue =
      orders
        ?.filter((order) => order.paymentStatus === "paid")
        .reduce((sum, order) => sum + order.total, 0) ?? 0;

    const totalOrders = orders?.length ?? 0;

    const totalPending =
      orders?.filter((order) => order.paymentStatus === "unpaid").length ?? 0;

    return [
      {
        label: "Total Revenue",
        value: `₦${totalRevenue?.toLocaleString() || 0}`,
        sub: "+12% this week",
        subColor: "text-[#1a7a3c]",
      },
      {
        label: "Total Orders",
        value: totalOrders.toString() || 0,
        sub: "+5 today",
        subColor: "text-[#1a7a3c]",
      },
      {
        label: "Products",
        value: "2",
        sub: "2 variants",
        subColor: "text-[#888]",
      },
      {
        label: "Pending",
        value: totalPending.toString() || 0,
        sub: "Needs attention",
        subColor: "text-[#ba7517]",
      },
    ];
  }, [orders]);
  const { data, isPending } = useOrders();
  if (isPending) return <p>Loading orders...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h1 className="text-xl font-black text-[#1a1a1a] mb-5">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-[#e8e8e8] rounded-xl p-4"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#888] mb-2">
              {s.label}
            </p>
            <p className="text-2xl font-black text-[#1a1a1a]">{s.value}</p>
            {/* <p className={`text-[11px] mt-1 ${s.subColor}`}>{s.sub}</p> */}
          </div>
        ))}
      </div>
      <OrderTable orders={data.orders} />
      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#e8e8e8] flex items-center justify-between">
          <p className="text-[13px] font-bold">Recent orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
