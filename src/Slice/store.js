import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/Login";
import ScoutProfileSlice from "./Scout/Scoutprofile/ScoutProfileSlice";
import PlayerProfileSlice from "./Player/Playerprofile/PlayerProfileSlice";
import AdminAllAdminSlice from "./Admin/AdminAllAdmins/AdminPermissionSlice";
import PlayerVisitSlice from "./Player/PlayerView/PlayerViewSlice";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import RoleSlice from "./Admin/AdminAllAdmins/RoleSlice";
import AdminUserSlice from "./Admin/AdminAllAdmins/AdminUserSlice";
import AdminPrivilageSlice from "./Admin/AdminAllAdmins/AdminPrivilageSlice";
import AuthorizeSlice from "./Admin/AuthorizeSlice";
import AdminUpdate_profileSlice from "./Admin/AdminUpdate_profileSlice";
import AdminDashboardSlice from "./Admin/AdminDashboardSlice";
import Admin_Scouts_Slice from "./Admin/Admin_Scouts_Slice";
const rootReducer = combineReducers({
  LoginSlice: LoginSlice,
  ScoutProfileSlice: ScoutProfileSlice,
  PlayerProfileSlice: PlayerProfileSlice,
  AdminAllAdminSlice: AdminAllAdminSlice,
  RoleSlice: RoleSlice,
  AdminUserSlice: AdminUserSlice,
  AdminPrivilageSlice: AdminPrivilageSlice,
  AuthorizeSlice: AuthorizeSlice,
  LoginSlice: LoginSlice,
  PlayerVisitSlice: PlayerVisitSlice,
  AdminUpdate_profileSlice: AdminUpdate_profileSlice,
  AdminDashboardSlice: AdminDashboardSlice,
  Admin_Scouts_Slice: Admin_Scouts_Slice,
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
