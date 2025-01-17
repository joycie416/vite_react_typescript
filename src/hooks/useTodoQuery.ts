import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/data-api";

export const useTodoQuery = (userId:string | null) => {
  if (!userId) {
    return [];
  }
  return useQuery({
    queryFn: () => fetchTodos(userId),
    queryKey: ['user', 'todos', userId],
    enabled: !!userId
  })
}