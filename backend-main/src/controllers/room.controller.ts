import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../database";
import { z } from "zod";

// Validation schema
const roomSchema = z.object({
  title: z.object({
    en: z.string(),
    mon: z.string(),
  }),
  description: z.object({
    en: z.string(),
    mon: z.string(),
  }),
  price: z.number().positive(),
  guest: z.number().int().positive(),
  bed: z.number().int().positive(),
  image: z.string(),
  items: z.object({
    tv: z.boolean(),
    phone: z.boolean(),
    wifi: z.boolean(),
    minibar: z.boolean(),
    fridge: z.boolean(),
    shower: z.boolean(),
    microwave: z.boolean(),
    hairdryer: z.boolean(),
    service: z.boolean(),
    tools: z.boolean(),
    tea: z.boolean(),
  }),
});

// Create Room (with fixes)
export const createRoom = async (req: Request, res: Response) => {
  try {
    const validatedData = roomSchema.parse(req.body);

    const room = await prisma.room.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        guest: validatedData.guest,
        bed: validatedData.bed,
        image: validatedData.image,
        items: {
          create: validatedData.items,
        },
      },
      include: { items: true },
    });

    res.status(201).json(room);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
    console.error("Database error:", err);
    res.status(500).json({ message: "Failed to create room" });
  }
};

// Get All Rooms (unchanged)
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await prisma.room.findMany({
      include: { items: true },
    });
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

// Get Room by ID (unchanged)
export const getRoomById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const room = await prisma.room.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    console.error("Error fetching room:", err);
    res.status(500).json({ message: "Failed to fetch room" });
  }
};

// Update Room (with validation)
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const validatedData = roomSchema.partial().parse(req.body);

    // Update room
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        guest: validatedData.guest,
        bed: validatedData.bed,
        image: validatedData.image,
      },
    });

    // Update items if provided
    if (validatedData.items) {
      await prisma.items.update({
        where: { roomId: id },
        data: validatedData.items,
      });
    }

    const finalRoom = await prisma.room.findUnique({
      where: { id },
      include: { items: true },
    });

    res.json(finalRoom);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
    console.error("Error updating room:", err);
    res.status(500).json({ message: "Failed to update room" });
  }
};

// Delete Room (unchanged)
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.items.deleteMany({ where: { roomId: id } });
    await prisma.room.delete({ where: { id } });

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("Error deleting room:", err);
    res.status(500).json({ message: "Failed to delete room" });
  }
};
