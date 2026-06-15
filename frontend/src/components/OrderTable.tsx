import { useState } from "react";
import type { OrderData } from "../constant/index.type";
// import { useUpdateOrderStatus } from "../api/orderQuery";
import { useGetDiscountByCode } from "../api/discountQuery";

const statusConfig: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#f0f0f0", color: "#555" },
  processing: { bg: "#faeeda", color: "#633806" },
  shipped: { bg: "#e6f1fb", color: "#0c447c" },
  delivered: { bg: "#eaf3de", color: "#27500a" },
  failed: { bg: "#fcebeb", color: "#791f1f" },
};

// const statuses = ["pending", "processing", "shipped", "delivered", "failed"];

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex flex-col gap-0.5">
    <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#999]">
      {label}
    </p>
    <p className="text-[13px] text-[#1a1a1a] font-medium">{value ?? "—"}</p>
  </div>
);

const OrderTable = ({ orders }: { orders: OrderData[] }) => {
  const [selected, setSelected] = useState<OrderData | null>(null);
  // const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
  const discountCode = selected && selected.discountCode;
  const { data: discountData } = useGetDiscountByCode(discountCode!, {
    enabled: !!discountCode,
  });

  // console.log(selected?.orderDetails?.items.map((item) => item.product.name));

  // const handleStatusChange = (id: string, status: string) => {
  //   updateStatus({ id, status });
  // };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-[#fafafa]">
            {["Customer", "Email", "Amount", "Payment", "Status", ""].map(
              (h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#888] px-5 py-2.5 border-b border-[#e8e8e8]"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            // const cfg = statusConfig[o.status] ?? statusConfig.pending;
            return (
              <tr
                key={o.id}
                className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]"
              >
                <td className="px-5 py-3 text-[13px] font-semibold">
                  {o.customerName}
                </td>
                <td className="px-5 py-3 text-[13px] text-[#666]">{o.email}</td>
                <td className="px-5 py-3 text-[13px] font-semibold">
                  ₦{o.total.toLocaleString("en-NG")}
                </td>
                <td className="px-5 py-3">
                  <span
                    className="text-[10px] font-bold uppercase px-2 py-1 rounded"
                    style={{
                      background:
                        o.paymentStatus === "paid" ? "#eaf3de" : "#faeeda",
                      color: o.paymentStatus === "paid" ? "#27500a" : "#633806",
                    }}
                  >
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="relative w-fit">
                    <span className="appearance-none text-[11px] font-bold uppercase tracking-[0.05em] px-3 py-1.5 pr-7 rounded-md border-none outline-none cursor-pointer disabled:opacity-50">
                      {o.deliveryStatus}
                    </span>
                    {/* <select
                      defaultValue={o.status}
                      disabled={isPending}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      style={{ background: cfg.bg, color: cfg.color }}
                      className="appearance-none text-[11px] font-bold uppercase tracking-[0.05em] px-3 py-1.5 pr-7 rounded-md border-none outline-none cursor-pointer disabled:opacity-50"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select> */}
                    {/* <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-3 h-3 opacity-60"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polyline points="2,4 6,8 10,4" />
                      </svg>
                    </div> */}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => setSelected(o)}
                    className="text-[11px] font-bold px-3 py-1.5 border border-[#ddd] rounded-md hover:border-[#1a1a1a] transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#e8e8e8] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <p className="text-[14px] font-black text-[#1a1a1a]">
                  {selected.orderNumber}
                </p>
                <p className="text-[11px] text-[#888]">
                  {new Date(selected.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[#aaa] hover:text-[#1a1a1a] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div className="flex gap-2">
                <span
                  className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-md"
                  style={{
                    background: statusConfig[selected.status]?.bg,
                    color: statusConfig[selected.status]?.color,
                  }}
                >
                  {selected.status}
                </span>
                <span
                  className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-md"
                  style={{
                    background:
                      selected.paymentStatus === "paid" ? "#eaf3de" : "#faeeda",
                    color:
                      selected.paymentStatus === "paid" ? "#27500a" : "#633806",
                  }}
                >
                  {selected.paymentStatus}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#1a1a1a] mb-3">
                  Customer
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Row label="Name" value={selected.customerName} />
                  <Row label="Email" value={selected.email} />
                  <Row label="Phone" value={selected.phone} />
                  <Row label="State" value={selected.state} />
                  <Row label="Address" value={selected.address} />
                </div>
                <div className="flex flex-col gap-7 mt-7">
                  {selected?.orderDetails?.items?.map((item) => (
                    <div
                      key={item.productId}
                      className="border border-[#ececec] rounded-2xl bg-[#fafafa] p-4 flex items-center gap-4"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#ececec] shrink-0">
                        <img
                          src={item.product.images?.[0]}
                          alt={item.product.name}
                          className="w-200 h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-[#1a1a1a] truncate">
                          {item.product.name}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] font-semibold text-[#666] bg-white border border-[#e5e5e5] px-2 py-1 rounded-md">
                            Qty: {item.qty}
                          </span>

                          <span className="text-[11px] font-semibold text-[#666] bg-white border border-[#e5e5e5] px-2 py-1 rounded-md">
                            ₦{item.product.price.toLocaleString("en-NG")}
                          </span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="text-right shrink-0">
                        <p className="text-[15px] font-black text-[#1a1a1a]">
                          ₦
                          {(
                            item.product.price * item.product.qty
                          ).toLocaleString("en-NG")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#f0f0f0]" />

              <div className="h-px bg-[#f0f0f0]" />

              <div className="flex items-center justify-between bg-[#f7f7f5] rounded-xl px-4 py-3">
                <p className="text-[13px] font-bold text-[#1a1a1a]">Total</p>
                <p className="text-[18px] font-black text-[#1a1a1a]">
                  ₦{selected.total.toLocaleString("en-NG")}
                </p>
              </div>
              {discountData && (
                <div className="flex items-center justify-between bg-[#f7f7f5] rounded-xl px-4 py-3">
                  <p className="text-[13px] font-bold text-[#1a1a1a]">
                    Discount Price
                  </p>
                  <p className="text-[18px] font-black text-[#1a1a1a]">
                    ₦{discountData.discount_price.toLocaleString("en-NG")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
