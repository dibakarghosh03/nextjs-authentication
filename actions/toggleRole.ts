"use server";

import { updateUserSession } from "@/auth/core/session";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function toggleRole() {
    const user = await getCurrentUser({ redirectIfNotFound: true });

    const [updatedUser] = await db
        .update(UserTable)
        .set({ role: user.role === "admin" ? "user" : "admin" })
        .where(eq(UserTable.id, user.id))
        .returning({ id: UserTable.id, role: UserTable.role });

    await updateUserSession(updatedUser, await cookies());

    return updatedUser.role;
}