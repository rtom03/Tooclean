import type { OrderData } from "../constant/index.type";

const OrderTable = ({ orders }: { orders: OrderData[] }) => {
  const statusStyle: Record<string, string> = {
    processing: "bg-[#faeeda] text-[#633806]",
    shipped: "bg-[#e6f1fb] text-[#0c447c]",
    delivered: "bg-[#eaf3de] text-[#27500a]",
    failed: "bg-[#fcebeb] text-[#791f1f]",
  };
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#fafafa]">
          {["Order", "Customer", "Product", "Amount", "Status"].map((h) => (
            <th
              key={h}
              className="text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#888] px-5 py-2.5 border-b border-[#e8e8e8]"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.length &&
          orders.map((o) => (
            <tr
              key={o.id}
              className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]"
            >
              <td className="px-5 py-3 text-[13px] font-semibold">{o.id}</td>
              <td className="px-5 py-3 text-[13px]">{o.email}</td>
              <td className="px-5 py-3 text-[13px]">{o.customerName}</td>
              <td className="px-5 py-3 text-[13px]">{o.total}</td>
              <td className="px-5 py-3">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${statusStyle[o.status]}`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
