import LinksArea from "@/components/LinksArea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-8">
      <section className="flex justify-center py-8">
        <div className="w-full mx-[16px] md:w-[600px] md:mx-0 md:bg-[#252525] bg-transparent
         border-none text-slate-100 my-auto p-8 rounded-xl">
          <h2 className="text-[36px] font-bold leading-tight py-5 text-center">
            Welcome to Chat Freestyle!
          </h2>
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
        </div>
        <Image
          alt=""
          src="/assets/robot_hand.png"
          width={900}
          height={1200}
          className="w-[500px] h-[700px] hidden md:block"
        />
      </section>
    </div>
  );
}
