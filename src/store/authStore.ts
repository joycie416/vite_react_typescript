import { create } from "zustand";
import { persist } from "zustand/middleware";

// type AuthData = {
//   user: string | null;
//   accessToken: string | null;
// };
type AuthData = {
  user: { id: string; nickname: string } | null;
};

type AuthAction = {
  signIn: ({
    userId,
    nickname,
  }: {
    userId: string;
    nickname: string;
  }) => Promise<void>;
  signOut: () => void;
  editUser: (nickname: string) => void;
};

type AuthStore = AuthData & AuthAction;

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      accessToken: null,
      // signIn: async (user, accessToken) => {
      //   const currentData = get();
      //   if (currentData.user === user) {
      //     set({ accessToken });
      //     return;
      //   }
      //   set({ user, accessToken });
      //   return;
      // },
      signIn: async ({
        userId,
        nickname,
      }: {
        userId: string;
        nickname: string;
      }) => {
        const currentData = get();
        if (currentData?.user?.nickname === nickname) {
          return;
        }
        set({ user: { id: userId, nickname } });
        return;
      },
      signOut: () => {
        set({ user: null });
      },
      editUser: (nickname: string) => {
        const currentData = get();
        if (currentData.user?.nickname === nickname) {
          return;
        }
        set({ user: { id: currentData.user?.id ?? "", nickname } });
        return;
      },
    }),
    {
      name: "userStorage",
    }
  )
);

export default useAuthStore;
