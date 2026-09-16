import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import prismaClient from "../config/prisma.js";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const workspace = async (req: AuthRequest, res: Response) => {
  try {
    const user_Id = req.user?.userId;
    const { name, role } = req.body;

    if (!user_Id) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    const WorkspaceCreateuser = await prismaClient.workspace.create({
      data: {
        Name: name,
        Role: role,
        user_Id: user_Id,
      },
    });

    return res.status(200).json({
      error: true,
      message: "User Workspace Created",
      WorkspaceCreateuser,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      error: true,
      message: "Unable to create workspace",
    });
  }
};

export const getWorkSpace = async (req: AuthRequest, res: Response) => {
  try {
    const user_Id = req.user?.userId;
    console.log("your userid")

    const getWorkspace = await prismaClient.workspace.findMany({
      where: {
        user_Id: user_Id,
      },
      select: {
        org_Id:true,
        Name: true,
        Role: true,
      },
    });

    return res.status(200).json({
      error:false,
      message:"User Workspace Fetched",
      getWorkspace
    })
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      error: true,
      message: "Unable to get workspace",
    });
  }
};
