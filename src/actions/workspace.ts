"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403, message: "User not found" };
    }

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkId: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });

    if (!isUserInWorkspace) {
      return {
        status: 403,
        message: "User does not have access to workspace",
        data: {
          workspace: null,
        },
      };
    }

    return {
      status: 200,
      message: "User has access to workspace",
      data: {
        workspace: isUserInWorkspace,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
      data: {
        workspace: null,
      },
    };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length) {
      return {
        status: 200,
        message: "Folders found",
        data: isFolders,
      };
    }

    return {
      status: 404,
      message: "Folders not found",
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const videos = await client.video.findMany({
      where: {
        OR: [
          {
            workSpaceId,
          },
          {
            folderId: workSpaceId,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return {
        status: 200,
        message: "Videos found",
        data: videos,
      };
    }

    return {
      status: 404,
      message: "Videos not found",
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const getWorkspaces = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const workspaces = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return {
        status: 200,
        message: "Workspaces found",
        data: workspaces,
      };
    }

    return {
      status: 404,
      message: "Workspaces not found",
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    const users = await client.user.findMany({
      where: {
        OR: [{ firstName: { contains: query } }, { lastName: { contains: query } }, { email: { contains: query } }],
        NOT: [{ clerkId: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstName: true,
        lastName: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0) {
      return {
        status: 200,
        message: "Users found",
        data: users,
      };
    }

    return {
      status: 404,
      message: "Users not found",
      data: null,
    };
  } catch (error) {
    console.error("Error searching for users:", error);
    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};
