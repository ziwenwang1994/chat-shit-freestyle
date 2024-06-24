import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    
    const encodedPassword = await hash(password, 4);
    const user = new User({ name, email, password: encodedPassword });
    await user.save();
    return res.status(200).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "ERROR", cause: error.message });
  }
};
