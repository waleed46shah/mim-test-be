import express from "express";
import { createCarController, fetchCarsByUserId } from "../controllers/car";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/", createCarController);
router.get("/:userId", fetchCarsByUserId);

export default router;
