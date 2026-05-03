import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const triggerFezDelivery = async (order) => {
  if (order.deliveryStatus === "created") return;
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
  }
};
