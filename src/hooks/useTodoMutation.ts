import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, deleteTodo, editTodo } from "../api/data-api";
import { Todo } from "../types/todo";

export const useAddTodoMutation = (userId:string | null) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (todo:Omit<Todo, 'id'>) => addTodo(todo),

    //낙관적 업데이트
    onMutate: async (todo:Omit<Todo, 'id'>) => {
      await queryClient.cancelQueries({
        queryKey: ["user", "todo", userId ?? ""],
      });
      const prevTodos = queryClient.getQueryData<Todo[]>([
        "user",
        "todo",
        todo.userId,
      ]);

      const newTodo = { ...todo, id: crypto.randomUUID().slice(0, 8) };

      queryClient.setQueryData<Todo[]>(
        ["user", "todo", userId ?? ""],
        (prev) => [...(prev ?? []), newTodo]
      );

      return { prevTodos };
    },
    onError: (_, __, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          ["user", "todo", userId ?? ""],
          context.prevTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "todo", userId ?? ""],
      });
    },
  });
};



export const useDeleteTodoMutation = (userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTodo(id),

    // 낙관적 업데이트
    onMutate: async ({ id }: { id: string }) => {
      await queryClient.cancelQueries({ queryKey: ["user", "todo", userId ?? ""] });
      const prevTodos = queryClient.getQueryData<Todo[]>(["user", "todo", userId ?? ""]);

      queryClient.setQueryData<Todo[]>(["user", "todo", userId ?? ""], (prev) =>
        prev?.filter((todo) => todo.id !== id)
      );

      // context에 이전 데이터 넣어둠
      return { prevTodos };
    },

    // 에러가 발생하면 이전 데이터로 변경
    onError: (_, __, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData<Todo[]>(["user", "todo", userId ?? ""], context.prevTodos);
      }
    },

    // 성공하면 invalidate
    // onSuccess와 달리 성공해도, 실패해도 모두 실행
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "todo", userId ?? ""]
      });
    }
  });
};

export const useEditTodoMutation = (userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isDone }: { id: string, isDone: boolean }) => editTodo(id, isDone),

    // 낙관적 업데이트
    onMutate: async ({ id, isDone }: { id: string, isDone: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ["user", "todo", userId ?? ""] });
      const prevTodos = queryClient.getQueryData<Todo[]>(["user", "todo", userId ?? ""]);

      queryClient.setQueryData<Todo[]>(["user", "todo", userId ?? ""], (prev) =>
        prev?.map((todo) => {
          if (todo.id === id) {
            return {...todo, isDone: !isDone}
          }
          return todo
        })
      );

      // context에 이전 데이터 넣어둠
      return { prevTodos };
    },

    // 에러가 발생하면 이전 데이터로 변경
    onError: (_, __, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData<Todo[]>(["user", "todo", userId ?? ""], context.prevTodos);
      }
    },

    // 성공하면 invalidate
    // onSuccess와 달리 성공해도, 실패해도 모두 실행
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "todo", userId ?? ""]
      });
    }
  });
};