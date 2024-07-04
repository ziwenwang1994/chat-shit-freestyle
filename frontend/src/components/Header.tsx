"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "antd";
import { logout, setUser } from "@/lib/features/userSlice";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "chat", path: "/chat" },
];

type User = {
  name: string;
  email: string;
  id: string;
} | null;

type HeaderProps = {
  user: User;
} | null;
const Header = (props: HeaderProps) => {
  const location = usePathname();
  const { user } = props || {};
  const [loginStatus, setLoginStatus] = useState(!!user?.email);
  const [name, setName] = useState(user?.name || "");
  const isLoggedIn = useAppSelector((state) => state.user?.isLoggedIn);
  const username = useAppSelector((state) => state.user?.user?.name);
  const timer = useRef<any>(null);
  const [visible, seVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoginStatus(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setName(username || "");
  }, [username]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      seVisible(true);
      timer.current = null;
    });
    return () => clearTimeout(timer.current);
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);
  return (
    <header className="h-[90px] bg-black/20 py-2">
      <div className="flex items-center px-[16px] pt-[16px] justify-between">
        <div>
          <Logo />
        </div>
        <nav
          className="flex items-center transition-opacity duration-200 ease-in-out text-center sm:mt-0 mt-4"
          style={{
            opacity: visible ? "1" : "0",
          }}
        >
          {isLoggedIn && links.map((link) => (
            <Link
              className="mx-1 px-2 py-1 rounded font-bold uppercase hover:bg-black/90 transition-all duration-100 
              ease-in-out"
              href={link.path}
              key={link.name}
              style={{
                background: location === link.path ? "#252525" : ""
              }}
            >
              {link.name}
            </Link>
          ))}
          {loginStatus && (
            <Button
              className="font-bold uppercase bg-sky-950 text-white border-none"
              onClick={() => {
                dispatch(logout()).then(res => {
                  if (!res.type?.includes("/rejected")) router.replace("/");
                });
              }}
            >
              logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
