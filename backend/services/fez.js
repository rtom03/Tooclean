import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const triggerFezDelivery = async (order) => {
  if (order.deliveryStatus && order.deliveryStatus !== "not_created") {
    console.log("⚠️ Delivery already handled, skipping");
    return;
  }
  console.log("📦 triggerFezDelivery called:", order.id);
  try {
    const payload = {
      recipientName: order.customerName,
      recipientEmail: order.email,
      recipientPhone: order.phone,
      recipientAddress: order.address,
      recipientState: order.state,
      orderNo: order.orderNumber,
    };

    const response = await axios.post(
      "https://apisandbox.fezdelivery.co/v1/order",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FEZ_TOKEN}`,
        },
      },
    );

    console.log("🚚 Fez delivery created:", response.data);

    // optionally store tracking info
    await prisma.payment_Info.update({
      where: { id: order.id },
      data: {
        deliveryStatus: "created",
        fezTrackingId: response.data.data?.orderId,
      },
    });
  } catch (error) {
    console.error(
      "❌ Fez delivery failed:",
      error.response?.data || error.message,
    );
    console.error("❌ Fez delivery failed:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
  }
};
