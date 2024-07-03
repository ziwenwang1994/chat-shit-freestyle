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
  { name: "log in", path: "/login" },
  { name: "new user", path: "/signup" },
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
  const { user } = props || {};
  const location = usePathname();

  const [loginStatus, setLoginStatus] = useState(!!user?.email);
  const [name, setName] = useState(user?.name || "");
  const isLoggedIn = useAppSelector((state) => state.user?.isLoggedIn);
  const username = useAppSelector((state) => state.user?.user?.name);
  const timer = useRef<any>(null);
  const [visible, seVisible] = useState(false);

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
  }, [user]);
  return (
    <header className="h-[90px]">
      <div className="flex items-center px-[16px] pt-[16px] justify-between">
        <div>
          <Logo />
        </div>
        <nav
          className="flex items-center transition-opacity duration-200 ease-in-out"
          style={{
            opacity: visible ? "1" : "0",
          }}
        >
          {loginStatus && (
            <Link
              className="text-white/80 mr-8 hover:text-white transition-colors duration-100 ease-in-out"
              href="/profile"
            >
              Hi, {name}!
            </Link>
          )}
          {links.map((link) => (
            <Link
              className="mx-1 px-2 py-1 rounded font-bold uppercase hover:bg-black/90 transition-all duration-100 ease-in-out"
              href={link.path}
              key={link.name}
              style={{
                display:
                  ["log in", "new user"].includes(link.name) && loginStatus
                    ? "none"
                    : "",
                    background: location === link.path ? "rgba(0,0,0,0.2)" : ""
              }}
            >
              {link.name}
            </Link>
          ))}
          {loginStatus && (
            <Button
              className="font-bold uppercase bg-sky-950 text-white border-none"
              onClick={() => {
                dispatch(logout());
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
