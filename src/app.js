import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// middleware to configure json and url
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import routes
import authRouter from "./routes/auth.routes.js";

// api routes
app.use("/api/v1/auth", authRouter);

export { app };
