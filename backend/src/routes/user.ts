import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.js";
import { signupValidator, validate } from "../middleware/validators.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), createUser);

export default userRouter;
