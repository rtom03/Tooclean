import { useState } from "react";
import { Lock } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Hairline Spray",
    variant: "3 Bottles (−$20.00)",
    price: "$55.00",
    oldPrice: "$75.00",
    qty: 3,
    img: "/tcblack.jpg",
  },
  {
    id: 2,
    name: "Hairline Spray",
    variant: "3 Bottles (−$20.00)",
    price: "$55.00",
    oldPrice: "$75.00",
    qty: 3,
    img: "/tcbrown.jpg",
  },
];

const inputClass =
  "w-full border border-[#ddd] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#bbb] outline-none focus:border-[#1a1a1a] transition-colors bg-white";

const Checkout = () => {
  const [payMethod, setPayMethod] = useState<"card" | "paystack">("card");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* ── LEFT: Form ── */}
      <div className="overflow-y-auto px-6 md:px-10 py-10 border-r border-[#e8e8e8]">
        <p className="text-[18px] font-black text-[#1a1a1a] tracking-tight mb-8">
          Too Clean
        </p>

        {/* Contact */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">Contact</h3>
          <input className={inputClass} type="email" placeholder="Email" />
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-[13px] text-[#555]">
              Email me with deals and discounts
            </span>
          </label>
        </div>

        {/* Delivery */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">
            Delivery
          </h3>
          <div className="flex flex-col gap-2.5">
            <select className={inputClass}>
              <option>Nigeria</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
            <div className="grid grid-cols-2 gap-2.5">
              <input
                className={inputClass}
                type="text"
                placeholder="First name"
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Last name"
              />
            </div>
            <input className={inputClass} type="text" placeholder="Address" />
            <input
              className={inputClass}
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <input className={inputClass} type="text" placeholder="City" />
              <input
                className={inputClass}
                type="text"
                placeholder="Postal code"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Payment</h3>
          <p className="text-[12px] text-[#888] mb-3">
            All transactions are secure and encrypted.
          </p>

          {/* Card option */}
          <div
            onClick={() => setPayMethod("card")}
            className={`border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer mb-2 transition-colors
              ${payMethod === "card" ? "border-[#1a1a1a] bg-[#fafafa]" : "border-[#ddd]"}`}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center
              ${payMethod === "card" ? "border-[#1a1a1a]" : "border-[#ccc]"}`}
            >
              {payMethod === "card" && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
              )}
            </div>
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              Credit / Debit Card
            </span>
          </div>

          {payMethod === "card" && (
            <div className="flex flex-col gap-2.5 mb-2 pl-1">
              <input
                className={inputClass}
                type="text"
                placeholder="Card number"
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  className={inputClass}
                  type="text"
                  placeholder="MM / YY"
                />
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Security code"
                />
              </div>
              <input
                className={inputClass}
                type="text"
                placeholder="Name on card"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-[13px] text-[#555]">
                  Use shipping address as billing address
                </span>
              </label>
            </div>
          )}

          {/* Paystack option */}
          <div
            onClick={() => setPayMethod("paystack")}
            className={`border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors
              ${payMethod === "paystack" ? "border-[#1a1a1a] bg-[#fafafa]" : "border-[#ddd]"}`}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center
              ${payMethod === "paystack" ? "border-[#1a1a1a]" : "border-[#ccc]"}`}
            >
              {payMethod === "paystack" && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
              )}
            </div>
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              Pay with Paystack
            </span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold tracking-wide uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98]">
          Pay Now
        </button>
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[12px] text-[#aaa]">
          <Lock size={12} />
          Secure & encrypted checkout
        </div>
      </div>

      {/* ── RIGHT: Order summary ── */}
      <div className="overflow-y-auto px-6 md:px-10 py-10 bg-[#f7f7f5]">
        <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-5">
          Order Summary
        </h3>

        {/* Items */}
        <div className="flex flex-col gap-4 mb-5">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-lg border border-[#e8e8e8] bg-white p-1"
                />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#555] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.qty}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#1a1a1a]">
                  {item.name}
                </p>
                <p className="text-[12px] text-[#888] mt-0.5">{item.variant}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-[#bbb] line-through">
                  {item.oldPrice}
                </p>
                <p className="text-[14px] font-bold text-[#1a1a1a]">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#e8e8e8] mb-4" />

        {/* Discount */}
        <div className="flex gap-2 mb-5">
          <input
            className={`${inputClass} flex-1`}
            type="text"
            placeholder="Discount code"
          />
          <button className="bg-white border border-[#ddd] rounded-lg px-4 text-[13px] font-semibold text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors">
            Apply
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-between text-[14px] text-[#555] mb-2.5">
          <span>Subtotal</span>
          <span>$110.00</span>
        </div>
        <div className="flex justify-between text-[14px] text-[#555] mb-2.5">
          <span>Shipping</span>
          <span className="text-[#bbb]">Enter address</span>
        </div>
        <div className="h-px bg-[#e8e8e8] my-3" />
        <div className="flex justify-between text-[17px] font-extrabold text-[#1a1a1a]">
          <span>Total</span>
          <span>$110.00</span>
        </div>
        <div className="flex items-center gap-1.5 mt-3 text-[12px] font-bold text-[#1a7a3c]">
          <svg
            className="w-3.5 h-3.5 fill-none stroke-[#1a7a3c] stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          TOTAL SAVINGS $40.00
        </div>
      </div>
    </div>
  );
};

export default Checkout;
