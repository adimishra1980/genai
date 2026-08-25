import dotenv from "dotenv";
import { app } from "./app.js";
import connectToDB from "./config/database.js";
import { connectToRedis } from "./config/redis.js";

dotenv.config();

Promise.all([connectToDB(), connectToRedis()])
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error during startup:", error);
    process.exit(1);
  });
