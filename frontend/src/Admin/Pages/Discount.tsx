import { useState } from "react";
import useCreateDiscountCode from "../../api/discountMutation";
import Loader from "../../components/Loader";
import useGetDiscountCodes, {
  type DiscountCode,
} from "../../api/discountQuery";

const Discount = () => {
  const { data } = useGetDiscountCodes();
  const codes: DiscountCode[] = data?.data ?? [];
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  // const amount = parseInt(discountAmount);

  const [name, setName] = useState("");

  const [discountPrice, setDiscountPrice] = useState<number>();

  const createDiscountMutation = useCreateDiscountCode();

  const { isPending, isError, failureReason } = createDiscountMutation;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createDiscountMutation.mutateAsync({
        name,
        discount_price: discountPrice!,
      });

      setName("");
      setDiscountPrice(0);
    } catch (error) {
      console.log(error);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "1.5rem 0",
        minHeight: 420,
      }}
    >
      {/* Left Panel */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: "0 0 280px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#888",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          New discount
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label htmlFor="disc-name" style={{ fontSize: 13, color: "#555" }}>
            Discount name
          </label>
          <input
            id="disc-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Summer Sale"
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "0.5px solid #ccc",
              fontSize: 14,
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label htmlFor="disc-amount" style={{ fontSize: 13, color: "#555" }}>
            Discount Price
          </label>
          <input
            id="disc-amount"
            type="number"
            placeholder="e.g. 20"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(Number(e.target.value))}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: `0.5px solid ${isError ? "#e24b4a" : "#ccc"}`,
              fontSize: 14,
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          {isError && (
            <span style={{ fontSize: 12, color: "#e24b4a" }}>
              {failureReason.message}
            </span>
          )}
        </div>
        <button
          title="submit"
          disabled={isPending}
          className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold py-3 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isPending ? <Loader /> : "⚡ Generate code"}
        </button>
      </form>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          background: "#f7f7f5",
          borderRadius: 12,
          border: "0.5px solid #e0e0e0",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#888",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          Generated codes
        </p>

        {codes.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              color: "#aaa",
              fontSize: 13,
            }}
          >
            <span style={{ fontSize: 28 }}>🏷️</span>
            <span>No codes yet — generate one to get started</span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              overflowY: "auto",
              flex: 1,
            }}
          >
            {codes.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "0.5px solid #e0e0e0",
                  borderRadius: 8,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span style={{ fontSize: 13, color: "#666" }}>{c.name}</span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.code}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: "#eaf3de",
                      color: "#3b6d11",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.discountPrice}
                  </span>
                  <button
                    onClick={() => copyCode(c.code)}
                    style={{
                      background: "none",
                      border: "0.5px solid #ccc",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: 12,
                      cursor: "pointer",
                      color: copiedCode === c.code ? "#3b6d11" : "#555",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      borderColor: copiedCode === c.code ? "#639922" : "#ccc",
                    }}
                  >
                    {copiedCode === c.code ? "✓ Copied" : "⎘ Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discount;
