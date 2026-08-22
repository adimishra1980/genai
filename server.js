import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectToDB from "./src/config/database.js";
import { connectToRedis } from "./src/config/redis.js";

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
