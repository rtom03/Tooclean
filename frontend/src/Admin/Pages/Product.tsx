import { useState } from "react";

const Products = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-black text-[#1a1a1a]">Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#1a1a1a] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
        >
          + Add product
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#e8e8e8] rounded-xl mb-5 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#e8e8e8]">
            <p className="text-[13px] font-bold">New product</p>
          </div>
          <div className="grid grid-cols-2 gap-4 p-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
                Product name
              </label>
              <input
                type="text"
                placeholder="e.g. Hairline Spray"
                className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                placeholder="24.99"
                className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
                Description
              </label>
              <textarea
                placeholder="Product description..."
                rows={3}
                className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors resize-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
                Images
              </label>
              <div className="border-[1.5px] border-dashed border-[#ddd] rounded-lg p-6 text-center hover:border-[#1a1a1a] transition-colors cursor-pointer">
                <p className="text-[13px] text-[#888]">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-[#bbb] mt-1">
                  PNG, JPG, WEBP — max 5MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="px-5 py-3.5 border-t border-[#e8e8e8] flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="text-[12px] font-bold px-4 py-2 rounded-lg border border-[#ddd] text-[#555] hover:border-[#1a1a1a] transition-colors"
            >
              Cancel
            </button>
            <button className="bg-[#1a1a1a] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80">
              Save product
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#e8e8e8]">
          <p className="text-[13px] font-bold">All products</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#fafafa]">
              {["Image", "Name", "Price", "Created", "Actions"].map((h) => (
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
            {["Hairline Spray — Black", "Hairline Spray — Brown"].map(
              (name) => (
                <tr
                  key={name}
                  className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]"
                >
                  <td className="px-5 py-3">
                    <div className="w-9 h-9 bg-[#f5f0e8] rounded-lg" />
                  </td>
                  <td className="px-5 py-3 text-[13px] font-semibold">
                    {name}
                  </td>
                  <td className="px-5 py-3 text-[13px]">$24.99</td>
                  <td className="px-5 py-3 text-[13px] text-[#888]">
                    Apr 10, 2026
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="text-[11px] font-bold px-3 py-1.5 border border-[#ddd] rounded-md hover:border-[#1a1a1a] transition-colors">
                        Edit
                      </button>
                      <button className="text-[11px] font-bold px-3 py-1.5 bg-[#e24b4a] text-white rounded-md hover:opacity-80">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
