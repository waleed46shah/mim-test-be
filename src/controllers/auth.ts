import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser, refetchUser } from "../services/auth";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const result = await registerUser({ name, email, password });
  res.status(result.status === "success" ? 201 : 400).json(result);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });

  if (result.status === "success") {
    res
      .cookie("token", result.data.token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(result);
  } else {
    res.status(400).json(result);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res
    .clearCookie("token", { sameSite: "none", secure: true })
    .status(200)
    .json({
      status: "success",
      message: "Logged out successfully",
    });
};

export const refetch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }

  const result = await refetchUser(token);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
