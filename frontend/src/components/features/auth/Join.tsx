import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  RegisterDataForm,
  ValidationErrorsType,
} from "@/types/auth/RegisterType";
import { ARTICLE_PREFERENCES } from "@/constants/auth/RegisterConst";

function Join({
  handleInputChange,
  validationErrors,
  formData,
  setFormData,
}: {
  handleInputChange: (field: string, value: string) => void;
  validationErrors: ValidationErrorsType;
  formData: RegisterDataForm;
  setFormData: React.Dispatch<React.SetStateAction<RegisterDataForm>>;
}) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferenceSearch, setPreferenceSearch] = useState("");

  const handlePreferenceToggle = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const handlePreferenceConfirm = () => {
    setShowPreferences(false);
    setPreferenceSearch("");
  };

  const filteredPreferences = ARTICLE_PREFERENCES.filter((pref) =>
    pref.toLowerCase().includes(preferenceSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-slate-200"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="h-12 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-slate-200"
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="h-12 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-200">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`h-12 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors ${
            validationErrors.email ? "border-red-500" : ""
          }`}
        />
        {validationErrors.email && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {validationErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-slate-200">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="98765 43210"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`h-12 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-emerald-500 transition-colors ${
            validationErrors.phone ? "border-red-500" : ""
          }`}
        />
        {validationErrors.phone && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {validationErrors.phone}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob" className="text-sm font-medium text-slate-200">
          Date of Birth
        </Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e) => handleInputChange("dob", e.target.value)}
          className="h-12 border-slate-700 focus:ring-0 shadow-none rounded-lg bg-slate-900 text-white focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-200">
          Article Preferences
        </Label>
        <div className="relative">
          <div className="min-h-12 border border-slate-700 rounded-lg bg-slate-900 focus-within:border-emerald-500 p-2 flex flex-wrap gap-1 items-center transition-colors">
            <div className="max-w-full max-h-[27px] overflow-auto p-0 m-0">
              {formData.preferences.map((preference) => (
                <Badge
                  key={preference}
                  variant="secondary"
                  className="bg-emerald-900/50 mx-[2px] cursor-pointer text-emerald-200 hover:bg-emerald-800/50 text-xs border border-emerald-700/50"
                  onClick={() => handlePreferenceToggle(preference)}
                >
                  {preference}
                  <X className="h-3 w-3 ml-1  hover:text-emerald-100" />
                </Badge>
              ))}
            </div>
            <Input
              placeholder={
                formData.preferences.length === 0
                  ? "Search and select preferences..."
                  : "Add more..."
              }
              value={preferenceSearch}
              onChange={(e) => setPreferenceSearch(e.target.value)}
              onFocus={() => setShowPreferences(true)}
              className="border-0 shadow-none p-0 h-8 flex-1 min-w-32 focus:ring-0 bg-transparent text-white placeholder-slate-500"
            />
          </div>
          {showPreferences && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-h-35 overflow-y-auto">
              <div className="p-2 border-b border-slate-700 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-200">
                  Select Preferences
                </span>
                <Button
                  size="sm"
                  onClick={handlePreferenceConfirm}
                  className="h-6 px-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Done
                </Button>
              </div>
              {filteredPreferences.map((preference) => (
                <div
                  key={preference}
                  className="p-2 hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                  onClick={() => handlePreferenceToggle(preference)}
                >
                  <span className="text-sm text-slate-200">{preference}</span>
                  {formData.preferences.includes(preference) && (
                    <Check className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
              ))}
              {filteredPreferences.length === 0 && (
                <div className="p-2 text-sm text-slate-500 text-center">
                  No preferences found
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500">
          {formData.preferences.length} preference
          {formData.preferences.length !== 1 ? "s" : ""} selected
        </p>
      </div>
    </div>
  );
}

export default Join;
