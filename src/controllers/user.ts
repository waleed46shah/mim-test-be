import { NextFunction, Request, Response } from "express";
import {
  updateUser,
  getUserById,
  deleteUserById,
  getAllUsers,
} from "../services/user";

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await updateUser({
    userId: req.params.userId,
    ...req.body,
  });

  res.status(result.status === "success" ? 200 : 400).json(result);
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getUserById(req.params.userId);
  res.status(result.status === "success" ? 200 : 404).json(result);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await deleteUserById(req.params.userId);
  res.status(result.status === "success" ? 200 : 404).json(result);
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getAllUsers();
  res.status(result.status === "success" ? 200 : 400).json(result);
};
