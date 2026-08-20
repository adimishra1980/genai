import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectToDB from "./src/config/database.js";

dotenv.config();

connectToDB()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });
