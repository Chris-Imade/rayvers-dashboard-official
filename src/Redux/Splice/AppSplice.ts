import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
  token: string | null;
  userId: number | null;
  userInfo: UserInfo | null;
  profile: Profile | null;
}

const initialState: AppState = {
  token: null,
  userId: null,
  userInfo: null,
  profile: null,
};

export const appSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setAccessToken,
  setUserId,
  setUserInfo,
  setProfile,
} = appSlice.actions;

export default appSlice.reducer;
