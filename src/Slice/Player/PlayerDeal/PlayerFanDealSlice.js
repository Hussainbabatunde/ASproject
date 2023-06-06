import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    PlayerFanDealData: null,
  };

  export const PlayerFanDealsApi = createAsyncThunk(
    "playerDealsApi/userPlayerDealsApi",
    async (_, { rejectWithValue }) => {
        
        const tokengot = localStorage.getItem("token");
        const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded
        },
      });
      return await instance
        .get('player/requests')
        .then(async (response) => {
            console.log('gotten fan deals ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const PlayerAcceptRequestDetailsApi = createAsyncThunk(
    "playerAcceptRequestDeatilsApi/userPlayerAcceptRequestDeatilsApi",
    async (data, { rejectWithValue }) => {
      // console.log(data)
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded,
        },
      });
      return await instance
        .post("player/accept-request", data)
        .then(async (response) => {
          console.log("accept fan deals ", response.data);
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log("error ", errdata);
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const PlayerDeleteRequestDetailsApi = createAsyncThunk(
    "playerDeleteRequestDeatilsApi/userPlayerDeleteRequestDeatilsApi",
    async (data, { rejectWithValue }) => {
      // console.log(data)
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded,
        },
      });
      return await instance
        .post("player/decline-request", data)
        .then(async (response) => {
          console.log("decline fan deals ", response.data);
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log("error ", errdata);
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );


  export const PlayerFanSlice = createSlice({
    name: "PlayerFanDealsSlice",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(PlayerFanDealsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerFanDealsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerFanDealData = action.payload;
        })
        .addCase(PlayerFanDealsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset } = PlayerFanSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.PlayerFanSlice;
  export default PlayerFanSlice.reducer;