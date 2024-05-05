import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  token: string | null;
  userId: number | null;
  userInfo: UserInfo | null;
  profile: Profile | null;
  restaurant: Restaurant[] | null;
  restCredentials: RestLogin[] | null;
}

const initialState: AppState = {
  token: null,
  userId: null,
  userInfo: null,
  profile: null,
  restaurant: null,
  restCredentials: [],
};

export const appSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    setRestaurants: (state, action: PayloadAction<Restaurant[] | null>) => {
      state.restaurant = action.payload;
    },
    createRestCred: (state, action: PayloadAction<RestLogin | null>) => {
      let newCred = [];
      if (state.restCredentials !== null && action.payload !== null) {
        newCred = [...state.restCredentials, action.payload];
        state.restCredentials = newCred;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAccessToken,
  setUserId,
  setUserInfo,
  setProfile,
  setRestaurants,
  createRestCred,
} = appSlice.actions;

export default appSlice.reducer;
