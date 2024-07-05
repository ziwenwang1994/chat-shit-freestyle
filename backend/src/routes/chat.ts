import { Router } from "express";
import { authenticator } from "../middleware/authenticator.js";
import { chatCompletionValidator, validate } from "../middleware/validators.js";
import { clearChatHistory, createChatCompletion, getChatHistory } from "../controllers/chat.js";

const chatRouter = Router();

chatRouter.post("/new", authenticator, validate(chatCompletionValidator), createChatCompletion);
chatRouter.get("/history", authenticator, getChatHistory);
chatRouter.delete("/history", authenticator, clearChatHistory);

export default chatRouter;