"use server";

import httpXhr, { setAuthorization } from "@/http/axios";
import Header from "./Header";
import { cookies } from "next/headers";

export default async function ServerHeader(): Promise<JSX.Element> {
  let user = null;
  const token = cookies().get("auth_token")?.value;
  if (token) {
    setAuthorization(token)
    try {
      const data = await httpXhr.fetchUserInfo();
      user = data?.user || null;
    } catch (error) {
      user = null;
    }
  }

  return <Header user={user} />;
}
