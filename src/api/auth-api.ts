import axios from "axios";

const authApi = axios.create({ baseURL: "https://moneyfulpublicpolicy.co.kr" });

export const signUp = async ({
  id,
  password,
  nickname,
}: {
  id: string;
  password: string;
  nickname: string;
}) => {
  const response = await authApi.post("/register", { id, password, nickname });
  return response.data;
};


export const signIn = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  const response = await authApi.post("/login", { id, password });
  return response.data;
};