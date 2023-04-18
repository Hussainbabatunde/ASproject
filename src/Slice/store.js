import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/Login";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    LoginSlice: LoginSlice,
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