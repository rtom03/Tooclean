import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "color is required"),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.coerce.number().positive().optional(),
  description: z.string().min(1).optional(),
  color: z.string().min(1, "color is required"),
});
