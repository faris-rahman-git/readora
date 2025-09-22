import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  passwordChecksType,
  RegisterDataForm,
} from "@/types/auth/RegisterType";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

function Password({
  handleInputChange,
  formData,
  passwordsMatch,
  passwordChecks,
  setPasswordChecks,
  passwordError,
}: {
  handleInputChange: (field: string, value: string) => void;
  formData: RegisterDataForm;
  passwordsMatch: boolean;
  passwordChecks: passwordChecksType;
  setPasswordChecks: React.Dispatch<React.SetStateAction<passwordChecksType>>;
  passwordError: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const password = formData.password;
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        {passwordError && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {passwordError}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="newPassword"
          className="text-sm font-medium text-slate-200"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
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

      <div className="space-y-2">
        <Label
          htmlFor="confirmNewPassword"
          className="text-sm font-medium text-slate-200"
        >
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className="h-12 pr-10 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-300" />
            ) : (
              <Eye className="h-4 w-4 text-slate-400 hover:text-slate-300" />
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
    </div>
  );
}

export default Password;
