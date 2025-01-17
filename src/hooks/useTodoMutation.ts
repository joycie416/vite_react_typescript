import { QueryClient, useMutation } from "@tanstack/react-query";
import { addTodo } from "../api/data-api";
import { Todo } from "../types/todo";

export const useAddTodoMutation = (userId:string, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({todo}:{todo:Todo}) => addTodo(todo),

    //낙관적 업데이트
    onMutate: async ({todo}:{todo:Todo}) => {
      await queryClient.cancelQueries({
        queryKey: ["user", "todo", userId],
      });
      const prevTodos = queryClient.getQueryData<(Todo & { id: string })[]>([
        "user",
        "todo",
        todo.userId,
      ]);

      const newTodo = { ...todo, id: crypto.randomUUID().slice(0, 8) };

      queryClient.setQueryData<(Todo & { id: string })[]>(
        ["user", "todo", userId],
        (prev) => [...(prev ?? []), newTodo]
      );

      return { prevTodos };
    },
    onError: (_, __, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData<(Todo & { id: string })[]>(
          ["user", "todo", userId],
          context.prevTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "todo", userId],
      });
    },
  });
};



// export const useDeleteTodoMutation = (id: string, queryClient: QueryClient) => {
//   return useMutation({
//     mutationFn: ({ id }: { id: string }) => cancelLike(id),

//     // 낙관적 업데이트
//     onMutate: async ({ id }: { id: string }) => {
//       await queryClient.cancelQueries({ queryKey: ["user", "like", userId ?? ""] });
//       const prevLikes = queryClient.getQueryData<Like[]>(["user", "like", userId ?? ""]);

//       queryClient.setQueryData<Like[]>(["user", "like", userId ?? ""], (prev) =>
//         prev?.filter((like) => like.id !== id)
//       );

//       // context에 이전 데이터 넣어둠
//       return { prevLikes };
//     },

//     // 에러가 발생하면 이전 데이터로 변경
//     onError: (_, __, context) => {
//       if (context?.prevLikes) {
//         queryClient.setQueryData<Like[]>(["user", "like", userId ?? ""], context.prevLikes);
//       }
//     },

//     // 성공하면 invalidate
//     // onSuccess와 달리 성공해도, 실패해도 모두 실행
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["user", "like", userId ?? ""]
//       });
//     }
//   });
// };