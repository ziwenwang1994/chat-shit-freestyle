import { MutableRefObject, useEffect, useState } from "react";
import { User } from "../../../types";
import { getCookie } from "cookies-next";
import httpXhr, { setAuthorization } from "@/http/axios";
import { setUser } from "../features/userSlice";
import { EnhancedStore } from "@reduxjs/toolkit";

export default function useInit(store: MutableRefObject<EnhancedStore<any> | undefined>) {
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

  useEffect(() => {
    store.current?.dispatch(setUser(serverUser));
  }, [serverUser, store]);
}
