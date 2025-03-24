import { z } from "zod";
import crypto from 'crypto';
import { redisClient } from "@/redis/redis";
import { SESSION_EXPIRATION, COOKIE_SESSION_KEY, Cookies } from "@/constants";
import { sessionSchema } from "../nextjs/schema";


type UserSession = z.infer<typeof sessionSchema>;


export async function createUserSession(user: UserSession, cookies: Pick<Cookies, "set">) {
    const sessionId = crypto.randomBytes(512).toString('hex').normalize();
    await redisClient.set(
        `session:${sessionId}`, 
        JSON.stringify(sessionSchema.parse(user)), 
        "EX", SESSION_EXPIRATION
    );

    setCookie(sessionId, cookies);
}

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    if (!sessionId) return null;

    return await getUserSessionById(sessionId);
}

export async function updateUserSession(user: UserSession, cookies: Pick<Cookies, "get">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    if (!sessionId) return null;

    await redisClient.set(`session:${sessionId}`, JSON.stringify(sessionSchema.parse(user)), "EX", SESSION_EXPIRATION);
}

export async function removeUserFromSession(cookies: Pick<Cookies, "get" | "delete">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    if(!sessionId) return null;

    await redisClient.del(`session:${sessionId}`);
    cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
    cookies.set(COOKIE_SESSION_KEY, sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        expires: Date.now() + SESSION_EXPIRATION * 1000,
    })
}

async function getUserSessionById(sessionId: string) {
    const rawUser = await redisClient.get(`session:${sessionId}`);
    console.log("Raw user: ", rawUser);
    if (!rawUser) return null;

    const { success, data: user } = sessionSchema.safeParse(JSON.parse(rawUser));

    if(!success) {
        console.error("Invalid session data: ", rawUser);
        return null;
    }

    return user;
}