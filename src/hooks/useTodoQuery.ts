import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../api/supabase-data-api";
// import { fetchTodos } from "../api/data-api";

// export const useTodoQuery = (userId:string | null)  => {
//   return useQuery({
//     queryFn: () => fetchTodos(userId),
//     queryKey: ['user', 'todo', userId ?? ""],
//     enabled: !!userId
//   })
// }

export const useTodoQuery = (userId:string | null)  => {
  return useQuery({
    queryFn: () => getTodo(userId),
    queryKey: ['user', 'todo', userId ?? ""],
    enabled: !!userId
  })
}