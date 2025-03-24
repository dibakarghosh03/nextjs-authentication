import Redis from 'ioredis';

export const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
});

redisClient.on('connect', () => {
    console.log("Redis connected");
});

redisClient.on('error', (error) => {
    console.log("Redis error: ", error);
});