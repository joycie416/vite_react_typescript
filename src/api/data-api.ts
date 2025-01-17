import axios from "axios";
import { Todo } from "../types/todo";

const baseURL = import.meta.env.VITE_DB_URL as string;

const dataApi = axios.create({ baseURL });

export const fetchTodos = async (userId:string): Promise<(Todo & {id: string}[])> => {
  const response = await dataApi.get(`/todos?userId=${userId}`);
  return response.data;
}

export const addTodo = async (todo: Todo) => {
  try {
    await dataApi.post("/todos", todo);
    // return response.data;
  } catch (error) {
    throw new Error("등록에 실패하였습니다.")
  }
}

