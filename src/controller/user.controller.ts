import { Request, Response } from "express";
import prismaClient from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashpassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    // Check user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // JWT payload
    const payload = {
      userId: user.id,
      email: user.email,
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      res.status(400).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        user_id: user_id,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get user info",
    });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.user_id;
    console.log(req.params);

    const user = await prismaClient.user.delete({
      where: {
        user_id: user_id,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Unable to delete user",
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { user_Id } = req.user?.user_Id;

    const { name, email, avatarUrl } = req.body;

    if (!user_Id) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    const user = await prismaClient.user.update({
      where: {
        user_id: user_Id,
      },
      data: {
        email,
        name,
        avatarUrl,
      },
    });
    return res.status(200).json({
      error: false,
      success: true,
      message: "User updated successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      sucess: false,
      message: "Unable to update User",
    });
  }
};
