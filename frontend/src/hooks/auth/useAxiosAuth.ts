import { setAxiosAuthHandler } from "@/configs/axios";
import { logout } from "@/redux/features/auth/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAxiosAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAxiosAuthHandler(() => {
      dispatch(logout());
      navigate("/login");
    });
  }, [dispatch, navigate]);
};
