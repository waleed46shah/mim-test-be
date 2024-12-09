import express from "express";
import userRoute from "./users";
import authRoute from "./auth";
import carRoute from "./car";

const Route = express.Router();

Route.use("/user", userRoute);
Route.use("/auth", authRoute);
Route.use("/car", carRoute);

export default Route;
