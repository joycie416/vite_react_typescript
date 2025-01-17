import axios from "axios";
import { Todo } from "../types/todo";

const baseURL = import.meta.env.VITE_DB_URL as string;

const dataApi = axios.create({ baseURL });

export const fetchTodos = async (userId: string | null): Promise<Todo[]> => {
  if (!userId) {
    return [] as Todo[];
  }
  try {
    const response = await dataApi.get(`/todos?userId=${userId}`);
    return response.data;
  } catch {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const addTodo = async (todo: Omit<Todo, "id">) => {
  try {
    await dataApi.post("/todos", todo);
    // return response.data;
  } catch (error) {
    throw new Error("등록 실패.");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await dataApi.delete(`/todos/${id}`);
  } catch (error) {
    throw new Error("삭제 실패.");
  }
};

export const editTodo = async (id: string, isDone: boolean) => {
  try {
    await dataApi.patch(`/todos/${id}`, {isDone: !isDone})
  } catch (error) {
    throw new Error("수정 실패.")
  }
}
