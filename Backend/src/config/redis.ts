import { Redis } from "ioredis";

const redisClient = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

const connectToRedis = async (): Promise<void> => {
  try {
    redisClient.on("connect", () => {
      console.log("Redis connected successfully");
    });

    redisClient.on("error", (error: Error) => {
      console.log("Redis connection error:", error.message);
    });

    await redisClient.ping();
  } catch (error: unknown) {
    console.log("Error connecting to Redis:", error);
    process.exit(1);
  }
};

export { redisClient, connectToRedis };
