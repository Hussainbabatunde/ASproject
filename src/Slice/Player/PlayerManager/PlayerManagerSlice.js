import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    PlayerManagerDealData: null,
    PlayerAcceptManagerDealData: null,
    PlayerDeclineManagerDealData: null
  };

  export const PlayerManagerDealsApi = createAsyncThunk(
    "playerMangerDealsApi/userPlayerManagerDealsApi",
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
        .get('player/managers-request')
        .then(async (response) => {
            // console.log('managers request ',response.data)
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

  export const PlayerAcceptManagerDetailsApi = createAsyncThunk(
    "playerAcceptManagerDeatilsApi/userPlayerAcceptManagerDeatilsApi",
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
          console.log("accept manager deals ", response.data);
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


  export const PlayerDeleteManagerDetailsApi = createAsyncThunk(
    "playerDeleteManagerDeatilsApi/userPlayerDeleteManagerDeatilsApi",
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
          console.log("decline manager deals ", response.data);
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

  export const PlayerManagerSlice = createSlice({
    name: "PlayerManagerDealsSlice",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(PlayerManagerDealsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerManagerDealsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerManagerDealData = action.payload;
        })
        .addCase(PlayerManagerDealsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerAcceptManagerDetailsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerAcceptManagerDetailsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerAcceptManagerDealData = action.payload;
          toast.success(`${action.payload.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .addCase(PlayerAcceptManagerDetailsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerDeleteManagerDetailsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerDeleteManagerDetailsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerDeclineManagerDealData = action.payload;
          toast.success(`${action.payload.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .addCase(PlayerDeleteManagerDetailsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset } = PlayerManagerSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.PlayerManagerSlice;
  export default PlayerManagerSlice.reducer;