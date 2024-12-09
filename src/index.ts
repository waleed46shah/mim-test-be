import dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";
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
app.use("/api", Route);
app.use(errorMiddleware);

// Connect to DB
connectDB();

// Export as serverless function
export const handler = serverless(app);
