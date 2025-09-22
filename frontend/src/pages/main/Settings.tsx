import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Heart } from "lucide-react";
import { useGetUserDetails } from "@/hooks/main/settings/useGetUserDetails";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import Header from "@/components/features/main/home/Header";
import ProfileTab from "@/components/features/main/settings/ProfileTab";
import SecurityTab from "@/components/features/main/settings/SecurityTab";
import PreferencesTab from "@/components/features/main/settings/PreferencesTab";
import type { ProfileDataType } from "@/types/main/SettingsTypes";

export default function Settings() {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<ProfileDataType>({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    avatar: "",
    email: "",
    DOB: "",
    preferences: [],
  });

  const { isPending, isSuccess, data, mutate } = useGetUserDetails();
  useEffect(() => {
    mutate();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setProfileData(data.userDetails);
    }
  }, [isSuccess]);
  useEffect(() => {
    const pending = isPending;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full h-[50px] grid-cols-3 bg-slate-900 border-slate-800 ">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-emerald-600 text-white data-[state=active]:text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-emerald-600 text-white data-[state=active]:text-white"
              >
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-emerald-600 text-white data-[state=active]:text-white"
              >
                <Heart className="h-4 w-4 mr-2" />
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileTab
                profileData={profileData}
                setProfileData={setProfileData}
              />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <PreferencesTab
                profileData={profileData}
                setProfileData={setProfileData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
