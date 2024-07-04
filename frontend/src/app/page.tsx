import LinksArea from "@/components/LinksArea";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-8">
      <section className="flex justify-center py-8">
        <Card className="w-[600px] bg-[#252525] border-none text-slate-100 my-auto">
          <h2 className="text-[36px] font-bold leading-tight py-5 text-center">Welcome to Chat Freestyle!</h2>
          <p className="text-[16px] text-slate-300">
            Your go-to chat bot for personalized assistance and engaging
            conversations. Whether you need help with a task, have a question,
            or just want to chat, Chat Freestyle is here to make your experience
            enjoyable and productive. Start chatting now and explore the endless
            possibilities!
          </p>
          <nav className="mt-8">
           <LinksArea />
          </nav>
        </Card>
        <Image
          alt=""
          src="/assets/robot_hand.png"
          width={1200}
          height={1200}
          className="w-[700px] h-[700px]"
        />
      </section>
    </div>
  );
}
