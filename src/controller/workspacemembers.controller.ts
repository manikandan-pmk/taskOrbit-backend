import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import prismaClient from "../config/prisma.js";
import crypto from "crypto";
import transport from "../utils/email.js";
import workSpaceTemplate from "../utils/Template/inviteTemplate.js";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const workspaceInvite = async (req: AuthRequest, res: Response) => {
  try {
    const { email, role, workspaceId } = req.body;

    // --------------------------------
    // 1. Get logged-in user
    // --------------------------------

    const user_Id = req.user?.userId;

    if (!user_Id) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    // --------------------------------
    // 2. Validate request
    // --------------------------------

    if (!email || !role || !workspaceId) {
      return res.status(400).json({
        error: true,
        message: "email, role and workspaceId are required",
      });
    }

    // --------------------------------
    // 3. Find manager
    // --------------------------------

    const manager = await prismaClient.user.findUnique({
      where: {
        user_id: user_Id,
      },
    });

    if (!manager) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    // --------------------------------
    // 4. Find workspace
    // --------------------------------

    const workspace = await prismaClient.workspace.findFirst({
      where: {
        org_Id: workspaceId,
        user_Id: user_Id,
      },
    });

    if (!workspace) {
      return res.status(404).json({
        error: true,
        message: "Workspace not found or you are not the owner",
      });
    }

    // --------------------------------
    // 5. Check existing invitation
    // --------------------------------

    const existingInvite = await prismaClient.workspaceInvitation.findFirst({
      where: {
        email: email,
        status: "PENDING",

        workspace: {
          org_Id: workspaceId,
        },
      },
    });

    if (existingInvite) {
      return res.status(400).json({
        error: true,
        message: "Invitation already sent to this email",
      });
    }

    // --------------------------------
    // 6. Generate invitation token
    // --------------------------------

    const token = crypto.randomBytes(32).toString("hex");

    // --------------------------------
    // 7. Expiration - 7 days
    // --------------------------------

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    // --------------------------------
    // 8. Create invitation
    // --------------------------------

    const invitation = await prismaClient.workspaceInvitation.create({
      data: {
        email,
        role,
        token,
        status: "PENDING",
        expiresAt,

        workspace: {
          connect: {
            org_Id: workspaceId,
          },
        },
      },
    });

    // --------------------------------
    // 9. Invitation URL
    // --------------------------------

    const inviteUrl = `${process.env.FRONTEND_URL}/workspace/invite/${token}`;

    const memberName: string = email.split("@")[0];

    const managerName: string = manager.name ?? "Manager";

    const expiryTime: string = expiresAt.toLocaleDateString();

    // --------------------------------
    // 11. Send email
    // --------------------------------

    await transport.sendMail({
      from: process.env.MAIL_USER,
      to: email,

      subject: `Invitation to join ${workspace.Name}`,

      html: workSpaceTemplate({
        workspaceName: workspace.Name,
        memberName,
        managerName,
        inviteLink: inviteUrl,
        expiryTime,
      }),
    });

    // --------------------------------
    // 12. Response
    // --------------------------------

    return res.status(201).json({
      error: false,
      message: "Invitation sent successfully",

      data: {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
      },
    });
  } catch (err: any) {
    console.error("Workspace Invite Error:", err);

    return res.status(500).json({
      error: true,
      message: "Invite Failed",
    });
  }
};

export const invitedMembers = 


export const getMembers = async (req: AuthRequest, res: Response) => {
  try {
    const user_Id = req.user?.userId;

    if (!user_Id) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    // Find the workspace where this user is a member
    const membership = await prismaClient.workSpaceMembers.findFirst({
      where: {
        user_Id: user_Id,
      },
    });

    if (!membership) {
      return res.status(404).json({
        error: true,
        message: "Workspace membership not found",
      });
    }

    // Get all members of that workspace
    const members = await prismaClient.workSpaceMembers.findMany({
      where: {
        workspaceId: membership.workspaceId,
      },
      include: {
        user: {
          select: {
            user_Id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json({
      error: false,
      message: "Members fetched successfully",
      members,
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      error: true,
      message: "Unable to fetch members",
    });
  }
};