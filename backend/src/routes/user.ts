import { Router } from "express";
import { createUser, getAllUsers, login } from "../controllers/user.js";
import { loginValidator, signupValidator, validate } from "../middleware/validators.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), createUser);
userRouter.post("/login", validate(loginValidator), login);

export default userRouter;
