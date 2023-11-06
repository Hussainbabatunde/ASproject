import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/Login";
import ScoutProfileAction from "./Scout/ProfileScoutSlice/ProfileScoutSlice";
import PlayerProfileSlice from "./Player/Playerprofile/PlayerProfileSlice";
import AdminAllAdminSlice from "./Admin/AdminAllAdmins/AdminPermissionSlice";
import PlayerVisitSlice from "./Player/PlayerView/PlayerViewSlice";
import GetPlayerSlice from "./Player/PlayerHomePage/GetAllPlayersHomePage";
import GetAllPlayerDealSlice from "./Player/PlayerDeal/PlayerDealSlice";
import PlayerFanSlice from "./Player/PlayerDeal/PlayerFanDealSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import RoleSlice from "./Admin/AdminAllAdmins/RoleSlice";
import AdminUserSlice from "./Admin/AdminAllAdmins/AdminUserSlice";
import AdminPrivilageSlice from "./Admin/AdminAllAdmins/AdminPrivilageSlice";
import AuthorizeSlice from "./Admin/AuthorizeSlice";
import AdminUpdate_profileSlice from "./Admin/AdminUpdate_profileSlice";
import ScoutDealsSlice from "./Scout/ScoutDealsApiPage/ScoutDealSlice";
import FanDealsSlice from "./Fan/FanDealsApiPage/FanDealSlice";
import FanProfileSlice from "./Fan/ProfileFanSlice/ProfileFanSlice";
import AdminDashboardSlice from "./Admin/AdminDashboardSlice";
import Admin_Scouts_Slice from "./Admin/Admin_Scouts_Slice";
import Admin_NegotiationsSlice from "./Admin/Admin_NegotiationsSlice";
import Admin_FanData_Slice from "./Admin/Admin_FanData_Slice";
import AdminTalentMangerSlice from "./Admin/AdminTalentMangerSlice";
import Talent_manager_slice from "./Talent_Manager/Talent_manager_slice";
import PlayerManagerSlice from "./Player/PlayerManager/PlayerManagerSlice";
import Admin_AdsSlice from "./Admin/Admin_AdsSlice";
import TransactionSlice from "./Admin/TransactionSlice";
import GetPaymentSlice from "./Player/PlayerPayment/PaymentSlice";
import SettingsSlice from "./Admin/SettingsSlice";

const reducers = combineReducers({
  LoginSlice: LoginSlice,
  PlayerProfileSlice: PlayerProfileSlice,
  AdminAllAdminSlice: AdminAllAdminSlice,
  PlayerVisitSlice: PlayerVisitSlice,
  GetPlayerSlice: GetPlayerSlice,
  GetAllPlayerDealSlice: GetAllPlayerDealSlice,
  PlayerFanSlice: PlayerFanSlice,
  ScoutProfileAction: ScoutProfileAction,
  RoleSlice: RoleSlice,
  AdminUserSlice: AdminUserSlice,
  AdminPrivilageSlice: AdminPrivilageSlice,
  AuthorizeSlice: AuthorizeSlice,
  AdminUpdate_profileSlice: AdminUpdate_profileSlice,
  ScoutDealsSlice: ScoutDealsSlice,
  AdminDashboardSlice: AdminDashboardSlice,
  Admin_Scouts_Slice: Admin_Scouts_Slice,
  Admin_NegotiationsSlice: Admin_NegotiationsSlice,
  Admin_FanData_Slice: Admin_FanData_Slice,
  FanDealsSlice: FanDealsSlice,
  FanProfileSlice: FanProfileSlice,
  AdminTalentMangerSlice: AdminTalentMangerSlice,
  PlayerManagerSlice: PlayerManagerSlice,
  Talent_manager_slice: Talent_manager_slice,
  Admin_AdsSlice: Admin_AdsSlice,
  TransactionSlice: TransactionSlice,
  GetPaymentSlice: GetPaymentSlice,
  SettingsSlice: SettingsSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    console.log("his is working ");
    storage.removeItem("persist:root");
    state = {};
  }
  return reducers(state, action);
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
