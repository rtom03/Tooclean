import { useState } from "react";

const inputClass =
  "w-full border-[1.5px] border-[#ddd] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#ccc] outline-none focus:border-[#1a1a1a] transition-colors";
const btnClass =
  "bg-[#1a1a1a] text-white text-[12px] font-bold tracking-[0.05em] uppercase px-6 py-3 rounded-lg hover:opacity-80 transition-opacity mt-1";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackByOrder = () => {
    // query Supabase by order number + phone
    console.log("Track by order:", orderNumber, phone);
  };

  const handleTrackByTracking = () => {
    // query Supabase by tracking number
    console.log("Track by tracking number:", trackingNumber);
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-7">
        Track Your Order
      </h1>

      <div className="bg-white border border-[#e8e8e8] rounded-2xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {/* Left — Order Number + Phone */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#555] mb-2">
                Order Number
              </label>
              <input
                className={inputClass}
                type="text"
                placeholder="e.g. TC-00123"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#555] mb-2">
                Phone Number
              </label>
              <input
                className={inputClass}
                type="tel"
                placeholder="e.g. 08012345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button onClick={handleTrackByOrder} className={btnClass}>
              Track
            </button>
          </div>

          {/* Or divider */}
          <div className="flex md:flex-col items-center justify-center gap-2 py-4 md:py-0 md:px-8">
            <div className="flex-1 md:w-px md:flex-none md:h-full w-full h-px bg-[#e8e8e8]" />
            <span className="text-[13px] font-semibold text-[#aaa]">Or</span>
            <div className="flex-1 md:w-px md:flex-none md:h-full w-full h-px bg-[#e8e8e8]" />
          </div>

          {/* Right — Tracking Number */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#555] mb-2">
                Tracking Number
              </label>
              <input
                className={inputClass}
                type="text"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button onClick={handleTrackByTracking} className={btnClass}>
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
