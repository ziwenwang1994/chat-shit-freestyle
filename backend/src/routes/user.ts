import { Router } from "express";
import { createUser, getAllUsers, getUser, login, logout } from "../controllers/user.js";
import { loginValidator, signupValidator, validate } from "../middleware/validators.js";
import { authenticator } from "../middleware/authenticator.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/me", authenticator, getUser);
userRouter.post("/signup", validate(signupValidator), createUser);
userRouter.post("/login", validate(loginValidator), login);
userRouter.post("/logout", logout);


export default userRouter;
