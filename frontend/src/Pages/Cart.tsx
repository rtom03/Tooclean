// Cart.tsx
import { Loader2, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useCreateOrder } from "../api/orderQuery";
import { useNavigate } from "react-router-dom";
import { calculateSubtotal } from "../constant";
import { usePaymentStore } from "../store/paymentStore";
import { useEffect, useMemo } from "react";
import { useProducts } from "../api/productQuery";

type Availability = "ok" | "removed" | "inactive";
const getAvailability = (
  item: { id: string | number },
  products?: { id: string | number; isActive: boolean }[],
): { status: Availability } => {
  const product = products?.find((p) => p.id === item.id);
  if (!product) return { status: "removed" }; // not in catalog anymore
  if (!product.isActive) return { status: "inactive" }; // sold out / disabled
  return { status: "ok" };
};

export default function CartBody() {
  const {
    // incrementQty, decrementQty,
    items,
    removeFromCart,
    // totalPrice,
  } = useCartStore();
  const { paymentData } = usePaymentStore();
  const clearPaymentData = usePaymentStore((state) => state.clearPaymentData);

  const { isPending: isCreatingOrder, mutateAsync } = useCreateOrder();
  const { data: existingProducts, refetch } = useProducts();

  const formatPrice = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
  const navigate = useNavigate();
  const itemStatuses = useMemo(
    () =>
      items.map((item) => ({
        item,
        ...getAvailability(item, existingProducts?.products),
      })),
    [items, existingProducts],
  );

  const problemItems = itemStatuses.filter((i) => i.status !== "ok");
  const hasProblems = problemItems.length > 0;

  const handleRemoveUnavailable = () => {
    problemItems.forEach(({ item, status }) => {
      if (status !== "ok") {
        // setQty(item.id, available);  // clamp to what's left
        removeFromCart(item.id); // or just remove if you have no setQty
      } else {
        removeFromCart(item.id);
      }
    });
  };
  useEffect(() => {
    const isCartEmpty = items.length === 0;

    const isPaid = paymentData?.payment_info?.paymentStatus === "paid";

    // preserve paid success screen
    if (isCartEmpty && !isPaid) {
      clearPaymentData();
    }
  }, [items, paymentData, clearPaymentData]);

  const handleBuyNow = async () => {
    try {
      const { data: freshProducts } = await refetch();
      const list = freshProducts?.products;

      if (list) {
        const stillBad = items.some(
          (item) => getAvailability(item, list).status !== "ok",
        );
        if (stillBad) return; // banner will show
      }

      if (paymentData) {
        navigate(`/checkout/${paymentData.payment_info.orderDetails}`);
        return; // <-- was missing
      }
      const orderItems = items.map((item) => ({
        productId: item.id,
        qty: item.qty,
      }));

      const res = await mutateAsync({
        items: orderItems,
      });

      navigate(`/checkout/${res.orderId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-4 py-5 font-sans">
      {hasProblems && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">
            Some items in your cart are no longer available.
          </p>
          <button onClick={handleRemoveUnavailable} className="mt-2 underline">
            Remove unavailable items
          </button>
        </div>
      )}
      {/* Cart heading */}
      <div className="flex items-center justify-between mt-6 mb-5">
        <h1 className="text-3xl font-bold">Your cart</h1>
        <a href="/" className="text-sm underline">
          Continue shopping
        </a>
      </div>

      {/* Column labels */}
      <div className="flex justify-between text-xs uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-200">
        <span>Product</span>
        <span>Total</span>
      </div>

      {/* Cart items */}
      {items.length === 0 ? (
        <p className="py-6 text-sm text-gray-400">Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 py-5 border-b border-gray-200"
          >
            {/* Product image */}
            <div className="w-22 h-24 bg-[#f0f0e8] rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-sm font-semibold leading-snug">{item.name}</p>
              <p className="text-sm text-gray-400 mt-1 mb-3">
                {formatPrice(item.price)}
              </p>

              <div className="flex items-center gap-3">
                {/* Qty control */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  {/* <button
                    className="w-9 h-9 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                    onClick={() => decrementQty(item.id)}
                  >
                    −
                  </button> */}
                  <span className="w-9 h-9 flex items-center justify-center text-sm font-medium border-x border-gray-200">
                    {item.qty}
                  </span>
                  {/* <button
                    className="w-9 h-9 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                    onClick={() => incrementQty(item.id)}
                  >
                    +
                  </button> */}
                </div>

                {/* Remove */}
                <button
                  className="p-2 text-gray-400 hover:text-black transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Line total */}
            <p className="text-sm font-semibold">
              {formatPrice(calculateSubtotal(item.price, item.qty).subtotal)}
            </p>
          </div>
        ))
      )}

      {/* Summary */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-4">
          Taxes, discounts and{" "}
          <span className="underline cursor-pointer">shipping</span> calculated
          at checkout.
        </p>
        <button
          onClick={handleBuyNow}
          className="w-full bg-[#453224] text-white text-[14px] font-extrabold tracking-[0.05em] uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98] flex items-center justify-center"
        >
          {isCreatingOrder ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Buy Now"
          )}
        </button>
      </div>
    </div>
  );
}
