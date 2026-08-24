import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

// middleware to configure json and url
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

// import routes
import authRouter from "./routes/auth.routes.js";

// api routes
app.use("/api/v1/auth", authRouter);

export { app };
