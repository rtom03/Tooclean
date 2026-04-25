import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidator.js";
import { prisma } from "../utils/db.js";
import cloudinary from "../utils/cloudinary.js";

// ── CREATE PRODUCT ─────────────────────────────────────────
export const createProduct = async (req, res) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    // multer-cloudinary already uploaded the files and gives back urls
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const imageUrls = files.map((file) => file.path); // cloudinary url

    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        images: imageUrls,
        qty: 1,
      },
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── GET ALL PRODUCTS ───────────────────────────────────────
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── GET SINGLE PRODUCT ─────────────────────────────────────
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── UPDATE PRODUCT ─────────────────────────────────────────
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    // check product exists
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    let imageUrls;

    // if new images uploaded, delete old ones from cloudinary then use new ones
    const files = req.files;
    if (files && files.length > 0) {
      // delete old images from cloudinary
      if (existing.images.length > 0) {
        await Promise.all(
          existing.images.map((url) => {
            // extract public_id from url
            const parts = url.split("/");
            const filename = parts[parts.length - 1].split(".")[0];
            const publicId = `tooclean/products/${filename}`;
            return cloudinary.uploader.destroy(publicId);
          }),
        );
      }
      imageUrls = files.map((file) => file.path);
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...parsed.data,
        ...(imageUrls && { images: imageUrls }),
      },
    });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── DELETE PRODUCT ─────────────────────────────────────────
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    // delete images from cloudinary first
    if (existing.images.length > 0) {
      await Promise.all(
        existing.images.map((url) => {
          const parts = url.split("/");
          const filename = parts[parts.length - 1].split(".")[0];
          const publicId = `tooclean/products/${filename}`;
          return cloudinary.uploader.destroy(publicId);
        }),
      );
    }

    await prisma.product.delete({ where: { id } });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── ADD IMAGES TO EXISTING PRODUCT ────────────────────────
export const addProductImages = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    const newImageUrls = files.map((file) => file.path);

    // append to existing images
    const product = await prisma.product.update({
      where: { id },
      data: {
        images: [...existing.images, ...newImageUrls],
      },
    });

    res.status(200).json({ message: "Images added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── REMOVE SINGLE IMAGE FROM PRODUCT ──────────────────────
export const removeProductImage = async (req) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!existing.images.includes(imageUrl)) {
      return res.status(404).json({ error: "Image not found on this product" });
    }

    // must keep at least one image
    if (existing.images.length === 1) {
      return res
        .status(400)
        .json({ error: "Product must have at least one image" });
    }

    // delete from cloudinary
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1].split(".")[0];
    const publicId = `tooclean/products/${filename}`;
    await cloudinary.uploader.destroy(publicId);

    // remove from array
    const updatedImages = existing.images.filter((img) => img !== imageUrl);
    const product = await prisma.product.update({
      where: { id },
      data: { images: updatedImages },
    });

    res.status(200).json({ message: "Image removed", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
