"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, message: "Unauthorized" };
    }

    const userExists = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    if (userExists) {
      return { status: 200, message: "User authenticated successfully", user: userExists };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) {
      return { status: 200, message: "User authenticated successfully", user: newUser };
    }

    return { status: 400, message: "User not authenticated" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const notifications = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0) {
      return { status: 200, message: "Notifications found", data: notifications };
    }

    return { status: 404, message: "Notifications not found" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};
