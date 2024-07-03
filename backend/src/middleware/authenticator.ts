import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/token.js";
import { getUserByIdAndEmail } from "../utils/functions.js";

export const authenticator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies?.auth_token || req.headers.authorization;
   
    if (token) {
      const data = decodeToken(token);
      if (
        typeof data === "object" &&
        typeof data.id === "string" &&
        typeof data.email === "string"
      ) {
        const user = await getUserByIdAndEmail({
          email: data.email,
          id: data.id,
        });
        if (!user)
          return res
            .status(404)
            .json({ message: "ERROR", cause: "Cannot find the user." });

        req.body.decodedUser = user;
        return next();
      }
    }
    return res
      .status(404)
      .json({ message: "ERROR", cause: "Cannot find the user." });
  } catch (error) {
    return res.status(404).json({ message: "ERROR", cause: error.message });
  }
};
