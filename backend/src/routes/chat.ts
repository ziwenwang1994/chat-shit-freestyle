import { Router } from "express";
import { authenticator } from "../middleware/authenticator.js";
import { chatCompletionValidator, validate } from "../middleware/validators.js";
import { createChatCompletion } from "../controllers/chat.js";

const chatRouter = Router();

chatRouter.post("/new", authenticator, validate(chatCompletionValidator), createChatCompletion);

export default chatRouter;