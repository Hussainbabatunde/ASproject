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
    getAdvertPaymentData: null,
    getMarketPriceData: null,
    getAdvertFeesdata: null,
    getAdvertPaidData: null
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
            console.log('all payments Players ',response.data)
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

  export const AdvertSentApi = createAsyncThunk(
    "advertSentApi/userAdvertSentApi",
    async (data, { rejectWithValue }) => {
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
        .post("player/advertise", data)
        .then(async (response) => {
          console.log('advert works ',response.data)
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

  export const GetAdvertFeesApi = createAsyncThunk(
    "getAdvertfeesApi/userGetAdvertfeesApi",
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
        .get('advert-fees')
        .then(async (response) => {
            // console.log('fees ',response.data)
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
            console.log('all offer payments ',response.data)
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
            console.log('all advert payments ',response.data)
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


  export const GetMarketPriceApi = createAsyncThunk(
    "getMarketPriceApi/userGetMarketPriceApi",
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
        .get('market-fee')
        .then(async (response) => {
            console.log('market place price ',response.data)
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
      reset: (state) => {
        Object.assign(state, initialState);
      }
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
      .addCase(AdvertSentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(AdvertSentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getAdvertPaidData = action.payload;        
      })
      .addCase(AdvertSentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetAdvertFeesApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetAdvertFeesApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getAdvertFeesdata = action.payload;        
      })
      .addCase(GetAdvertFeesApi.rejected, (state, action) => {
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
      .addCase(GetMarketPriceApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetMarketPriceApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getMarketPriceData = action.payload;        
      })
      .addCase(GetMarketPriceApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetPaymentSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetPaymentSlice;
  export default GetPaymentSlice.reducer;
  