import { useState } from "react";
import { useRemoveProductImages, useUpdateProduct } from "../api/productQuery";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
};

export type ModalMode = "add" | "edit" | null;
const ProductModal = ({
  mode,
  product,
  onClose,
}: {
  mode: ModalMode;
  product: Product | null;
  onClose: () => void;
}) => {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [files, setFiles] = useState<FileList | null>(null);

  const { mutate: update, isPending } = useUpdateProduct();
  const { mutate: removeImages, isPending: isRemoving } =
    useRemoveProductImages();

  const handleSubmit = () => {
    if (mode === "edit" && product) {
      update(
        {
          id: product.id,
          data: { name, price: parseFloat(price), files },
        },
        {
          onSuccess: () => onClose(),
          onError: (err) => console.error(err.message),
        },
      );
    }
    // add mode — wire createProduct mutation here
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
          <p className="text-[14px] font-bold">
            {mode === "add" ? "New product" : "Edit product"}
          </p>
          <button
            onClick={onClose}
            className="text-[#aaa] hover:text-[#1a1a1a] font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hairline Spray"
              className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
              Price (₦)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="24.99"
              className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>

          <div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
                Images
              </label>
              {/* existing images on edit */}
              {mode === "edit" && product && product?.images?.length > 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-14 h-14 object-contain rounded-lg border border-[#e0e0e0] bg-[#f5f5f5]"
                    />
                  ))}
                </div>
              )}
              {product && product.images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeImages(product.id, {
                      onSuccess: () => onClose(),
                      onError: (err) => console.error(err.message),
                    })
                  }
                  disabled={isRemoving}
                  className="text-[11px] font-bold px-3 py-1.5 bg-[#e24b4a] text-white rounded-md hover:opacity-80 disabled:opacity-50"
                >
                  {isRemoving ? "Removing..." : "Remove extra images"}
                </button>
              )}{" "}
            </div>

            <label className="border-[1.5px] border-dashed border-[#ddd] rounded-lg p-5 text-center hover:border-[#1a1a1a] transition-colors cursor-pointer block">
              <p className="text-[13px] text-[#888]">
                {files
                  ? `${files.length} file(s) selected`
                  : "Click to upload images"}
              </p>
              <p className="text-[11px] text-[#bbb] mt-1">
                PNG, JPG, WEBP — max 5MB each
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e8e8e8] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-[12px] font-bold px-4 py-2 rounded-lg border border-[#ddd] text-[#555] hover:border-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#1a1a1a] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80"
          >
            {isPending ? "Saving..." : mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
