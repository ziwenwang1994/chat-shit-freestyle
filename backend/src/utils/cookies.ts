import { Request, Response } from "express";
import { COOKIE_NAME } from "../const.js";

export const resetCookies = (req: Request, res: Response, token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  res.cookie(COOKIE_NAME, token, {
    path: "/",
    expires,
    httpOnly: true,
    sameSite: "lax",
  });
};
