import { useEffect, useState } from "react";
import {
  useTrackOrderByOrderNumber,
  useTrackOrderByPhone,
} from "../store/trackStore";
import Loader from "../components/Loader";
import OrderTrackingCard from "../components/OrderTrackingCard";

const inputClass =
  "w-full border-[1.5px] border-[#ddd] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#ccc] outline-none focus:border-[#1a1a1a] transition-colors";

const TrackOrder = () => {
  const [phone, setPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState("");
  const { data, isLoading, refetch } = useTrackOrderByPhone(submittedPhone);
  const {
    data: order,
    isLoading: orderLoading,
    refetch: orderRefetch,
  } = useTrackOrderByOrderNumber(submittedTrackingNumber);
  const orderData = data?.order || order?.order;

  const trackedOrder = orderData
    ? {
        orderNumber: orderData.orderNumber,
        customerName: orderData.customerName,
        status: orderData.status,
        paymentStatus: orderData.paymentStatus,
        deliveryStatus: orderData.deliveryStatus,
        total: orderData.total,
        createdAt: orderData.createdAt,
      }
    : null;

  // console.log(order);

  const handleTrackByOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmittedTrackingNumber(trackingNumber);
  };

  const handleTrackByPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPhone(phone);
  };
  useEffect(() => {
    if (submittedPhone) {
      refetch();
      setPhone("");
    }
  }, [submittedPhone]);
  useEffect(() => {
    if (submittedTrackingNumber) {
      orderRefetch();
    }
  }, [submittedTrackingNumber]);
  // if (data) {
  //   console.log(data);
  // }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-7">
        Track Your Order
      </h1>

      <div className="bg-white border border-[#e8e8e8] rounded-2xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {/* Left — Order Number + Phone */}
          <div>
            {!data ? (
              <form
                className="flex-1 flex flex-col gap-4"
                onSubmit={handleTrackByPhone}
              >
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#555] mb-2">
                    Track With Your Submitted Phone Number
                  </label>
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold tracking-wide uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98] flex items-center justify-center"
                  // disabled={data}
                >
                  {isLoading ? <Loader /> : "Track Order"}
                </button>
              </form>
            ) : (
              <>
                <OrderTrackingCard order={trackedOrder} />{" "}
              </>
            )}
          </div>
          {/* Or divider */}
          <div className="flex md:flex-col items-center justify-center gap-2 py-4 md:py-0 md:px-8">
            <div className="flex-1 md:w-px md:flex-none md:h-full w-full h-px bg-[#e8e8e8]" />
            <span className="text-[13px] font-semibold text-[#a1a1a1]">Or</span>
            <div className="flex-1 md:w-px md:flex-none md:h-full w-full h-px bg-[#e8e8e8]" />
          </div>

          {/* Right — Tracking Number */}
          <div>
            {!order ? (
              <form
                className="flex-1 flex flex-col gap-4"
                onSubmit={handleTrackByOrder}
              >
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#555] mb-2">
                    Track With Order ID
                  </label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold tracking-wide uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98] flex items-center justify-center"
                  // disabled={data}
                >
                  {orderLoading ? <Loader /> : "Track Order"}
                </button>
              </form>
            ) : (
              <>
                <OrderTrackingCard order={trackedOrder} />{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
