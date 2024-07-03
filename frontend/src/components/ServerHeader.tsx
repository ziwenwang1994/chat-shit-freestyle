"use server";

import httpXhr from "@/http/axios";
import Header from "./Header";
import { cookies } from "next/headers";

export default async function ServerHeader(): Promise<JSX.Element> {
  let user = null;
  const authorization = cookies().get("auth_token")?.value;
  console.log(1)
  if (authorization) {
    try {
      const data = await httpXhr.fetchUserInfoOnServer({ authorization });
      user = data?.user || null;
    } catch (error) {
      user = null;
    }
  }

  return <Header user={user} />;
}
