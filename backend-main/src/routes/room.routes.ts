import express from "express";
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/", getRooms);

router.post("/", authenticate, createRoom);
router.put("/edit", authenticate, updateRoom);
router.delete("/delete", authenticate, deleteRoom);

export default router;
