import mongoose from "mongoose";

export type UserType = mongoose.Document & {
  name: string;
  email: string;
  password: string;
};

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
