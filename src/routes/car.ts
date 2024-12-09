import express from "express";
import { createCarController, fetchCarsByUserId } from "../controllers/car";

const router = express.Router();

router.post("/", createCarController);
router.get("/:userId", fetchCarsByUserId);

export default router;
