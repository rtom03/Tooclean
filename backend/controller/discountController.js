import { prisma } from "../utils/db.js";
import { generateDiscountCode } from "../utils/utils.js";

export const discountCode = async (req, res) => {
  const { name, discount_price } = req.body;
  const code = generateDiscountCode(name);

  try {
    const response = await prisma.discountCode.create({
      data: {
        name,
        code,
        discount_price,
      },
    });

    res.status(200).json({ message: "Order status updated", response });
  } catch (error) {
    console.log(error);
  }
};

export const updateDiscountCode = async (req, res) => {
  const { id } = req.params;

  const { name, discount_price, isActive } = req.body;

  try {
    // optional: regenerate code if name changes
    let updateData = {
      discount_price,
      isActive,
    };

    if (name) {
      updateData.name = name;
      updateData.code = generateDiscountCode(name);
    }

    const response = await prisma.discountCode.update({
      where: {
        id,
      },
      data: updateData,
    });

    res.status(200).json({
      message: "Discount code updated successfully",
      response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update discount code",
    });
  }
};

export const deleteDiscountCode = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.discountCode.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Discount code deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete discount code",
    });
  }
};

export const getAllDiscountCodes = async (req, res) => {
  try {
    const response = await prisma.discountCode.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: response.length,
      data: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch discount codes",
    });
  }
};

export const getDiscountCode = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.discountCode.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Discount code not found",
      });
    }

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch discount code",
    });
  }
};
