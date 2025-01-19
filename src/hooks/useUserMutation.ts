import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/supabase-auth-api";
import { User } from "@supabase/supabase-js";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { userId: string; nickname: string }) =>
      updateUser(data),

    // 낙관적 업데이트
    onMutate: async (data: { userId: string; nickname: string }) => {
      await queryClient.cancelQueries({ queryKey: ["user", "info"] });
      const prevData = queryClient.getQueryData<User>(["user", "info"]);

      queryClient.setQueryData<User>(["user", "info"], (prev) => {
        if (!!prev) {
          const updatedUser = { ...prev };
          updatedUser.user_metadata.nickname = data.nickname;
          return updatedUser;
        }
        return;
      });

      // context에 이전 데이터 넣어둠
      return { prevData };
    },

    // 에러가 발생하면 이전 데이터로 변경
    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData<User>(["user", "info"], context.prevData);
      }
    },

    // 성공하면 invalidate
    // onSuccess와 달리 성공해도, 실패해도 모두 실행
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "info"],
      });
    },
  });
};
