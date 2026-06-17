import type { TrackedOrder } from "../constant/index.type";

type Props = {
  order: TrackedOrder | undefined;
};

const OrderTrackingCard = ({ order }: Props) => {
  if (!order) return null;

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

            <p className="font-semibold text-green-600">
              {order.order.orderStatus}
            </p>
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-green-500" />

          <div className="space-y-8">
            {order.history.map((item, index) => (
              <div
                key={`${item.statusCreationDate}-${index}`}
                className="relative flex gap-4"
              >
                {/* Dot */}
                <div className="w-6 h-6 rounded-full bg-green-500 shrink-0 z-10" />

                {/* Content */}
                <div>
                  <h4 className="font-semibold">{item.orderStatus}</h4>

                  <p className="text-sm text-gray-600">
                    {item.statusDescription}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {item.statusCreationDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingCard;
