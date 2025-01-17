import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/data-api";

export const useTodoQuery = (userId:string | null)  => {
  return useQuery({
    queryFn: () => fetchTodos(userId),
    queryKey: ['user', 'todo', userId ?? ""],
    enabled: !!userId
  })
}