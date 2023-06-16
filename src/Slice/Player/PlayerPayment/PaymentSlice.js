import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    gottenAllPaymentData: null,
    getOfferPaymentData: null,
    getAdvertPaymentData: null
  };


  export const GetAllPaymentApi = createAsyncThunk(
    "getAllPlaymentApi/userGetAllPaymentApi",
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
        .get('player/payment/transactions')
        .then(async (response) => {
            // console.log('all payments Players ',response.data)
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

  export const GetOfferPaymentApi = createAsyncThunk(
    "getOfferPlaymentApi/userGetOfferPaymentApi",
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
        .get('player/payment/offer-transactions')
        .then(async (response) => {
            // console.log('all offer payments ',response.data)
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


  export const GetAdvertPaymentApi = createAsyncThunk(
    "getAdvertPlaymentApi/userGetAdvertPaymentApi",
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
        .get('player/payment/advert-transactions')
        .then(async (response) => {
            // console.log('all advert payments ',response.data)
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



  export const GetPaymentSlice = createSlice({
    name: "GetAllPlayersPayment",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(GetAllPaymentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetAllPaymentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.gottenAllPaymentData = action.payload;        
      })
      .addCase(GetAllPaymentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetOfferPaymentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetOfferPaymentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getOfferPaymentData = action.payload;        
      })
      .addCase(GetOfferPaymentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetAdvertPaymentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetAdvertPaymentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getAdvertPaymentData = action.payload;        
      })
      .addCase(GetAdvertPaymentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetPaymentSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetPaymentSlice;
  export default GetPaymentSlice.reducer;
  