"use server";

import { z } from "zod";
import { signInSchema, signUpSchema } from "./schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { OAuthProvider, UserTable } from "@/drizzle/schema";
import { comparePassword, generateSalt, hashPassword } from "../core/passwordHasher";
import { redirect } from "next/navigation";
import { createUserSession, removeUserFromSession } from "../core/session";
import { cookies } from "next/headers";
import { getOAuthClient, OAuthClient } from "../core/oauth/base";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
    const { success, data } = signInSchema.safeParse(unsafeData);

    if(!success) return "Unable to sign in";

    const user = await db.query.UserTable.findFirst({
        columns: { password: true, salt: true, id: true, email: true, role: true },
        where: eq(UserTable.email, data.email),
    });

    if(user == null || user.password == null || user.salt == null) return "User not found";

    const isPasswordCorrect = await comparePassword({
        password: data.password,
        salt: user.salt,
        hash: user.password,
    });

    if(!isPasswordCorrect) return "Incorrect password";

    await createUserSession(user, await cookies());

    redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
    const { success, data } = signUpSchema.safeParse(unsafeData);

    if(!success) return "Unable to create user";

    const existingUser = await db.query.UserTable.findFirst({
        where: eq(UserTable.email, data.email),
    });

    if(existingUser) return "User already exists";

    try {
        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password, salt);
    
        const [user] = await db
            .insert(UserTable)
            .values({
                name: data.name,
                email: data.email,
                password: hashedPassword,
                salt: salt,
            })
            .returning({
                id: UserTable.id,
                role: UserTable.role,
            });
        
        if(user == null || user == undefined) return "User not created";
        createUserSession(user, await cookies());
    } catch (error) {
        return "Something went wrong while creating user";
    }

    redirect("/")
}

export async function logOut() {
    await removeUserFromSession(await cookies());
    redirect("/");
}

export async function oAuthSignIn(provider: OAuthProvider) {
    const oAuthClient = getOAuthClient(provider);
    redirect(oAuthClient.createAuthUrl(await cookies()));
}