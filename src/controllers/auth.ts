import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/auth";
import { RegisterInput, LoginInput } from "../types/types";

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const result = await registerUser({ name, email, password });
  return res.status(result.status === "success" ? 201 : 400).json(result);
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });

  if (result.status === "success") {
    const token = result.data.token;
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(result);
  } else {
    return res.status(400).json(result);
  }
};
