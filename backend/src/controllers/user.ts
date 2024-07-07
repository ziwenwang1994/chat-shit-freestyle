import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({
        message: "OK",
        users: users.map((el) => ({
          id: el._id.toString(),
          name: el.name,
          email: el.email,
        })),
      });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, email } = req.body.decodedUser;

    return res.status(200).json({
      message: "OK",
      user: {
        id: _id.toString(),
        name,
        email,
      },
    });
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
    const existing = await User.findOne({ email });
    if (existing) return res.status(401).send("User already exists");
    const encodedPassword = await hash(password, 4);
    const user = new User({ name, email, password: encodedPassword });
    await user.save();
    const token = createToken(user._id.toString(), email);
    const userInfo = { email, id: user._id.toString(), name: user.name };
    return res
      .status(200)
      .json({ message: "OK", user: userInfo, accessToken: token });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User does not exist");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Password is not correct");
    }

    const token = createToken(user._id.toString(), email);
    const userInfo = { email, id: user._id.toString(), name: user.name };
    return res
      .status(200)
      .json({ message: "OK", user: userInfo, accessToken: token });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "ERROR", cause: error.message });
  }
};