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
    PlayerAcceptDealData: null,
    PlayerDeclineDealData: null,
    PlayerFanRequestData: null,
    PlayerFanCommentData: null,
    PlayerFanCommentsMadeData: null
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
            // console.log('gotten fan deals ',response.data)
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
        .post("player/accept-fan-request", data)
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
        .post("player/decline-fan-request", data)
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

  export const MakePlayerFanCommentApi = createAsyncThunk(
    "makePlayerFanCommentApi/userMakePlayerFanCommentApi",
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
        .post("player/request/comments", data)
        .then(async (response) => {
          console.log('player fan comment shown ',response.data)
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

  export const PlayerFanDealCommentsApi = createAsyncThunk(
    "playerFanDealsCommentsApi/userFanPlayerDealsCommentsApi",
    async ({ id, userId, senderId }, { rejectWithValue }) => {
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
        .get(`player/request-interaction/${id}/${userId}/${senderId}`)
        .then(async (response) => {
          // console.log('player fan comments made details ',response)
          return response;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log("error ", errdata);
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const GetPlayerRequestDetailsApi = createAsyncThunk(
    "playerRequestDeatilsApi/userPlayerRequestDeatilsApi",
    async ({ id, userId, senderId }, { rejectWithValue }) => {
      
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
        .get(`player/fans-request-detail/${id}/${userId}/${senderId}`)
        .then(async (response) => {
          console.log('request details deals ',response.data)
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
        })
        .addCase(PlayerAcceptRequestDetailsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerAcceptRequestDetailsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerAcceptDealData = action.payload;
        })
        .addCase(PlayerAcceptRequestDetailsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerDeleteRequestDetailsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerDeleteRequestDetailsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerDeclineDealData = action.payload;
        })
        .addCase(PlayerDeleteRequestDetailsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(GetPlayerRequestDetailsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(GetPlayerRequestDetailsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerFanRequestData = action.payload;
        })
        .addCase(GetPlayerRequestDetailsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(MakePlayerFanCommentApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(MakePlayerFanCommentApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerFanCommentData = action.payload;
          console.log('player commented ', action.payload)
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
        .addCase(MakePlayerFanCommentApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerFanDealCommentsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerFanDealCommentsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.PlayerFanCommentsMadeData = action.payload;
        })
        .addCase(PlayerFanDealCommentsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset } = PlayerFanSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.PlayerFanSlice;
  export default PlayerFanSlice.reducer;