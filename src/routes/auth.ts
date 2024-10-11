import express from "express";
import { register, login, logout, refetch } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refetch", refetch);

export default router;
