import express from "express";
import userRoute from "./users";
import authRoute from "./auth";

const Route = express.Router();

Route.use("/user", userRoute);
Route.use("/auth", authRoute);

export default Route;
