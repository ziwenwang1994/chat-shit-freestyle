import Link from "next/link";
import React from "react";
import { PiRobotFill } from "react-icons/pi";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <PiRobotFill className="text-[72px] text-white" />
      <div>
        <h2 className="font-[700] text-[22px] leading-tight text-green-200">FREESTYLE</h2>
        <h3 className="font-[700] text-[22px] leading-tight text-green-200">GPT</h3>
      </div>
    </Link>
  );
};

export default Logo;
