"use client"

import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React from "react";

function LinksArea() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? (
    <>
      <Link
        href="/chat"
        className="block text-center py-2 text-xl
    bg-lime-800 font-bold my-2 hover:text-[#191919] hover:bg-lime-300"
      >
        {"Start Chat"}
      </Link>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="block text-center bg-slate-300 py-2 text-xl
    text-black font-bold my-4 hover:text-zinc-100 hover:bg-[#191919]"
      >
        {"Log in"}
      </Link>
      <Link
        href="/signup"
        className="block text-center text-slate-300 py-2 text-xl
    bg-lime-800 font-bold my-4 hover:text-[#191919] hover:bg-lime-300"
      >
        {"I'm new here"}
      </Link>
    </>
  );
}

export default LinksArea;
