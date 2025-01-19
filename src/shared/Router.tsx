import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "../components/home/HomePage";
import NavBar from "./NavBar";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import MyPage from "../components/mypage/MyPage";
import useAuthStore from "../store/authStore";

const PrivateRoute = () => {
  const { user } = useAuthStore((state) => state);
  if (!user) {
    return <Navigate to={'/'}/>
  }

  return <Outlet />;
};
const PublicRoute = () => {
  const { user } = useAuthStore((state) => state);
  if (!!user) {
    return <Navigate to={'/'}/>
  }

  return <Outlet />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
