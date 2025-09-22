import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, EyeOff, Eye, AlertCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useResentOtp } from "@/hooks/auth/useResentOtp";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import { useOtp } from "@/hooks/auth/useOtp";
import axios from "axios";
import { useUpdatePassword } from "@/hooks/main/settings/useUpdatePassword";

function SecurityTab() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email)!;

  const [passwordResetStep, setPasswordResetStep] = useState<
    "email" | "otp" | "password"
  >("email");

  const [resetOtp, setResetOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [resetOtpTimer, setResetOtpTimer] = useState(60);
  const [canResendReset, setCanResendReset] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordResetData, setPasswordResetData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordError, setPasswordError] = useState("");

  const { isPending, isSuccess, mutate } = useResentOtp();
  const {
    isPending: isPendingOtp,
    isSuccess: isSuccessOtp,
    mutate: mutateOtp,
    error: errorOtp,
    isError: isErrorOtp,
  } = useOtp();
  const {
    isPending: isPendingPassword,
    isSuccess: isSuccessPassword,
    mutate: mutatePassword,
    error: errorPassword,
    isError: isErrorPassword,
  } = useUpdatePassword();

  const handleSendOrResendOtp = () => {
    setResetOtpTimer(60);
    setCanResendReset(false);
    setResetOtp(["", "", "", "", "", ""]);
    mutate({ email: userEmail, isRegister: false });
  };

  const handleVerifyOtp = () => {
    mutateOtp({ email: userEmail, otp: resetOtp.join("") });
  };
  const handleResetOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...resetOtp];
      newOtp[index] = value;
      setResetOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`reset-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };
  useEffect(() => {
    if (passwordResetStep === "otp" && resetOtpTimer > 0) {
      const timer = setTimeout(() => setResetOtpTimer(resetOtpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resetOtpTimer === 0) {
      setCanResendReset(true);
    }
  }, [passwordResetStep, resetOtpTimer]);

  const handleUpdatePassword = () => {
    mutatePassword({
      password: passwordResetData.newPassword,
      confirmPassword: passwordResetData.confirmNewPassword,
    });
  };
  const isPasswordValid = Object.values(passwordChecks).every((check) => check);
  const passwordsMatch =
    passwordResetData.newPassword === passwordResetData.confirmNewPassword &&
    passwordResetData.confirmNewPassword !== "";
  const handlePasswordResetChange = (field: string, value: string) => {
    setPasswordResetData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const password = passwordResetData.newPassword;
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [passwordResetData.newPassword]);

  useEffect(() => {
    if (isSuccess && passwordResetStep === "email") {
      setPasswordResetStep("otp");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessOtp) {
      setPasswordResetStep("password");
    }
  }, [isSuccessOtp]);
  useEffect(() => {
    if (isSuccessPassword) {
      setPasswordResetStep("email");
    }
  }, [isSuccessPassword]);

  useEffect(() => {
    if (isErrorOtp) {
      if (axios.isAxiosError(errorOtp)) {
        setOtpError(errorOtp.response?.data?.message);
      }
    }
  }, [isErrorOtp]);
  useEffect(() => {
    if (isErrorPassword) {
      if (axios.isAxiosError(errorPassword)) {
        setPasswordError(errorPassword.response?.data?.message);
      }
    }
  }, [isErrorPassword]);

  useEffect(() => {
    const pending = isPendingOtp || isPending || isPendingPassword;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending, isPendingOtp, isPendingPassword]);

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Update Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {passwordResetStep === "email" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Email Verification</Label>
              <Input
                type="email"
                value={userEmail}
                onChange={(e) =>
                  handlePasswordResetChange("email", e.target.value)
                }
                className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
                disabled
              />
              <p className="text-sm text-slate-400">
                We'll send a verification code to this email.
              </p>
            </div>
            <Button
              onClick={handleSendOrResendOtp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Send Verification Code
            </Button>
          </div>
        )}

        {passwordResetStep === "otp" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Enter Verification Code</Label>
              <div className="flex justify-center space-x-2">
                {resetOtp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`reset-otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleResetOtpChange(index, e.target.value)
                    }
                    className="w-12 h-12 text-center bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
                  />
                ))}
              </div>
            </div>
            {otpError && (
              <p className="text-sm text-center text-red-500">{otpError}</p>
            )}
            <div className="text-center">
              <Button
                variant="link"
                disabled={!canResendReset}
                onClick={handleSendOrResendOtp}
                className={`${
                  canResendReset
                    ? "text-emerald-400 hover:text-emerald-300"
                    : "text-slate-500"
                }`}
              >
                {canResendReset ? "Resend Code" : `Resend in ${resetOtpTimer}s`}
              </Button>
            </div>
            <Button
              onClick={handleVerifyOtp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Verify Code
            </Button>
          </div>
        )}

        {passwordResetStep === "password" && (
          <div className="space-y-4">
            {passwordError && (
              <p className="text-sm text-center text-red-500">
                {passwordError}
              </p>
            )}
            <div className="space-y-2">
              <Label className="text-slate-200">New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordResetData.newPassword}
                  onChange={(e) =>
                    handlePasswordResetChange("newPassword", e.target.value)
                  }
                  className="pr-10 bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordResetData.confirmNewPassword}
                  onChange={(e) =>
                    handlePasswordResetChange(
                      "confirmNewPassword",
                      e.target.value
                    )
                  }
                  className="pr-10 bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-200">
                Password Requirements:
              </p>
              <div className="space-y-1">
                {[
                  { key: "length", text: "At least 8 characters" },
                  { key: "uppercase", text: "One uppercase letter" },
                  { key: "lowercase", text: "One lowercase letter" },
                  { key: "number", text: "One number" },
                  { key: "special", text: "One special character" },
                ].map(({ key, text }) => (
                  <div key={key} className="flex items-center space-x-2">
                    {passwordChecks[key as keyof typeof passwordChecks] ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-slate-500" />
                    )}
                    <span
                      className={`text-sm ${
                        passwordChecks[key as keyof typeof passwordChecks]
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }`}
                    >
                      {text}
                    </span>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  {passwordsMatch ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-slate-500" />
                  )}
                  <span
                    className={`text-sm ${
                      passwordsMatch ? "text-emerald-400" : "text-slate-500"
                    }`}
                  >
                    Passwords match
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleUpdatePassword}
              disabled={!isPasswordValid || !passwordsMatch}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Update Password
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SecurityTab;
