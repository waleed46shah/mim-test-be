import express from "express";
import { update, getUser, deleteUser, getAllUser } from "../controllers/user";

const router = express.Router();

router.get("/", getAllUser);
router.put("/update/:userId", update);
router.get("/:userId", getUser);
router.delete("/delete/:userId", deleteUser);

export default router;
