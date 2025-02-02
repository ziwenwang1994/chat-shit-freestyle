import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const createChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, decodedUser } = req.body;
    const user = decodedUser;
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    try {
      const openAI = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPEN_AI_ORGANIZATION,
      });
      const chatResponse = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chats as ChatCompletionMessageParam[],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      user.chats.push(chatResponse.choices[0].message);
      await user.save();
      return res.status(200).json({ chats: user.chats });
    } catch (error) {
      if (error.status === 429)
        return res.status(200).json({
          chats: [
            ...user.chats,
            {
              content:
                "Exceed the credit limitation of Open AI! The owner runs out of the balance!",
              role: "assistant",
            },
          ],
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

export const getChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { decodedUser } = req.body;
    const user = decodedUser;
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};

export const clearChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { decodedUser } = req.body;
    const chats = decodedUser.chats = [];
    decodedUser.save();
    return res.status(200).json({ chats });
  } catch (error) {
    return res.status(500).json({ message: "Something was wrong" });
  }
};