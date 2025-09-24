import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDataType } from "@/types/auth/LoginType";

const initialState: UserDataType = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  avatar: null,
  preferences: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: UserDataType }>) {
      state.id = action.payload.user.id;
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.avatar = action.payload.user.avatar;
      state.preferences = action.payload.user.preferences;
    },
    logout(state) {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.avatar = null;
      state.preferences = [];
    },
    updateUser(
      state,
      action: PayloadAction<{
        user: Omit<UserDataType, "email" | "id" | "preferences">;
      }>
    ) {
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.avatar = action.payload.user.avatar;
    },
    updatePreferences(state, action: PayloadAction<{ preferences: string[] }>) {
      state.preferences = action.payload.preferences;
    },
  },
});

export const { setUser, logout, updateUser ,updatePreferences} = userSlice.actions;
export default userSlice.reducer;
