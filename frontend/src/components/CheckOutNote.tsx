import { Lock } from "lucide-react";

const CheckOutNote = () => {
  return (
    <div>
      <button
        className="
          w-full
          rounded-2xl
          border border-amber-200
          bg-gradient-to-br from-amber-50 to-white
          px-5 py-4
          text-left
          shadow-sm
          transition-all
          duration-200
          hover:shadow-md
          hover:border-amber-300
          active:scale-[0.99]
        "
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Lock className="h-5 w-5 text-amber-700" />
          </div>

          <div className="flex-1">
            <p className="text-[15px] font-bold text-[#1a1a1a]">
              Complete Your Pending Order
            </p>

            <p className="mt-1 text-[13px] leading-relaxed text-[#666]">
              You already have a pending payment waiting for confirmation.
              Continue that order or go to cart to consolidate everything into
              one checkout.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-amber-100
                  px-2.5 py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-amber-800
                "
              >
                Pending Payment
              </span>

              <span className="text-[12px] text-[#888]">Tap to continue</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default CheckOutNote;
