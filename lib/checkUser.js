import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const email = user.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      console.error("[checkUser] Clerk user has no email address:", user.id);
      return null;
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: name || "User",
        imageUrl: user.imageUrl ?? "",
        email,
      },
    });

    return newUser;
  } catch (error) {
    console.error("[checkUser] Failed to sync user:", error?.message ?? error);
    return null;
  }
};
