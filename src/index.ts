import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/connectDB";
import Route from "./routes/index";
import errorMiddleware from "./middleware/error";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ response: "Working v1.0" });
});
app.use(errorMiddleware);
app.use("/api", Route);

// Connect to DB when the app initializes
connectDB();

// Export the app for Vercel
export default app;
