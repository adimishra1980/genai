import express from "express";

const app = express();

// middleware to configure json and url
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// import routes
import authRouter from "./routes/auth.routes.js";

// api routes
app.use("/api/v1/auth", authRouter);

export { app };
