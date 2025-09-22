import { useAxiosAuth } from "@/hooks/auth/useAxiosAuth";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import CreateArticle from "@/pages/main/CreateArticle";
import EditArticle from "@/pages/main/EditArticle";
import Home from "@/pages/main/Home";
import MyArticle from "@/pages/main/MyArticle";
import Settings from "@/pages/main/Settings";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

function Routers() {
  useAxiosAuth();
  const { email } = useSelector((state: RootState) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={!email ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!email ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/" element={email ? <Home /> : <Navigate to="/login" />} />

        <Route
          path="/settings"
          element={email ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-articles"
          element={email ? <MyArticle /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-article"
          element={email ? <CreateArticle /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-article/:id"
          element={email ? <EditArticle /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default Routers;
