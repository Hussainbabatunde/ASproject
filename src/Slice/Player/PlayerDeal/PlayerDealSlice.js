import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    PlayerDealData: null,
  };

  export const PlayerDealsApi = createAsyncThunk(
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
        .get('activities/offer')
        .then(async (response) => {
            console.log('gotten deals ',response.data)
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


  export const GetAllPlayerDealSlice = createSlice({
    name: "GetAllPlayerDeals",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(PlayerDealsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(PlayerDealsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.PlayerDealData = action.payload;        
      })
      .addCase(PlayerDealsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetAllPlayerDealSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetAllPlayerDealSlice;
  export default GetAllPlayerDealSlice.reducer;
  