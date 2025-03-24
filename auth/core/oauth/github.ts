import { z } from "zod";
import { OAuthClient } from "./base";

export function createGithubOAuthClient() {
    return new OAuthClient({
        provider: "github",
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        scopes: ["user:email", "read:user"],
        urls: {
            auth: "https://github.com/login/oauth/authorize",
            token: "https://github.com/login/oauth/access_token",
            user: "https://api.github.com/user",
        },
        userInfo: {
            schema: z.object({
                id: z.number(),
                name: z.string().nullable(),
                login: z.string(),
                email: z.string().email().nullable(),
            }),
            parser: user => ({
                id: user.id.toString(),
                email: user.email || "",
                name: user.name ?? user.login,
            }),
        },
    });
}