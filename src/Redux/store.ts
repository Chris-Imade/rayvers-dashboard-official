import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appSlice from "./Splice/AppSplice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    'token',
    'userInfo',
    'profile',
    'restaurant'
  ],
};

const rootReducer = combineReducers({
  data: persistReducer(persistConfig, appSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
