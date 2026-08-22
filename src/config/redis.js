import Redis from "ioredis";

let redisClient;

const connectToRedis = async () => {
  try {
    redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

    redisClient.on("connect", () => {
      console.log("Redis connected successfully");
    });

    redisClient.on("error", (error) => {
      console.log("Redis connection error:", error.message);
    });

    // test the connection
    await redisClient.ping();
  } catch (error) {
    console.log("Error connecting to Redis:", error);
    process.exit(1);
  }
};

export { redisClient, connectToRedis };
