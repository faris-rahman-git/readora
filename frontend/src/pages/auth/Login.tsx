import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useLogin";
import axios from "axios";
import { showLoader, hideLoader } from "@/redux/features/common/LoaderSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const { isPending, isSuccess, mutate, error, isError, data } = useLogin();

  const handleLogin = async () => {
    if (loginData.emailOrPhone === "" || loginData.password === "") {
      setFormError("All fields are required");
      return;
    }
    mutate(loginData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ user: data }));
      navigate("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data?.message);
      }
    }
  }, [isError]);
  useEffect(() => {
    const isLoading = isPending;
    dispatch(isLoading ? showLoader() : hideLoader());
  }, [isPending]);

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl text-white font-semibold">Welcome Back</h2>
          <p className="text-slate-400">
            Sign in with your email or phone number.
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          {formError && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {formError}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="emailOrPhone"
              className="text-sm font-medium text-slate-200"
            >
              Email or Phone Number
            </Label>
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="user@example.com or 98765 43210"
              value={loginData.emailOrPhone}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  emailOrPhone: e.target.value,
                }))
              }
              className="h-12 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="loginPassword"
              className="text-sm font-medium text-slate-200"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="loginPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="h-12 pr-10 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full h-12 text-sm font-medium text-white hover:bg-emerald-700 rounded-lg shadow-none cursor-pointer bg-emerald-600 transition-colors"
          onClick={handleLogin}
        >
          Sign In
        </Button>

        {/* Footer Links */}
        <div className="text-center text-sm text-slate-400">
          <>
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="p-0 ms-1 h-auto text-sm hover:text-emerald-300 font-medium cursor-pointer text-emerald-400"
            >
              Sign up here.
            </Link>
          </>
        </div>
      </div>
    </AuthLayout>
  );
}
