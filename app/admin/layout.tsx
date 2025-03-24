import { updateUserSession } from "@/auth/core/session";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (user == null) {
    redirect("/sign-in");
  } else if (user.role !== "admin") {
    redirect("/");
  }
  await updateUserSession(user, await cookies());
  return <div>{children}</div>;
};

export default layout;
