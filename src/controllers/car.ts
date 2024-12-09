import { Request, Response, NextFunction } from "express";
import { CarDTO } from "../dtos/CarDTO";
import { getCarsByUserId, createCar } from "../services/car";

export const createCarController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { model, price, phoneNumber, maxPictures, pictures, userId } = req.body;

  const carData = new CarDTO();
  carData.model = model;
  carData.price = price;
  carData.phoneNumber = phoneNumber;
  carData.maxPictures = maxPictures;
  carData.pictures = pictures;

  const result = await createCar(carData, userId); // Call the service to create a car
  res.status(result.status === "success" ? 201 : 400).json(result);
};

export const fetchCarsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  const result = await getCarsByUserId(userId);
  res.status(result.status === "success" ? 200 : 400).json(result);
};
