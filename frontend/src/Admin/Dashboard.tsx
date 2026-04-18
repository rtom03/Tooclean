const stats = [
  {
    label: "Total Revenue",
    value: "$4,280",
    sub: "+12% this week",
    subColor: "text-[#1a7a3c]",
  },
  {
    label: "Total Orders",
    value: "86",
    sub: "+5 today",
    subColor: "text-[#1a7a3c]",
  },
  { label: "Products", value: "4", sub: "2 variants", subColor: "text-[#888]" },
  {
    label: "Pending",
    value: "12",
    sub: "Needs attention",
    subColor: "text-[#ba7517]",
  },
];

const recentOrders = [
  {
    id: "#TC-0086",
    customer: "Amara Johnson",
    product: "Hairline Spray — Black x2",
    amount: "$40.00",
    status: "delivered",
  },
  {
    id: "#TC-0085",
    customer: "Kelechi Obi",
    product: "Hairline Spray — Brown x1",
    amount: "$24.99",
    status: "shipped",
  },
  {
    id: "#TC-0084",
    customer: "Tunde Adeyemi",
    product: "Hairline Spray — Black x3",
    amount: "$55.00",
    status: "processing",
  },
  {
    id: "#TC-0083",
    customer: "Sade Williams",
    product: "Hairline Spray — Brown x2",
    amount: "$40.00",
    status: "failed",
  },
];

const statusStyle: Record<string, string> = {
  processing: "bg-[#faeeda] text-[#633806]",
  shipped: "bg-[#e6f1fb] text-[#0c447c]",
  delivered: "bg-[#eaf3de] text-[#27500a]",
  failed: "bg-[#fcebeb] text-[#791f1f]",
};

const Dashboard = () => (
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
          <p className={`text-[11px] mt-1 ${s.subColor}`}>{s.sub}</p>
        </div>
      ))}
    </div>

    <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[#e8e8e8] flex items-center justify-between">
        <p className="text-[13px] font-bold">Recent orders</p>
      </div>
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
          {recentOrders.map((o) => (
            <tr
              key={o.id}
              className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]"
            >
              <td className="px-5 py-3 text-[13px] font-semibold">{o.id}</td>
              <td className="px-5 py-3 text-[13px]">{o.customer}</td>
              <td className="px-5 py-3 text-[13px]">{o.product}</td>
              <td className="px-5 py-3 text-[13px]">{o.amount}</td>
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
    </div>
  </div>
);

export default Dashboard;
