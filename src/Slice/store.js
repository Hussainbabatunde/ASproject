import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/Login";
import ScoutProfileAction from "./Scout/ProfileScoutSlice/ProfileScoutSlice";
import PlayerProfileSlice from './Player/Playerprofile/PlayerProfileSlice'
import AdminAllAdminSlice from './Admin/AdminAllAdmins/AdminPermissionSlice'
import PlayerVisitSlice from './Player/PlayerView/PlayerViewSlice'
import GetPlayerSlice from './Player/PlayerHomePage/GetAllPlayersHomePage'
import GetAllPlayerDealSlice  from "./Player/PlayerDeal/PlayerDealSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    LoginSlice: LoginSlice,
    PlayerProfileSlice: PlayerProfileSlice,
    AdminAllAdminSlice: AdminAllAdminSlice,
    PlayerVisitSlice: PlayerVisitSlice,
    GetPlayerSlice: GetPlayerSlice,
    GetAllPlayerDealSlice: GetAllPlayerDealSlice,
    ScoutProfileAction: ScoutProfileAction
  });
const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: {
        reducer: persistedReducer,
      },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  })

  export const persistor = persistStore(store)