import { useState } from "react";
import { useProducts } from "../../api/productQuery";
import { NAIRA } from "../../constant/index.type";
import type { ModalMode } from "../../components/ProductModal";
import ProductModal from "../../components/ProductModal";

const Products = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<any>(null);

  const { data, isPending, isError, error } = useProducts();
  if (isPending) return <p>Loading products...</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-black text-[#1a1a1a]">Products</h1>
        <button
          onClick={() => {
            setEditTarget(null);
            setModalMode("add");
          }}
          className="bg-[#1a1a1a] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
        >
          + Add product
        </button>
      </div>

      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#e8e8e8]">
          <p className="text-[13px] font-bold">All products</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#fafafa]">
              {["Image", "Name", "Price", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#888] px-5 py-2.5 border-b border-[#e8e8e8]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]"
              >
                <td className="px-5 py-3">
                  <img
                    src={product.images?.[0] ?? "/placeholder.jpg"}
                    alt={product.name}
                    className="w-9 h-9 object-contain rounded-lg bg-[#f5f0e8]"
                  />
                </td>
                <td className="px-5 py-3 text-[13px] font-semibold">
                  {product.name}
                </td>
                <td className="px-5 py-3 text-[13px]">
                  {NAIRA}
                  {product.price}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditTarget(product);
                        setModalMode("edit");
                      }}
                      className="text-[11px] font-bold px-3 py-1.5 border border-[#ddd] rounded-md hover:border-[#1a1a1a] transition-colors"
                    >
                      Edit
                    </button>
                    <button className="text-[11px] font-bold px-3 py-1.5 bg-[#e24b4a] text-white rounded-md hover:opacity-80">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalMode && (
        <ProductModal
          mode={modalMode}
          product={editTarget}
          onClose={() => {
            setModalMode(null);
            setEditTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
