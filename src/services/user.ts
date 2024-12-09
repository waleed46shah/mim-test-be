import bcrypt from "bcrypt";
import User from "../models/User";

interface UpdateUserInput {
  userId: string;
  password?: string;
  [key: string]: any;
}

export const updateUser = async ({
  userId,
  ...updateData
}: UpdateUserInput) => {
  try {
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await User.findById(userId);
    if (!user) {
      return {
        status: "notFound",
        message: "User not found!",
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    return {
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update user",
    };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        status: "notFound",
        message: "User not found!",
      };
    }

    return {
      status: "success",
      message: "User retrieved successfully",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to retrieve user",
    };
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        status: "notFound",
        message: "User not found!",
      };
    }

    await user.deleteOne();
    return {
      status: "success",
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete user",
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return {
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to retrieve users",
    };
  }
};
