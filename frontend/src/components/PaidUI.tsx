import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "../store/paymentStore";

const PaidUI = () => {
  const clearPaymentData = usePaymentStore((state) => state.clearPaymentData);

  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-[#d7eadf] bg-gradient-to-br from-[#f6fff9] to-white p-6 shadow-sm">
      {/* Status */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e8f7ee]">
          <CheckCircle2 size={24} className="text-[#1a7a3c]" />
        </div>

        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1a7a3c]">
            Payment Confirmed
          </p>

          <h2 className="text-[20px] font-bold text-[#1a1a1a] leading-tight mt-1">
            Your order has been placed successfully
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3">
        <p className="text-[14px] leading-relaxed text-[#4f4f4f]">
          We’ve received your payment and your order is now being prepared for
          processing and delivery.
        </p>

        <div className="rounded-2xl bg-[#1a1a1a] px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-[15px] font-semibold">
                Thank you for shopping with Too Clean
              </p>

              <p className="text-[#cfcfcf] text-[12px] mt-1">
                We’ll keep you updated as your order progresses.
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            clearPaymentData();
            navigate("/");
          }}
          className="w-full mt-2 bg-[#1a1a1a] hover:bg-black text-white rounded-2xl py-4 px-5 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 font-semibold text-[14px]"
        >
          Continue Shopping
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PaidUI;
