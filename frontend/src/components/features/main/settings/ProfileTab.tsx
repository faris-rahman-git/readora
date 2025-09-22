import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Camera, Trash2 } from "lucide-react";
import type { ProfileDataType } from "@/types/main/SettingsTypes";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "@/hooks/main/settings/useUpdateProfile";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import axios from "axios";
import { validatePhone } from "@/utils/validate";
import { useUploadImage } from "@/hooks/common/useUploadImage";
import { updateUser } from "@/redux/features/auth/userSlice";

function ProfileTab({
  profileData,
  setProfileData,
}: {
  profileData: ProfileDataType;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileDataType>>;
}) {
  const dispatch = useDispatch();
  const [fieldsError, setFieldsError] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    DOB: "",
    avatar: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handlePersonalInfoChange = (
    field: keyof ProfileDataType,
    value: string | Date
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const { isPending, isSuccess, mutate, error, isError } = useUpdateProfile();
  const {
    isPending: isPendingUpload,
    mutate: mutateUpload,
    data: dataUpload,
    isSuccess: isSuccessUpload,
  } = useUploadImage();

  const handleSavePersonalInfo = () => {
    const errors: typeof fieldsError = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      DOB: "",
      avatar: "",
    };

    if (!profileData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!profileData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!validatePhone(profileData.phoneNumber)) {
      errors.phoneNumber = "Phone number is required and should be 10 digits";
    }
    if (!profileData.DOB) {
      errors.DOB = "Date of birth is required";
    }
    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) {
      setFieldsError(errors);
      return;
    }
    setFieldsError({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      DOB: "",
      avatar: "",
    });

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "readora_medias");
      setImageFile(null);
      mutateUpload(formData);
    } else {
      handleMutateChanges(profileData.avatar);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateUser({
          user: {
            avatar: profileData.avatar,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
          },
        })
      );
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessUpload) {
      handleMutateChanges(dataUpload.secure_url);
    }
  }, [isSuccessUpload]);
  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        setFieldsError(error.response?.data?.message);
      }
    }
  }, [isError]);
  useEffect(() => {
    const pending = isPending || isPendingUpload;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending, isPendingUpload]);

  const handleMutateChanges = (avatarUrl: string) => {
    mutate({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      DOB: profileData.DOB,
      avatar: avatarUrl,
    });
  };

  const handleAvatarChange = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      setFieldsError((prev) => ({
        ...prev,
        avatar: "File size should be less than 2MB",
      }));
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setProfileData((prev) => ({ ...prev, avatar: previewUrl }));
    setImageFile(file);
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileData.avatar} />
            <AvatarFallback className="bg-slate-800 text-slate-300 text-lg">
              {(profileData.firstName[0] || "").toUpperCase()}
              {(profileData.lastName[0] || "").toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="avatarUpload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleAvatarChange(file);
                }
              }}
            />
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              onClick={() => document.getElementById("avatarUpload")?.click()}
            >
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>

            {profileData.avatar && (
              <Button
                variant="outline"
                className="border-slate-700 ms-2 text-slate-300 hover:bg-slate-800 bg-transparent"
                onClick={() =>
                  setProfileData((prev) => ({ ...prev, avatar: "" }))
                }
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}

            <p className="text-sm text-slate-500">JPG or PNG. Max size 2MB.</p>
            {fieldsError.avatar && (
              <p className="text-sm text-red-500">{fieldsError.avatar}</p>
            )}
          </div>
        </div>

        <Separator className="bg-slate-800" />

        {/* Personal Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-slate-300">
              First Name
            </Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) =>
                handlePersonalInfoChange("firstName", e.target.value)
              }
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
            />
            {fieldsError.firstName && (
              <p className="text-sm text-red-500">{fieldsError.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-slate-300">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) =>
                handlePersonalInfoChange("lastName", e.target.value)
              }
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
            />
            {fieldsError.lastName && (
              <p className="text-sm text-red-500">{fieldsError.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={profileData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  handlePersonalInfoChange("phoneNumber", value);
                }
              }}
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
            />
            {fieldsError.phoneNumber && (
              <p className="text-sm text-red-500">{fieldsError.phoneNumber}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dateOfBirth" className="text-slate-300">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={
                profileData.DOB
                  ? new Date(profileData.DOB).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => handlePersonalInfoChange("DOB", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white focus:border-emerald-500"
            />

            {fieldsError.DOB && (
              <p className="text-sm text-red-500">{fieldsError.DOB}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSavePersonalInfo}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileTab;
