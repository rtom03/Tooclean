const UnderPaidUI = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <p className="text-[20px] font-bold uppercase tracking-[0.1em] text-yellow-600">
          Underpaid
        </p>
      </div>

      <p className="text-sm text-[#555]">
        We received a partial transfer for this order.
      </p>

      <div className="bg-[#1a1a1a] rounded-xl px-5 py-4">
        <div className="flex justify-between text-white">
          <span className="text-8xl">Kindly Complete ur payment</span>
        </div>
      </div>
    </>
  );
};

export default UnderPaidUI;
