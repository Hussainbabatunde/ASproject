import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/Login";
import ScoutProfileSlice from "./Scout/Scoutprofile/ScoutProfileSlice";
import PlayerProfileSlice from "./Player/Playerprofile/PlayerProfileSlice";
import AdminAllAdminSlice from "./Admin/AdminAllAdmins/AdminPermissionSlice";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import RoleSlice from "./Admin/AdminAllAdmins/RoleSlice";
import AdminUserSlice from "./Admin/AdminAllAdmins/AdminUserSlice";
const rootReducer = combineReducers({
  LoginSlice: LoginSlice,
  ScoutProfileSlice: ScoutProfileSlice,
  PlayerProfileSlice: PlayerProfileSlice,
  AdminAllAdminSlice: AdminAllAdminSlice,
  RoleSlice: RoleSlice,
  AdminUserSlice: AdminUserSlice,
});
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
