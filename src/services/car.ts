import { CarDTO } from "../dtos/CarDTO";
import Car from "../models/Car";

export const createCar = async (carData: CarDTO, userId: string) => {
  try {
    const newCar = new Car({ ...carData, user: userId });
    await newCar.save();
    return {
      status: "success",
      message: "Car created successfully",
      data: newCar,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create car",
    };
  }
};

export const getCarsByUserId = async (userId: string) => {
  try {
    const cars = await Car.find({ user: userId });
    return {
      status: "success",
      message: "Cars retrieved successfully",
      data: cars,
    };
  } catch (error) {
    console.error("Error retrieving cars:", error);
    return {
      status: "error",
      message: "Failed to retrieve cars",
    };
  }
};
