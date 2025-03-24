

// Session expiration time in seconds
export const SESSION_EXPIRATION = 60 * 60 * 24 * 7;
export const COOKIE_SESSION_KEY = "auth-session-id";

export const STATE_COOKIE_KEY = "oAuthState";
export const STATE_COOKIE_EXPIRATION_SECONDS = 60 * 10;

export const privateRoutes = ["/private"];
export const adminRoutes = ["/admin"];

export type Cookies = {
    set: (
        key: string,
        value: string,
        options: {
            secure?: boolean;
            httpOnly?: boolean;
            sameSite?: "strict" | "lax";
            expires?: number;
        }
    ) => void;
    get: (key: string) => {name: string, value: string} | undefined;
    delete: (key: string) => void;
}