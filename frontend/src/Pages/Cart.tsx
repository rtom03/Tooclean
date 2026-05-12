import { Loader2, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useCreateOrder } from "../api/orderQuery";
import { useNavigate } from "react-router-dom";
import { calculateSubtotal } from "../constant";

export default function CartBody() {
  const {
    // incrementQty, decrementQty,
    items,
    removeFromCart,
    totalPrice,
  } = useCartStore();
  const { isPending: isCreatingOrder, mutateAsync } = useCreateOrder();
  const formatPrice = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    try {
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
              {formatPrice(
                calculateSubtotal(item.price, item.qty).subtotal,
              )}{" "}
            </p>
          </div>
        ))
      )}

      {/* Summary */}
      <div className="mt-4">
        <div className="flex justify-between items-center py-3">
          <span className="font-semibold">Estimated total</span>
          <span className="font-semibold text-base">
            {formatPrice(totalPrice())}
          </span>
        </div>
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
