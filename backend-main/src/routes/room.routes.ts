import express from "express";
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  getRoomById,
} from "../controllers/room.controller";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/", authenticate, createRoom);
router.put("/:id", authenticate, updateRoom);
router.delete("/:id", authenticate, deleteRoom);

export default router;
