import axios, { AxiosResponse } from "axios";

const xhr = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
});

xhr.interceptors.response.use(function (response: AxiosResponse) {
  if (response.status < 400) return response.data;
  console.error(response.data);
  return response;
});

const httpXhr: {
  fetchUserInfo: () => Promise<any>;
  fetchUserInfoOnServer: (header: { authorization: string }) => Promise<any>;
  login: (params: { email: string; password: string }) => Promise<any>;
  signup: (params: {
    email: string;
    password: string;
    name: string;
  }) => Promise<any>;
  logout: () => Promise<any>;
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
  async logout() {
    return await xhr.post("/users/logout");
  },
  async signup({ email, password, name }) {
    return await xhr.post("/users/signup", { email, password, name });
  },
};

export default httpXhr;
