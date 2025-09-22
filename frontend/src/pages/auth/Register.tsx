import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import Join from "@/components/features/auth/Join";
import { Link, useNavigate } from "react-router-dom";
import Otp from "@/components/features/auth/Otp";
import Password from "@/components/features/auth/Password";
import { useRegister } from "@/hooks/auth/useRegister";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import axios from "axios";
import { useOtp } from "@/hooks/auth/useOtp";
import { usePasswordAndSave } from "@/hooks/auth/usePasswordAndSave";
import { validateEmail, validatePhone } from "@/utils/validate";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<
    "register" | "otp" | "password"
  >("register");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    preferences: [] as string[],
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "email") {
      setValidationErrors((prev) => ({
        ...prev,
        email:
          value && !validateEmail(value)
            ? "Please enter a valid email address"
            : "",
      }));
    }

    if (field === "phone") {
      const phoneDigits = value.replace(/\D/g, "").slice(0, 10); // Limit to 10 digits
      let formattedPhone = phoneDigits;

      // Format as XXXXX XXXXX for Indian numbers
      if (phoneDigits.length > 5) {
        formattedPhone = `${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`;
      }

      setFormData((prev) => ({ ...prev, [field]: formattedPhone }));
      setValidationErrors((prev) => ({
        ...prev,
        phone:
          phoneDigits.length > 0 && !validatePhone(phoneDigits)
            ? "Please enter a valid 10-digit Indian phone number"
            : "",
      }));
      return;
    }
  };

  const isPasswordValid = Object.values(passwordChecks).every((check) => check);
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const isRegistrationValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    validateEmail(formData.email) &&
    validatePhone(formData.phone) &&
    formData.dob !== "" &&
    formData.preferences.length > 0;

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phone: "",
  });

  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    isPending: isPendingRegister,
    isSuccess: isSuccessRegister,
    mutate: mutateRegister,
    isError: isErrorRegister,
    error: errorRegister,
  } = useRegister();
  const {
    isPending: isPendingOtp,
    isSuccess: isSuccessOtp,
    mutate: mutateOtp,
    isError: isErrorOtp,
    error: errorOtp,
  } = useOtp();
  const {
    isPending: isPendingSave,
    isSuccess: isSuccessSave,
    mutate: mutateSave,
    isError: isErrorSave,
    error: errorSave,
  } = usePasswordAndSave();

  const handleButton = () => {
    if (currentView === "register") {
      mutateRegister({
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
      });
    } else if (currentView === "otp") {
      const otpString = otp.join("");
      if (otpString.trim() !== "") {
        mutateOtp({ otp: otpString, email: formData.email });
      }
    } else {
      if (isRegistrationValid) {
        mutateSave({ ...formData, phone: formData.phone.replace(/\D/g, "") });
      }
    }
  };

  useEffect(() => {
    if (isSuccessRegister) {
      setCurrentView("otp");
    }
  }, [isSuccessRegister]);
  useEffect(() => {
    if (isSuccessOtp) {
      setCurrentView("password");
    }
  }, [isSuccessOtp]);
  useEffect(() => {
    if (isSuccessSave) {
      navigate("/login");
    }
  }, [isSuccessSave]);

  useEffect(() => {
    if (isErrorRegister) {
      if (axios.isAxiosError(errorRegister)) {
        setValidationErrors(errorRegister.response?.data?.message);
      }
    }
  }, [isErrorRegister]);
  useEffect(() => {
    if (isErrorOtp) {
      if (axios.isAxiosError(errorOtp)) {
        setOtpError(errorOtp.response?.data?.message);
      }
    }
  }, [isErrorOtp]);
  useEffect(() => {
    if (isErrorSave) {
      if (axios.isAxiosError(errorSave)) {
        setPasswordError(errorSave.response?.data?.message);
      }
    }
  }, [isErrorSave]);

  useEffect(() => {
    const isLoading = isPendingRegister || isPendingOtp || isPendingSave;
    dispatch(isLoading ? showLoader() : hideLoader());
  }, [isPendingRegister, isPendingOtp, isPendingSave]);

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          {(currentView === "otp" || currentView === "password") && (
            <Button
              variant="ghost"
              onClick={() => setCurrentView("register")}
              className="absolute left-8 top-8 p-2 hover:bg-slate-800 cursor-pointer text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h2 className="text-3xl text-white font-semibold">
            {currentView === "register" && "Join Readora"}
            {currentView === "otp" && "Verify Your Account"}
            {currentView === "password" && "Set Your Password"}
          </h2>
          <p className="text-slate-400">
            {currentView === "register" &&
              "Create your account to start discovering great articles."}
            {currentView === "otp" &&
              `We sent a verification code to ${formData.email}`}
            {currentView === "password" &&
              "Create a secure password for your account."}
          </p>
        </div>

        {currentView === "register" && (
          <Join
            handleInputChange={handleInputChange}
            validationErrors={validationErrors}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentView === "otp" && (
          <Otp
            otp={otp}
            setOtp={setOtp}
            otpError={otpError}
            email={formData.email}
            setCurrentView={setCurrentView}
            setValidationErrors={setValidationErrors}
          />
        )}

        {currentView === "password" && (
          <Password
            handleInputChange={handleInputChange}
            formData={formData}
            passwordsMatch={passwordsMatch}
            passwordChecks={passwordChecks}
            setPasswordChecks={setPasswordChecks}
            passwordError={passwordError}
          />
        )}

        {/* Action Button */}
        <Button
          className="w-full h-12 text-sm font-medium text-white hover:bg-emerald-700 rounded-lg shadow-none cursor-pointer bg-emerald-600 transition-colors"
          onClick={handleButton}
          disabled={
            (currentView === "register" && !isRegistrationValid) ||
            (currentView === "password" &&
              (!isPasswordValid || !passwordsMatch))
          }
        >
          {currentView === "register" && "Continue"}
          {currentView === "otp" && "Verify"}
          {currentView === "password" && "Complete Registration"}
        </Button>

        {/* Footer Links */}
        {currentView === "register" && (
          <div className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="p-0 ms-1 h-auto text-sm hover:text-emerald-300 font-medium cursor-pointer text-emerald-400"
            >
              Sign in.
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
