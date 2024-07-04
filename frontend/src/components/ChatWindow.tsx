"use client";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Button, Typography } from "antd";
import React, { useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import ChatItem from "./ChatItem";
import { BiSend } from "react-icons/bi";
import httpXhr from "@/http/axios";
type Message = {
    role: "user" | "assistant";
    content: string;
}

function ChatWindow() {
    const user = useAppSelector((state) => state.user.user);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    async function handleSubmit() {
        console.log(inputRef.current?.value);
        const content = inputRef.current?.value as string;
        if(inputRef.current) inputRef.current.value = "";
        const message: Message = { role: "user", content };
        setChatMessages(messages => [...messages, message]);
        const chatData = await httpXhr.sendChatRequest({ message: content });
        setChatMessages([...chatData?.chats]);
    }

    return (
        <div className="flex flex-1 w-full h-full me-3 gap-3 font-inter">
            <div className="md:flex xs:hidden sm:hidden hidden flex-[0.2] flex-col">
                <div className="flex w-full h-[60vh] bg-[rgb(17,29,39)] rounded-xl flex-col mx-3 overflow-hidden  p-4">
                    {(user?.name && (
                        <Avatar className="mx-auto my-2 bg-white text-black font-[600] text-[24px] w-[44px] h-[44px] uppercase">
                            {user?.name[0]}
                        </Avatar>
                    )) || (
                            <RxAvatar className="mx-auto my-2 bg-white text-black text-[44px] rounded-full" />
                        )}
                    <article className="text-center">
                        <h2 className="font-semibold font-inter">
                            You are talking to a ChatBot
                        </h2>
                        <p className="text-gray-200 text-sm my-4 p-3">
                            You can ask come questions related to Knowledge, Business,
                            Advices, Education, etc. But avoid to share personal information.
                        </p>
                        <Button className="w-[200px] my-auto font-[700] rounded mx-auto bg-red-300 border-none hover:bg-red-400 uppercase text-white">
                            Clear Conversation
                        </Button>
                    </article>
                </div>
            </div>
            <div className="flex flex-1 md:flex-[0.8] mx:flex-1 sm:flex-1 flex-col p-4">
                <Typography className="text-center text-[24px] text-white mb-2 font-semibold w-full md:text-[36px]">
                    Model - GPT 3.5 Turbo
                </Typography>
                <div className="w-full h-[48vh] sm:h-[60vh] rounded mx-auto flex flex-col overflow-scroll overflow-x-hidden overflow-y-auto smooth">
                    {chatMessages.map((message, i) => <ChatItem key={`msg: ${i}`} role={message.role} content={message.content} />)}
                </div>
                <div className="w-full p-5 rounded bg-[rgb(17,27,39)] flex m-auto items-center">
                <textarea placeholder="Chat here" ref={inputRef} className="resize-y w-full bg-transparent p-4 border-none text-white focus:bg-black hover:bg-black outline-none focus:outline-none " />
                <BiSend className="ml-2 text-[28px] text-white/70 cursor-pointer hover:text-white" onClick={handleSubmit} />
                </div>
                
            </div>
        </div>
    );
}

export default ChatWindow;
