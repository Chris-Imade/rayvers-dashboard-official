import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
  token: string | null;
}

const initialState: AppState = {
  token: null,
};

export const appSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setAccessToken,
} = appSlice.actions;

export default appSlice.reducer;
