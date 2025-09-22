export type ProfileDataType = PersonalInfoType & {
  email: string;
  preferences: string[];
};

export type PersonalInfoType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  DOB: Date | string;
};
