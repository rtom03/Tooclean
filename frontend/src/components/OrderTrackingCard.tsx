import type { TrackedOrder } from "../constant/index.type";

type Props = {
  order: TrackedOrder | null;
};

const OrderTrackingCard = ({ order }: Props) => {
  if (!order) return null;
  console.log(order);

  return (
    <div className="mt-6 border rounded-xl p-5 bg-white space-y-2">
      <p className="text-sm font-bold">Order: {order.orderNumber}</p>

      <p className="text-sm text-gray-600">Name: {order.customerName}</p>

      <p className="text-sm">Status: {order.status}</p>

      <p className="text-sm">Payment: {order.paymentStatus}</p>

      <p className="text-sm">Delivery: {order.deliveryStatus}</p>

      {/* <p className="text-sm font-semibold">₦{order.total.toLocaleString()}</p> */}
    </div>
  );
};

export default OrderTrackingCard;
