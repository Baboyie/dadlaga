import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Admin бүртгүүлэх
export const registerAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) return res.status(400).json({ message: "Admin already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword
    }
  });

  res.status(201).json({ message: "Admin created", admin: { id: admin.id, username: admin.username } });
};

// Login хийх
export const loginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  res.json({ token, admin: { id: admin.id, username: admin.username } });
};



// Admin update
export const updateAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
    
  const hashedPassword = await bcrypt.hash(password, 10);
  const updated = await prisma.admin.update({
    where: { username },
    data: { password: hashedPassword }
  });

  res.json({ message: "Admin updated", updated });
};

