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
    id,
    nickname,
  }: {
    id: string;
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
        id,
        nickname,
      }: {
        id: string;
        nickname: string;
      }) => {
        const currentData = get();
        if (currentData?.user?.nickname === nickname) {
          return;
        }
        set({ user: { id, nickname } });
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
