import { Link } from "react-router-dom";
import { getUserQuery } from "../hooks/useUserQuery";
import useAuthStore from "../store/authStore";
import supabase from "../api/supabaseClient";
import { signOut } from "../api/supabase-auth-api";
import { useQueryClient } from "@tanstack/react-query";

const NavBar = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = getUserQuery();
  const { signOut: StoreSignOut } = useAuthStore((state) => state);

  supabase.auth.onAuthStateChange((event) => {
    if (event === "USER_UPDATED") {
      queryClient.invalidateQueries({ queryKey: ["user", "info"] });
    } else {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const onSignOut = async () => {
    try {
      await signOut();
      StoreSignOut();
    } catch (error) {
      console.error(error);
      alert("로그아웃 실패");
    }
  };

  return (
    <header className="w-full flex justify-between p-5 sticky top-0 left-0 right-0 bg-white">
      <Link to="/" className="text-black hover:text-black">
        Home
      </Link>
      <ul>
        {(!user || isLoading) && (
          <li>
            <Link to="/sign-in" className="text-black hover:text-black">
              로그인
            </Link>
          </li>
        )}
        {user && (
          <>
            <li>
              <Link to="/mypage" className="text-black hover:text-black">
                마이페이지
              </Link>
            </li>
            <li>
              <button onClick={onSignOut}>로그아웃</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
