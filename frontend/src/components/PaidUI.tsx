const PaidUI = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#1a7a3c]" />
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#1a7a3c]">
          Payment Confirmed
        </p>
      </div>

      <p className="text-[15px] font-semibold text-[#1a1a1a]">
        Your payment has been received successfully.
      </p>

      <p className="text-[13px] text-[#666]">
        Your order is now being processed.
      </p>
    </>
  );
};

export default PaidUI;
