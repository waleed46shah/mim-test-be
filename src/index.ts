import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/connectDB";
import Route from "./routes/index";
import errorMiddleware from "./middleware/error";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ response: "Working v1.0" });
});
app.use(errorMiddleware);
app.use("/api", Route);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
