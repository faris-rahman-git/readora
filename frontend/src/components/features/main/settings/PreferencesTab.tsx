import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ARTICLE_PREFERENCES } from "@/constent/Preferences";
import type { ProfileDataType } from "@/types/main/SettingsTypes";
import type React from "react";
import { useUpdatePreference } from "@/hooks/main/settings/useUpdatePreference";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";

function PreferencesTab({
  profileData,
  setProfileData,
}: {
  profileData: ProfileDataType;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileDataType>>;
}) {
  const [preferenceSearch, setPreferenceSearch] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);
  const dispatch = useDispatch();
  const handlePreferenceToggle = (preference: string) => {
    setProfileData((prev) => ({
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

  const { isPending, mutate } = useUpdatePreference();

  const handleUpdatePreferences = () => {
    setShowPreferences(false);
    setPreferenceSearch("");
    mutate({ preferences: profileData.preferences });
  };

  useEffect(() => {
    const pending = isPending;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending]);

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Article Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="min-h-12 border border-slate-700 rounded-lg bg-slate-800 focus-within:border-emerald-500 p-2 flex flex-wrap gap-1 items-center">
            {profileData.preferences.map((preference) => (
              <Badge key={preference} className="pr-1">
                {preference}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePreferenceToggle(preference)}
                  className="h-5 w-4 p-0 ml-1  hover:bg-emerald-800"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Input
              placeholder={
                profileData.preferences.length === 0
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
            <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
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
                  className="p-2 hover:bg-slate-700 cursor-pointer flex items-center justify-between"
                  onClick={() => handlePreferenceToggle(preference)}
                >
                  <span className="text-sm text-slate-200">{preference}</span>
                  {profileData.preferences.includes(preference) && (
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
          {profileData.preferences.length} preference
          {profileData.preferences.length !== 1 ? "s" : ""} selected
        </p>

        <Button
          onClick={handleUpdatePreferences}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Update Preferences
        </Button>
      </CardContent>
    </Card>
  );
}

export default PreferencesTab;
