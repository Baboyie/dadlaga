import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../database";


// Create
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { title,image, description, price, guest, bed, items } = req.body;
    console.log(req.body); // Controller дээр шалгаж үз

    const room = await prisma.room.create({
      data: {
        title,
        image,
        description,
        price,
        guest,
        bed,
        items: {
          create: items
        }
      },
      include: { items: true }
    });

    res.status(201).json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create room", error: err });
  }
};


export const getRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany({ include: { items: true } });
  res.json(rooms);
};
 

export const updateRoom = async (req: Request, res: Response) => {
    const { id, title,image, description, price, guest, bed, items } = req.body;
  
    try {
      // Эхлээд room update
      const updatedRoom = await prisma.room.update({
        where: { id: Number(id) },
        data: {
          title,
          image,
          description,
          price,
          guest,
          bed
        }
      });
  
      // Items update
      await prisma.items.updateMany({
        where: { roomId: Number(id) },
        data: items
      });
  
      const finalRoom = await prisma.room.findUnique({
        where: { id: Number(id) },
        include: { items: true }
      });
  
      res.json({ message: "Room updated", room: finalRoom });
    } catch (err) {
      res.status(500).json({ message: "Failed to update room", error: err });
    }
  };

  export const deleteRoom = async (req: Request, res: Response) => {
    const { id } = req.body;
  
    try {
      await prisma.items.deleteMany({ where: { roomId: Number(id) } });
      await prisma.room.delete({ where: { id: Number(id) } });
  
      res.json({ message: "Room deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete room", error: err });
    }
  };
  
  
