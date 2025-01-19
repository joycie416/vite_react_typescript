import { Link } from "react-router-dom";
import { getUserQuery } from "../hooks/useUserQuery";
import useAuthStore from "../store/authStore";
import supabase from "../api/supabaseClient";
import { signOut } from "../api/supabase-auth-api";
import { useQueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

const NavBar = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = getUserQuery();
  const {
    user: storeUser,
    signIn,
    signOut: storeSignOut,
  } = useAuthStore((state) => state);
  if (user) {
    signIn({ id: user.id, nickname: user.nickname });
  }

  supabase.auth.onAuthStateChange((event) => {
    if (event === "USER_UPDATED") {
      queryClient.invalidateQueries({ queryKey: ["user", "info"] });
    }
    if (event ===  "SIGNED_OUT") {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      storeSignOut();
    } catch (error) {
      console.error(error);
      Sentry.captureException(error)
      alert("로그아웃 실패");
    }
  };

  return (
    <header className="w-full flex justify-between p-5 sticky top-0 left-0 right-0 bg-white">
      <Link to="/" className="text-black hover:text-black">
        Home
      </Link>
      <ul>
        {(!storeUser || isLoading) && (
          <li>
            <Link to="/sign-in" className="text-black hover:text-black">
              로그인
            </Link>
          </li>
        )}
        {storeUser && (
          <>
            <li>
              <Link to="/mypage" className="text-black hover:text-black">
                마이페이지
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>로그아웃</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
