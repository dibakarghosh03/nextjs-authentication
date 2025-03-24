import { updateUserSession } from "@/auth/core/session";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { cookies } from "next/headers";

export const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  await updateUserSession(user, await cookies());
  return <div>{children}</div>;
};

export default layout;
