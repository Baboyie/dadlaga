import express from "express";
import adminRoutes from "./admin.routes";
import roomRoutes from "./room.routes"; // Байгаа бол

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/rooms", roomRoutes); // Байгаа бол

export default router;
