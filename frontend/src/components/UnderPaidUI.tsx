import type { InitializePaymentResponse } from "../constant/index.type";
import { AlertTriangle, Copy, Check } from "lucide-react";
import { useState } from "react";

const UnderPaidUI = ({ payment_info }: InitializePaymentResponse) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payment_info?.accountNumber || "");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
          <AlertTriangle size={18} className="text-yellow-700" />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-black uppercase tracking-[0.08em] text-yellow-700">
            Partial Payment Received
          </p>

          <p className="text-[12px] text-yellow-900 mt-1 leading-relaxed">
            Your transfer was received, but the full payment has not yet been
            completed.
          </p>
        </div>
      </div>

      {/* Amount Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-yellow-200 bg-white p-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#777] mb-1">
            Amount Paid
          </p>

          <p className="text-[18px] font-black text-[#1a1a1a]">
            ₦{Number(payment_info?.amountPaid || 0).toLocaleString("en-NG")}
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-white p-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#777] mb-1">
            Balance Left
          </p>

          <p className="text-[18px] font-black text-red-600">
            ₦
            {Number(payment_info?.balanceRemaining || 0).toLocaleString(
              "en-NG",
            )}
          </p>
        </div>
      </div>

      {/* Account Info */}
      <div className="rounded-xl border border-[#ececec] bg-white p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#777]">
          Complete Transfer To
        </p>

        <p className="text-[14px] font-semibold text-[#1a1a1a]">
          {payment_info?.accountName}
        </p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[16px] font-black tracking-wide text-[#1a1a1a]">
            {payment_info?.accountNumber}
          </p>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-[#e5e5e5] px-2.5 py-1.5 text-[11px] font-semibold text-[#1a1a1a] hover:bg-[#f7f7f7] transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-[#1a1a1a] px-4 py-3">
        <p className="text-white text-[13px] font-semibold leading-relaxed">
          Complete the remaining balance to begin processing your order.
        </p>
      </div>
    </div>
  );
};

export default UnderPaidUI;
