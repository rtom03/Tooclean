import type { InitializePaymentResponse } from "../constant/index.type";
import { AlertTriangle } from "lucide-react";

const UnderPaidUI = ({ payment_info }: InitializePaymentResponse) => {
  return (
    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
          <AlertTriangle size={20} className="text-yellow-700" />
        </div>

        <div>
          <p className="text-[20px] font-black uppercase tracking-[0.08em] text-yellow-700">
            Partial Payment Received
          </p>

          <p className="text-sm text-yellow-800 mt-1 leading-relaxed">
            We received part of your transfer, but your order is still awaiting
            full payment confirmation.
          </p>
        </div>
      </div>

      {/* Amount Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-yellow-200 bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#777] mb-1">
            Amount Paid
          </p>

          <p className="text-[24px] font-black text-[#1a1a1a]">
            ₦{payment_info.amountPaid.toLocaleString("en-NG")}
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#777] mb-1">
            Remaining Balance
          </p>

          <p className="text-[24px] font-black text-red-600">
            ₦{payment_info.balanceRemaining.toLocaleString("en-NG")}
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl bg-[#1a1a1a] px-5 py-5">
        <p className="text-white text-[18px] font-bold tracking-tight">
          Kindly complete your remaining payment to begin processing your order.
        </p>

        <p className="text-white/70 text-sm mt-2">
          Once the outstanding balance is received, your order will
          automatically move into processing.
        </p>
      </div>
    </div>
  );
};

export default UnderPaidUI;
