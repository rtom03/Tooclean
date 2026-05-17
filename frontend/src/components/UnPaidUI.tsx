import type { InitializePaymentResponse } from "../constant/index.type";

const UnPaidUI = ({ payment_info }: InitializePaymentResponse) => {
  return (
    <>
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
          {payment_info.bankName}
        </p>
      </div>

      {/* Account Number */}
      <div className="border-b border-[#e8e8e8] pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999] mb-1">
          Account Number
        </p>
        <p className="text-[28px] font-black text-[#1a1a1a] tracking-[0.06em]">
          {payment_info.accountNumber}
        </p>
      </div>

      {/* Account Name */}
      <div className="border-b border-[#e8e8e8] pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999] mb-1">
          Account Name
        </p>
        <p className="text-[20px] font-black text-[#1a1a1a] tracking-tight">
          {payment_info.accountName}
        </p>
      </div>

      {/* Amount */}
      <div className="bg-[#1a1a1a] rounded-xl px-5 py-4 flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white/60">
          Amount to Pay
        </p>
        <p className="text-[28px] font-black text-white tracking-tight">
          ₦{Number(payment_info.amount).toLocaleString("en-NG")}
        </p>
      </div>

      {/* Note */}
      <p className="text-[12px] text-[#888] text-center pt-1">
        Transfer the exact amount to complete your order
      </p>
    </>
  );
};

export default UnPaidUI;
