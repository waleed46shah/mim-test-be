import User from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RegisterInput, LoginInput } from "../types/types";
import bcrypt from "bcrypt";

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: "exists",
        message: "User already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    return {
      status: "success",
      message: "User registered successfully",
      data: savedUser,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to register user",
    };
  }
};

export const loginUser = async ({ email, password }: LoginInput) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: "notExist",
        message: "Incorrect email or password",
      };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        status: "wrongCredentials",
        message: "Incorrect email or password",
      };
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      status: "success",
      message: "User logged in successfully",
      data: { token, name: user.name, email: user.email },
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to login user",
    };
  }
};

export const refetchUser = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const id = (decoded as JwtPayload)._id;
    const user = await User.findById(id);

    if (!user) {
      return {
        status: "notFound",
        message: "User not found",
      };
    }

    return {
      status: "success",
      message: "User fetched successfully",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to refetch user",
    };
  }
};
