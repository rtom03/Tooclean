import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useVerifyPayment } from "../api/paymentQuery";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const reference = searchParams.get("reference");

  const clearCart = useCartStore((state) => state.clearCart);

  const { data, isLoading, error } = useVerifyPayment(reference);

  const paymentStatus = data?.data?.status;

  // ---------------------------------------------------
  // CLEAR STATES WHEN PAID
  // ---------------------------------------------------

  useEffect(() => {
    if (paymentStatus === "success") {
      clearCart();

      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [paymentStatus, clearCart, navigate]);

  // ---------------------------------------------------
  // LOADING
  // ---------------------------------------------------

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-black" />

          <div className="text-center">
            <h2 className="text-xl font-semibold text-black">
              Verifying Payment
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Please wait while we confirm your payment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------
  // ERROR
  // ---------------------------------------------------

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full border border-red-100 rounded-3xl p-8 bg-white text-center">
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-black">Verification Failed</h2>

          <p className="text-sm text-gray-500 mt-2">
            We could not verify your payment right now.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-black text-white py-3 rounded-xl text-sm font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------
  // SUCCESS
  // ---------------------------------------------------

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#fafafa]">
        <div className="max-w-md w-full bg-white border border-[#ececec] rounded-3xl p-8 text-center shadow-sm">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-5" />

          <h1 className="text-3xl font-bold text-black">Payment Successful</h1>

          <p className="text-sm text-gray-500 mt-3">
            Your payment has been confirmed successfully.
          </p>

          <div className="mt-6 bg-[#f7f7f7] rounded-2xl p-5 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>

              <span className="font-semibold text-black">
                ₦{data?.data?.amount?.toLocaleString("en-NG")}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>

              <span className="font-medium text-black">
                {data?.data?.customer?.email}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference</span>

              <span className="font-medium text-black">
                {data?.data?.reference}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Redirecting you back home...
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------
  // PENDING / FAILED
  // ---------------------------------------------------

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-yellow-100 rounded-3xl p-8 bg-white text-center">
        <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-black">Payment Processing</h2>

        <p className="text-sm text-gray-500 mt-2">
          Your transfer is still being confirmed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl text-sm font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
