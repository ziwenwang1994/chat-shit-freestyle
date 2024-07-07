import { useAppSelector } from "@/lib/hooks";
import { Avatar, Card, Typography } from "antd";
import React from "react";
import { PiRobotFill } from "react-icons/pi";

type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};

function ChatItem(props: ChatItemProps) {
  const user = useAppSelector((state) => state.user.user);
  return props.role === "assistant" ? (
    <article className="bg-[#295442] flex w-full items-center p-4">
      <div className="w-[36px] h-[36px]">
        <PiRobotFill className="text-[32px]" />
      </div>

      <p className="px-2">{props.content}</p>
    </article>
  ) : (
    <article className="bg-[#555555] flex w-full items-center p-4">
      <div className="ml-0 uppercase flex justify-center items-center 
      rounded-full w-[36px] h-[36px] bg-[#333333] font-semibold">
          {user?.name[0]}
        </div>

      <p className="px-2">{props.content}</p>
    </article>
  );
}

export default ChatItem;
