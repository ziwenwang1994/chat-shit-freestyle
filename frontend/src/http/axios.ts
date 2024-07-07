import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";


const token = getCookie("auth_token") || "";
const xhr = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

xhr.interceptors.response.use(function (response: AxiosResponse) {
  if (response.status < 400) return response.data;
  console.error(response.data);
  return response;
});

export function setAuthorization(token: string) {
  if (token) {
    xhr.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete xhr.defaults.headers.common["Authorization"];
  }
}

setAuthorization(token);

const httpXhr: {
  fetchUserInfo: () => Promise<any>;
  getChatHistory: () => Promise<any>;
  fetchUserInfoOnServer: (header: { authorization: string }) => Promise<any>;
  login: (params: { email: string; password: string }) => Promise<any>;
  signup: (params: {
    email: string;
    password: string;
    name: string;
  }) => Promise<any>;
  sendChatRequest: (params: { message: string }) => Promise<any>;
  clearChatHistory: () => Promise<any>;
} = {
  async fetchUserInfo() {
    return await xhr.get("/users/me");
  },
  async fetchUserInfoOnServer({ authorization }) {
    return await xhr.get("/users/me", {
      headers: { Authorization: authorization },
    });
  },
  async login({ email, password }) {
    return await xhr.post("/users/login", { email, password });
  },
  async signup({ email, password, name }) {
    return await xhr.post("/users/signup", { email, password, name });
  },
  async sendChatRequest({ message }) {
    return await xhr.post("/chats/new", { message });
  },
  async getChatHistory() {
    return await xhr.get("/chats/history");
  },
  async clearChatHistory() {
    return await xhr.delete("/chats/history");
  },
};

export default httpXhr;
