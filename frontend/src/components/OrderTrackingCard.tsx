import type { TrackedOrder } from "../constant/index.type";

type Props = {
  order: TrackedOrder | undefined;
};

const getDisplayStatus = (status: string, description: string) => {
  switch (status) {
    case "Enroute To Last Mile Hub":
      return "In Transit";

    case "Accepted At Last Mile Hub": {
      const match = description.match(/arrived at our (.*?) Hub/i);

      return match?.[1] ? `Arrived At ${match[1]} Hub` : "Arrived At Hub";
    }

    default:
      return status;
  }
};

const OrderTrackingCard = ({ order }: Props) => {
  if (!order) return null;

  // oldest -> newest
  const sortedHistory = [...order.history].sort(
    (a, b) =>
      new Date(a.statusCreationDate).getTime() -
      new Date(b.statusCreationDate).getTime(),
  );

  // normalize statuses
  const normalizedHistory = sortedHistory.map((item) => ({
    ...item,
    orderStatus: getDisplayStatus(item.orderStatus, item.statusDescription),
  }));

  // keep latest occurrence of each status
  const statusMap = new Map();

  normalizedHistory.forEach((item) => {
    statusMap.set(item.orderStatus, item);
  });

  // newest -> oldest
  const timeline = Array.from(statusMap.values()).reverse();

  const currentStatus = timeline[0]?.orderStatus ?? order.order.orderStatus;

  return (
    <div className="bg-white rounded-2xl border p-6">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold">Shipment Status</h2>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Tracking Number</p>

            <p className="font-semibold">{order.order.orderNo}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Current Status</p>

            <p className="font-semibold text-green-600">{currentStatus}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-500 uppercase">Delivery Address</p>

          <p>{order.order.recipientAddress}</p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="font-semibold text-lg mb-6">Tracking Timeline</h3>

        <div className="space-y-5">
          {timeline.map((item, index) => (
            <div
              key={`${item.orderStatus}-${item.statusCreationDate}`}
              className="relative flex gap-4"
            >
              {index !== timeline.length - 1 && (
                <div className="absolute left-[7px] top-4 h-full w-[2px] bg-green-500" />
              )}

              <div className="w-4 h-4 rounded-full bg-green-500 shrink-0 z-10" />

              <div>
                <h4 className="font-semibold">{item.orderStatus}</h4>

                <p className="text-sm text-gray-600">
                  {item.statusDescription}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.statusCreationDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingCard;
