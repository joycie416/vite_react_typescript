import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthData = {
  user: string | null;
  accessToken: string | null;
};

type AuthAction = {
  signIn: (user: string, accessToken: string) => Promise<void>;
  signOut: () => void;
};

type AuthStore = AuthData & AuthAction;

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      accessToken: null,
      signIn: async (user, accessToken) => {
        const currentData = get();
        if (currentData.user === user) {
          set({ accessToken });
          return;
        }
        set({ user, accessToken });
        return;
      },
      signOut: () => {
        set({ user: null, accessToken: null });
      }
    }),
    {
      name: "userStorage",
    }
  )
);

export default useAuthStore;
