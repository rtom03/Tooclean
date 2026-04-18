import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/db.js";

import dotenv from "dotenv";
import {
  changePasswordSchema,
  createAdminSchema,
  loginSchema,
} from "../validators/adminValidator.js";
import createJWT from "../utils/index.js";

const JWT_SECRET = process.env.JWT_SECRET;
// ── CREATE ADMIN ──────────────────────────────────────────
export const createAdmin = async (req, res) => {
  try {
    // 1. Validate body
    const parsed = createAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { name, email, password } = parsed.data;

    // 2. Check if email already exists
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create admin
    const admin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true }, // never return password
    });

    res.status(201).json({ message: "Admin account created", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── LOGIN ─────────────────────────────────────────────────
export const loginAdmin = async (req, res) => {
  try {
    // 1. Validate body
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { email, password } = parsed.data;

    // 2. Find admin
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = createJWT(res, admin.id);
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── CHANGE PASSWORD ───────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    // 1. Validate body
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { currentPassword, newPassword } = parsed.data;
    const adminId = req.admin.adminId; // from auth middleware

    // 2. Find admin
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // 3. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // 4. Prevent reusing same password
    const isSame = await bcrypt.compare(newPassword, admin.password);
    if (isSame) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as current password" });
    }

    // 5. Hash and update
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
