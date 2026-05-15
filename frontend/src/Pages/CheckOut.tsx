import { useEffect, useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import { createOrderSchema, type OrderInfo } from "../constant/index.type";
import Loader from "../components/Loader";
import { DELIVERY_RATES, normalizePaymentData } from "../constant";
import { useGetOrderById, usePaymentInfo } from "../api/orderQuery";
import { useInitializePayment } from "../api/initPaymentMutation";
import UnPaidUI from "../components/UnPaidUI";
import UnderPaidUI from "../components/UnderPaidUI";
import PaidUI from "../components/PaidUI";
import { usePaymentStore } from "../store/paymentStore";
// import { getPaymentInfo } from "../services/apiServices";

const inputClass =
  "w-full border border-[#ddd] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#bbb] outline-none focus:border-[#1a1a1a] transition-colors bg-white";

const Checkout = () => {
  const { id } = useParams<string>();

  const paymentData = usePaymentStore((state) => state.paymentData);

  const setPaymentData = usePaymentStore((state) => state.setPaymentData);

  const paymentId = useMemo(
    () => paymentData?.payment_info?.id,
    [paymentData?.payment_info?.id],
  );

  const { data: paymentInfo } = usePaymentInfo(paymentId);
  console.log(paymentId);
  // console.log("RAW PAYMENT INFO:", paymentInfo);
  // console.log("STRINGIFIED:", JSON.stringify(paymentInfo, null, 2));

  useEffect(() => {
    if (paymentInfo) {
      const normalizedData = normalizePaymentData(paymentInfo);

      setPaymentData(normalizedData);
    }
  }, [paymentInfo]);

  const { data } = useGetOrderById(id!);

  const [step, setStep] = useState<"form" | "payment">("form");
  type FormErrors = Partial<Record<keyof OrderInfo, string>>;
  const [errors, setErrors] = useState<FormErrors>({});

  // console.log(data);
  const {
    mutateAsync: initializeTransfer,
    isPending,
    // error,
  } = useInitializePayment();

  // console.log(initializePayment.length);

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

  const handleInitTransfer = async () => {
    if (!validate()) return;
    try {
      const response = await initializeTransfer({
        id,
        data: form,
      });
      setPaymentData(response);
      console.log(setPaymentData);
      setStep("payment");

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const [form, setForm] = useState<OrderInfo>({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    deliveryPrice: 0,
  });

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateName = e.target.value;

    const selected = DELIVERY_RATES.find((item) => item.state === stateName);

    setForm((prev) => ({
      ...prev,
      state: stateName,
      deliveryPrice: selected?.price || 0,
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:h-full">
      {/* ── LEFT: Form ── */}
      <div className="px-6 md:px-10 py-10 md:h-full border-b md:border-b-0 md:border-r border-[#e8e8e8]">
        <p className="text-[18px] font-black text-[#1a1a1a] tracking-tight mb-8">
          Too Clean
        </p>

        {/* Contact */}
        {paymentData ? (
          <div className="bg-[#f7f7f5] border border-[#e8e8e8] rounded-2xl p-6 space-y-4">
            {paymentData.payment_info.paymentStatus === "unpaid" ? (
              <UnPaidUI
                payment_info={paymentData.payment_info}
                message={paymentData.message}
              />
            ) : paymentData.payment_info.paymentStatus === "underpaid" ? (
              <UnderPaidUI />
            ) : paymentData.payment_info.paymentStatus === "paid" ? (
              <PaidUI />
            ) : null}
            {/* Header */}
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
            <div className="mb-7">
              <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-3">
                Delivery
              </h3>
              <div className="flex flex-col gap-2.5">
                <select
                  className={inputClass}
                  name="state"
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>

                  {DELIVERY_RATES.map((item) => (
                    <option key={item.state} value={item.state}>
                      {item.state}
                    </option>
                  ))}
                </select>
                {form.state && (
                  <div className="flex justify-between items-center px-0.5 mt-2 text-sm text-gray-600">
                    <span>{form.state}</span>
                    <span>₦{form.deliveryPrice.toLocaleString()}</span>
                  </div>
                )}
                {errors.state && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.state}
                  </p>
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
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delivery */}

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
          {isPending ? <Loader /> : "Place Order"}
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
          {data?.items.map((item) => (
            <div className="flex items-center gap-4" key={item.id}>
              <div className="relative shrink-0">
                <img
                  src={item.product.images[0] ?? "/placeholder.jpg"}
                  alt={item.product.name}
                  className="w-14 h-14 object-contain rounded-lg border border-[#e8e8e8] bg-white p-1"
                />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#555] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.qty}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#1a1a1a]">
                  {item.product.name}
                </p>
                {/* <p className="text-[12px] text-[#888] mt-0.5">{bundle.}</p> */}
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold text-[#1a1a1a]">
                  ₦{data.total.toLocaleString("en-NG")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#e8e8e8] mb-4" />
        {/* Totals */}
        <div className="flex justify-between text-[14px] text-[#555] mb-2.5">
          <span>Shipping</span>
          <span className="text-[#1a7a3c] font-semibold">
            {" "}
            ₦{form.deliveryPrice.toLocaleString("en-NG")}
          </span>
        </div>
        <div className="h-px bg-[#e8e8e8] my-3" />
        {/* <div className="flex justify-between text-[17px] font-extrabold text-[#1a1a1a]">
          <span>Total</span>
          <span>₦{bundle?.total?.toLocaleString("en-NG")  ?? "—"}</span>
        </div> */}
      </div>
    </div>
  );
};

export default Checkout;
