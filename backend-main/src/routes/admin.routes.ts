import express from "express";
import {
  registerAdmin,
  loginAdmin,
  updateAdmin,
} from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.put("/edit", authenticate, updateAdmin);

export default router;
