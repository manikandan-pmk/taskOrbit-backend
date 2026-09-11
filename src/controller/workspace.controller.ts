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
    console.log(user_Id);

  

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
