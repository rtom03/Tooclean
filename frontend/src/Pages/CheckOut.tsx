import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import { getOrderData, initializePayment } from "../services/apiServices";
import {
  createOrderSchema,
  type InitializePaymentResponse,
  type Order,
  type OrderInfo,
  type Product,
} from "../constant/index.type";
import Loader from "../components/Loader";

const inputClass =
  "w-full border border-[#ddd] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#bbb] outline-none focus:border-[#1a1a1a] transition-colors bg-white";

const Checkout = () => {
  const { id } = useParams<string>();
  const [bundle, setBundle] = useState<Order | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [paymentData, setPaymentData] =
    useState<InitializePaymentResponse | null>(null);
  const [step, setStep] = useState<"form" | "payment">("form");
  const [loading, setLoading] = useState(false);
  type FormErrors = Partial<Record<keyof OrderInfo, string>>;
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const res = await getOrderData(id);
      setProduct(res?.product);
      setBundle(res);
    };

    fetchOrder();
  }, [id]);

  const validate = (): boolean => {
    const result = createOrderSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof OrderInfo;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleInitTransfer = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    if (loading) return; // prevent double submit

    setLoading(true);
    try {
      if (!id) return;
      const response = await initializePayment(id, form);
      console.log(`HERE ${response}`);
      setPaymentData(response); // contains accountNumber, bankName, etc.
      setStep("payment");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [form, setForm] = useState<OrderInfo>({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // if (errors[name as keyof OrderInfo]) {
    //   setErrors((prev) => ({ ...prev, [name]: undefined }));
    // }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:h-full">
      {/* ── LEFT: Form ── */}
      <div className="px-6 md:px-10 py-10 md:h-full border-b md:border-b-0 md:border-r border-[#e8e8e8]">
        <p className="text-[18px] font-black text-[#1a1a1a] tracking-tight mb-8">
          Too Clean
        </p>

        {/* Contact */}
        {step === "payment" && paymentData ? (
          // <div>
          //   <p>Bank: {paymentData.payment_info.bankName}</p>
          //   <p>Account Number: {paymentData.payment_info.accountNumber}</p>
          //   <p>Account Name: {paymentData.payment_info.accountName}</p>
          //   <p>Amount: ₦{paymentData.payment_info.amount}</p>
          // </div>
          <div className="bg-[#f7f7f5] border border-[#e8e8e8] rounded-2xl p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#1a7a3c] animate-pulse" />
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a7a3c]">
                Transfer Details
              </p>
            </div>

            {/* Bank */}
            <div className="border-b border-[#e8e8e8] pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999] mb-1">
                Bank
              </p>
              <p className="text-[22px] font-black text-[#1a1a1a] tracking-tight">
                {paymentData.payment_info.bankName}
              </p>
            </div>

            {/* Account Number */}
            <div className="border-b border-[#e8e8e8] pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999] mb-1">
                Account Number
              </p>
              <p className="text-[28px] font-black text-[#1a1a1a] tracking-[0.06em]">
                {paymentData.payment_info.accountNumber}
              </p>
            </div>

            {/* Account Name */}
            <div className="border-b border-[#e8e8e8] pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999] mb-1">
                Account Name
              </p>
              <p className="text-[20px] font-black text-[#1a1a1a] tracking-tight">
                {paymentData.payment_info.accountName}
              </p>
            </div>

            {/* Amount */}
            <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white/60">
                Amount to Pay
              </p>
              <p className="text-[28px] font-black text-white tracking-tight">
                ₦
                {Number(paymentData.payment_info.amount).toLocaleString(
                  "en-NG",
                )}
              </p>
            </div>

            {/* Note */}
            <p className="text-[12px] text-[#888] text-center pt-1">
              Transfer the exact amount to complete your order
            </p>
          </div>
        ) : (
          <div className="mb-7">
            <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">
              Contact
            </h3>
            <div className="flex flex-row gap-2.5">
              <div>
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <input
                  className={inputClass}
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delivery */}
        <div className="mb-7">
          <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">
            Delivery
          </h3>
          <div className="flex flex-col gap-2.5">
            <select className={inputClass} name="state" onChange={handleChange}>
              <option value="">Nigeria</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Rivers</option>
              <option>Kano</option>
              <option>Oyo</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-[11px] mt-1">{errors.state}</p>
            )}
            <input
              className={inputClass}
              type="text"
              name="customerName"
              placeholder="John Doe"
              value={form.customerName}
              onChange={handleChange}
            />
            {errors.customerName && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.customerName}
              </p>
            )}
            <input
              className={inputClass}
              type="text"
              name="address"
              placeholder=" Obafemi Awolowo Wy, Alausa, Ojodu"
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>
            )}
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
        <button
          onClick={handleInitTransfer}
          className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold tracking-wide uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98] flex items-center justify-center"
          disabled={step === "payment"}
        >
          {loading ? <Loader /> : "Place Order"}
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
