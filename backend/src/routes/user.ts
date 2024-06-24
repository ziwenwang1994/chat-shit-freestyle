import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", createUser);

export default userRouter;