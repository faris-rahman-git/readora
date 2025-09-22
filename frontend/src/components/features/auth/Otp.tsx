import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResentOtp } from "@/hooks/auth/useResentOtp";
import { showLoader, hideLoader } from "@/redux/features/common/LoaderSlice";
import type { ValidationErrorsType } from "@/types/auth/RegisterType";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Otp({
  otp,
  setOtp,
  otpError,
  email,
  setCurrentView,
  setValidationErrors,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  otpError: string;
  email: string;
  setCurrentView: React.Dispatch<
    React.SetStateAction<"otp" | "password" | "register">
  >;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<ValidationErrorsType>
  >;
}) {
  const dispatch = useDispatch();
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const { isPending, mutate, isError, error } = useResentOtp();

  const handleResendOtp = () => {
    setOtpTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    mutate({ email, isRegister: true });
  };

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        setValidationErrors(error.response?.data?.message);
        setCurrentView("register");
      }
    }
  }, [isError]);

  useEffect(() => {
    const isLoading = isPending;
    dispatch(isLoading ? showLoader() : hideLoader());
  }, [isPending]);

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
  }, [otpTimer]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            className="w-12 h-12 text-center border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white focus:border-emerald-500 transition-colors"
          />
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {otpError && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {otpError}
          </p>
        )}
      </div>
      <div className="text-center">
        <Button
          variant="link"
          disabled={!canResend}
          onClick={handleResendOtp}
          className={`p-0 h-auto text-sm ${
            canResend
              ? "text-emerald-400 hover:text-emerald-300"
              : "text-slate-500"
          }`}
        >
          {canResend ? "Resend Code" : `Resend in ${otpTimer}s`}
        </Button>
      </div>
    </div>
  );
}

export default Otp;
