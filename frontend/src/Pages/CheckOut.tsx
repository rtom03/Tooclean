import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import { getOrderData } from "../services/apiServices";
import { type Order, type Product } from "../constant/index.type";

const inputClass =
  "w-full border border-[#ddd] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#bbb] outline-none focus:border-[#1a1a1a] transition-colors bg-white";

const Checkout = () => {
  const { id } = useParams<string>();
  const [bundle, setBundle] = useState<Order | null>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const res = await getOrderData(id);
        setProduct(res?.product);
        const data = res;
        setBundle(data);
        console.log(data);
      }
    };

    fetchOrder();
  }, [id]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    region: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:h-full">
      {/* ── LEFT: Form ── */}
      <div className="px-6 md:px-10 py-10 md:h-full border-b md:border-b-0 md:border-r border-[#e8e8e8]">
        <p className="text-[18px] font-black text-[#1a1a1a] tracking-tight mb-8">
          Too Clean
        </p>

        {/* Contact */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">Contact</h3>
          <div className="flex flex-row gap-2.5">
            <input
              className={inputClass}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className={inputClass}
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Delivery */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">
            Delivery
          </h3>
          <div className="flex flex-col gap-2.5">
            <select
              className={inputClass}
              name="region"
              onChange={handleChange}
            >
              <option value="">Nigeria</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Rivers</option>
              <option>Kano</option>
              <option>Oyo</option>
            </select>
            <div className="grid grid-cols-2 gap-2.5">
              <input
                className={inputClass}
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                className={inputClass}
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              className={inputClass}
              type="text"
              name="address"
              placeholder=" Obafemi Awolowo Wy, Alausa, Ojodu"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Payment */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">Payment</h3>
          <p className="text-[12px] text-[#888] mb-3">
            All transactions are secure and encrypted.
          </p>
          <div className="border-2 border-[#1a1a1a] rounded-lg px-4 py-3 flex items-center gap-3 bg-[#fafafa]">
            <div className="w-[18px] h-[18px] rounded-full border-2 border-[#1a1a1a] flex-shrink-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
            </div>
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              Pay with Paystack — Bank Transfer
            </span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold tracking-wide uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98]">
          Place Order
        </button>
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[12px] text-[#aaa]">
          <Lock size={12} />
          Secure & encrypted checkout
        </div>
      </div>

      {/* ── RIGHT: Order summary — untouched styling ── */}
      <div className="px-6 md:px-10 py-10 md: bg-[#f7f7f5]">
        <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-5">
          Order Summary
        </h3>

        {/* Items */}
        <div className="flex flex-col gap-4 mb-5">
          {product && bundle && (
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={product?.images?.[0] ?? "/placeholder.jpg"}
                  alt={product?.name}
                  className="w-14 h-14 object-contain rounded-lg border border-[#e8e8e8] bg-white p-1"
                />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#555] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bundle?.qty}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#1a1a1a]">
                  {product.name}
                </p>
                {/* <p className="text-[12px] text-[#888] mt-0.5">{bundle.}</p> */}
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold text-[#1a1a1a]">
                  ₦{bundle.total.toLocaleString("en-NG")}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-[#e8e8e8] mb-4" />
        {/* Totals */}
        <div className="flex justify-between text-[14px] text-[#555] mb-2.5">
          <span>Shipping</span>
          <span className="text-[#1a7a3c] font-semibold">Free</span>
        </div>
        <div className="h-px bg-[#e8e8e8] my-3" />
        <div className="flex justify-between text-[17px] font-extrabold text-[#1a1a1a]">
          <span>Total</span>
          <span>₦{bundle?.total?.toLocaleString("en-NG") ?? "—"}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
