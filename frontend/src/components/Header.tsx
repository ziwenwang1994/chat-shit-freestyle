"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "antd";
import { logout, setUser } from "@/lib/features/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import httpXhr, { setAuthorization } from "@/http/axios";

const links = [{ name: "chat", path: "/chat" }];

type User = {
  name: string;
  email: string;
  id: string;
} | null;

const Header = () => {
  const location = usePathname();
  const isLoggedIn = useAppSelector((state) => state.user?.isLoggedIn);
  const initialized = useAppSelector((state) => state.user?.initialized);
  const router = useRouter();
  const [serverUser, setServerUser] = useState<User>(null);

  useEffect(() => {
    const token = getCookie("auth_token");
    if (token) {
      setAuthorization(token);
      try {
        httpXhr.fetchUserInfo().then((data: { user: User }) => {
          setServerUser(data?.user || null);
        });
      } catch (error) {
        setUser(null);
        console.error(error);
      }
    }
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(serverUser));
  }, [serverUser, dispatch]);
  return (
    <header className="h-[90px] bg-black/20 py-2">
      <div className="flex items-center px-[16px] pt-[16px] justify-between">
        <div>
          <Logo />
        </div>
        <nav
          className="flex items-center transition-opacity duration-200 ease-in-out text-center sm:mt-0 mt-4"
          style={{
            opacity: initialized ? "1" : "0",
          }}
        >
          {isLoggedIn &&
            links.map((link) => (
              <Link
                className="mx-1 px-2 py-1 rounded font-bold uppercase hover:bg-black/90 transition-all duration-100 
              ease-in-out"
                href={link.path}
                key={link.name}
                style={{
                  background: location === link.path ? "#252525" : "",
                }}
              >
                {link.name}
              </Link>
            ))}
          {isLoggedIn && (
            <Button
              className="font-bold uppercase bg-sky-950 text-white border-none"
              onClick={() => {
                dispatch(logout()).then((res) => {
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
