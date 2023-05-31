import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    ProfileVisitsdata: null,
    offerDetailsData: null,
    requestDetailData: null
  };

  export const ProfileVisitsNumber = createAsyncThunk(
    "playerProfileVisits/userPlayerProfileVisits",
    async (_, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
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
        .get('player/views')
        .then(async (response) => {
            // console.log('view number ',response.data)
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

  export const OfferPlayApi = createAsyncThunk(
    "offerPlayerApi/userOfferPlayerApi",
    async (data, { rejectWithValue }) => {
       
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
        .post('scout/make-offer', data)
        .then(async (response) => {
            // console.log('offer details ',response.data)
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

  export const MakeRequestDetailApi = createAsyncThunk(
    "makeRequestApi/userMakeRequestApi",
    async (data, { rejectWithValue }) => {
       
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
        .post('fan/make-request', data)
        .then(async (response) => {
            // console.log('request details ',response.data)
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


  export const PlayerVisitSlice = createSlice({
    name: "playerVisits",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(ProfileVisitsNumber.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ProfileVisitsNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.ProfileVisitsdata = action.payload;        
      })
      .addCase(ProfileVisitsNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(OfferPlayApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(OfferPlayApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.offerDetailsData = action.payload;     
          toast.success("Offer Created", {
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
      .addCase(OfferPlayApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(MakeRequestDetailApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(MakeRequestDetailApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.offerDetailsData = action.payload;     
          toast.success("Request sent", {
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
      .addCase(MakeRequestDetailApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = PlayerVisitSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.PlayerVisitSlice;
  export default PlayerVisitSlice.reducer;
  