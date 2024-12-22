import express, { Response } from "express";
import authenticationRouter from "./routes/auth.route";
import habitRouter from "./routes/habit.route";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';


const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};
const app = express();
dotenv.config();
const port = 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authenticationRouter);
app.use("/api/habit", habitRouter);

app.listen(port, () => {
  console.log(`Server is running and listening on port : ${port}`);
});


app.use((err: any, res: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
