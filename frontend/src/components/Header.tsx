import { useState, useRef, useEffect } from "react";
import { ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useProducts } from "../api/productQuery";

const Header = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items } = useCartStore();
  const cartQty = items.map((val) => val.qty);
  const { data } = useProducts();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        // className={`${!mobileOpen ? "bg-[#fbf6f0]" : ""} "sticky top-0 z-50  border-b border-white/8 h-16 flex items-center justify-between px-5 md:px-7"`}
        className={`${!mobileOpen ? "bg-[#fbf6f0] border-b border-white/8" : ""} sticky top-0 z-50  h-16 flex items-center justify-between px-5 md:px-7`}
      >
        {/* ── MOBILE LEFT — Hamburger ── */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X size={22} color="black" />
          ) : (
            <Menu color="black" size={22} />
          )}
        </button>

        {/* ── DESKTOP LEFT — Logo + Nav ── */}
        <div className="hidden md:flex items-center">
          <div className="w-12 h-12  flex items-center justify-center  mr-4 shrink-0">
            <Link to={"/"}>
              <img src="/Tooclean.jpg" alt="logo" />
            </Link>
          </div>
          <nav className="flex items-center">
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center gap-1.5  text-[11px] font-bold tracking-[0.1em] uppercase h-16 px-5 border-x border-white/20 hover:opacity-70 transition-opacity"
              >
                SHOP
                <ChevronDown
                  size={12}
                  color="black"
                  className={`transition-transform duration-200m  ${shopOpen ? "rotate-180" : ""}`}
                />
              </button>
              {shopOpen && (
                <div className="absolute top-16 left-0 border border-t-0 border-white/10 min-w-[180px] py-2 z-50">
                  {data?.products.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="block px-5 py-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#aaa] hover:text-white hover:bg-white/5 transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/founder"
              className="text-black text-[11px] font-bold tracking-[0.1em] uppercase px-5 h-16 flex items-center hover:opacity-70 transition-opacity"
            >
              Too Clean Vision
            </Link>
            <Link
              to="/track-order"
              className="text-black text-[11px] font-bold tracking-[0.1em] uppercase px-5 h-16 flex items-center hover:opacity-70 transition-opacity"
            >
              Track Your Order
            </Link>
          </nav>
        </div>
        {/* ── MOBILE CENTER — Logo ── */}
        {!mobileOpen && (
          <Link to="/" className="md:hidden absolute left-1/2 -translate-x-1/2">
            <div className="w-10 h-10  flex items-center justify-center rounded-sm">
              {/* <Link to={"/"}> */}
              <img src="/Tooclean.jpg" alt="logo" />
              {/* </Link> */}
            </div>
          </Link>
        )}

        {/* ── RIGHT — Region + Cart (shared) ── */}
        {/* <div className="flex items-center gap-2">
          <Link
            to={"/cart"}
            className="hover:opacity-70 transition-opacity md:ml-2"
          >
            <span className="absolute top-1.5 right-5 text-red-600">
              {cartQty}
            </span>
            <ShoppingBag size={22} strokeWidth={1.8} className="relative" />
          </Link>
        </div> */}

        <div className="flex items-center gap-2">
          <Link
            to={"/cart"}
            className="hover:opacity-70 transition-opacity md:ml-2 relative"
          >
            {cartQty && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cartQty}
              </span>
            )}
            <ShoppingBag size={22} strokeWidth={1.8} />
          </Link>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="relative w-72 max-w-[80vw] bg-[#fbf6f0] text-black h-full flex flex-col z-50 overflow-y-auto">
            <div className="px-6 py-8 flex flex-col gap-1">
              {/* Shop with sub-links */}
              <div>
                {/* <button
                  onClick={() => setShopOpen(true)}
                  className="w-full flex items-center justify-between  text-[12px] font-bold tracking-[0.1em] uppercase py-4 border-b border-white/10"
                >
                  SHOP
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {shopOpen && (
                  <div className="flex flex-col pl-4 py-2 gap-1">
                    {shopLinks.map((item) => (
                      <Link
                        key={item}
                        to="#"
                        onClick={() => setMobileOpen(false)}
                        className=" text-[11px] font-semibold tracking-[0.08em] uppercase py-2.5  transition-colors"
                      >
                        {item}
                      </Link>
                    ))} 
                  </div>
                )} */}
              </div>
              <div className="flex flex-col mt-10">
                <Link
                  to="/founder"
                  onClick={() => setMobileOpen(false)}
                  className=" text-[12px] font-bold tracking-[0.1em] uppercase py-4 mt- border-b border-white/10 hover:opacity-70 transition-opacity"
                >
                  Too Clean Vision
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setMobileOpen(false)}
                  className="text-[12px] font-bold tracking-[0.1em] uppercase py-4 border-b border-white/10 hover:opacity-70 transition-opacity"
                >
                  Track Your Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
