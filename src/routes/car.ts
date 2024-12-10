import express from "express";
import { createCarController, fetchCarsByUserId } from "../controllers/car";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/", verifyToken, createCarController);
router.get("/:userId", verifyToken, fetchCarsByUserId);

export default router;
