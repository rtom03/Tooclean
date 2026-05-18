import type { InitializePaymentResponse } from "../constant/index.type";
import CheckOutNote from "./CheckOutNote";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const UnPaidUI = ({ payment_info }: InitializePaymentResponse) => {
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#1a7a3c] animate-pulse" />

        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#1a7a3c]">
          Awaiting Transfer
        </p>
      </div>

      {/* Transfer Card */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden">
        {/* Bank */}
        <div className="px-4 py-3 border-b border-[#f1f1f1]">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#8b8b8b] mb-1">
            Bank
          </p>

          <p className="text-[17px] font-black text-[#1a1a1a] leading-tight">
            {payment_info.bankName}
          </p>
        </div>

        {/* Account */}
        <div className="px-4 py-3 border-b border-[#f1f1f1]">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#8b8b8b] mb-2">
            Account Number
          </p>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[22px] font-black tracking-[0.08em] text-[#1a1a1a]">
              {payment_info.accountNumber}
            </p>

            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1.5 rounded-lg border border-[#e5e5e5] px-2.5 py-1.5 text-[11px] font-semibold text-[#1a1a1a] hover:bg-[#f7f7f7] transition-colors"
            >
              {copied ? (
                <>
                  <Check size={13} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Account Name */}
        <div className="px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#8b8b8b] mb-1">
            Account Name
          </p>

          <p className="text-[15px] font-bold text-[#1a1a1a]">
            {payment_info.accountName}
          </p>
        </div>
      </div>

      {/* Amount */}
      <div className="rounded-2xl bg-[#1a1a1a] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/50 mb-1">
            Amount To Pay
          </p>

          <p className="text-[24px] font-black text-white tracking-tight">
            ₦{Number(payment_info.amount).toLocaleString("en-NG")}
          </p>
        </div>
      </div>

      {/* Note */}
      <CheckOutNote />
    </div>
  );
};

export default UnPaidUI;
