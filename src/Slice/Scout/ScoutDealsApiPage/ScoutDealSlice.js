import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    ScoutDealData: null,
    getOfferDetailsData: null,
    acceptScoutOfferDetails: null,
    deleteScoutOfferDetails: null,
    downloadScoutOfferDetails: null,
    scoutMakeCommentData: null,
    scoutcommentsOfferData: null,
    updateScoutOfferData: null,
    scoutMakePaymentData: null
  };

  export const ScoutDealsApi = createAsyncThunk(
    "scoutDealsApi/userScoutDealsApi",
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
        .get('scout/offer')
        .then(async (response) => {
            // console.log('gotten deals ',response.data)
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

  export const GetScoutOfferDetailsApi = createAsyncThunk(
    "scoutOfferDeatilsApi/userScoutOfferDeatilsApi",
    async ({id, userId}, { rejectWithValue }) => {
        
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
        .get(`scout/offer/detail/${id}/${userId}`)
        .then(async (response) => {
            // console.log('offer details deals ',response.data)
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

  export const ScoutMakeCommentApi = createAsyncThunk(
    "scoutMakeCommentApi/userscoutMakeCommentApi",
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
        .post('scout/offer/comments', data)
        .then(async (response) => {
            // console.log('comment shown ',response.data)
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


  export const ScoutMakePaymentApi = createAsyncThunk(
    "scoutMakePaymentApi/userscoutMakePaymentApi",
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
        .post('scout/payment/pay', data)
        .then(async (response) => {
            // console.log('scout paid ',response.data)
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

  export const ScoutUpdateOfferApi = createAsyncThunk(
    "scoutUpdateOfferApi/userscoutUpdateOfferApi",
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
        .put('scout/offer/update', data)
        .then(async (response) => {
            console.log('updated offer  ',response.data)
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

  export const ScoutDealCommentsApi = createAsyncThunk(
    "scoutDealsCommentsApi/userScoutDealsCommentsApi",
    async ({id, userId, senderId}, { rejectWithValue }) => {
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
        .get(`scout/offer/interaction/${id}/${senderId}/${userId}`)
        .then(async (response) => {
            // console.log('comments made details ',response)
          return response;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const GetScoutOfferDownloadApi = createAsyncThunk(
    'scoutOfferDownloadApi/userScoutOfferDownloadApi',
    async ({ id, userId }, { rejectWithValue }) => {
      try {
        const tokengot = localStorage.getItem('token');
        const infoneeded = `Bearer ${tokengot}`;
        const instance = axios.create({
          baseURL: process.env.REACT_APP_AFRISPORTURL,
          timeout: 20000,
  
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: infoneeded,
          },
          responseType: 'blob', // Set the response type to 'blob' for downloading files
        });
  
        const response = await instance.get(`scout/offer/download/${id}/${userId}`);
  
        // Create a temporary URL for the downloaded file
        const url = window.URL.createObjectURL(new Blob([response.data]));
  
        // Create a link element to simulate a click on it
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); // Set the desired filename
  
        document.body.appendChild(link);
        link.click();
  
        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (err) {
        let errdata = err.response.data;
        console.log('error ', errdata);
        return rejectWithValue(errdata);
      }
    }
  );

  export const ScoutAcceptOfferDetailsApi = createAsyncThunk(
    "scoutAcceptOfferDeatilsApi/userScoutAcceptOfferDeatilsApi",
    async (data, { rejectWithValue }) => {
        // console.log(data)
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
        .post('scout/offer/accept', data)
        .then(async (response) => {
            console.log('accept deals ',response.data)
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

  export const ScoutDeleteOfferDetailsApi = createAsyncThunk(
    "scoutDeleteOfferDeatilsApi/userScoutDeleteOfferDeatilsApi",
    async (data, { rejectWithValue }) => {
        // console.log(data)
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
        .post('scout/offer/decline', data)
        .then(async (response) => {
            console.log('decline deals ',response.data)
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


  export const GetAllScoutDealSlice = createSlice({
    name: "GetAllScoutDeals",
    initialState,
    reducers: {
      reset: (state) => {
        Object.assign(state, initialState);
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(ScoutDealsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutDealsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.ScoutDealData = action.payload;        
      })
      .addCase(ScoutDealsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetScoutOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetScoutOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getOfferDetailsData = action.payload;        
      })
      .addCase(GetScoutOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutAcceptOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutAcceptOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.acceptScoutOfferDetails = action.payload;
        if (action.payload?.message == "Offer Accepted") {
          toast.success("Offer Accepted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }        
      })
      .addCase(ScoutAcceptOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutMakePaymentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutMakePaymentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.scoutMakePaymentData = action.payload;
          toast.success(`${action.payload.data}`, {
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
      .addCase(ScoutMakePaymentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutUpdateOfferApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutUpdateOfferApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.updateScoutOfferData = action.payload;
          toast.success("Offer Details Updated", {
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
      .addCase(ScoutUpdateOfferApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetScoutOfferDownloadApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetScoutOfferDownloadApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.downloadScoutOfferDetails = action.payload;
        if (action.payload?.message == "Offer Accepted") {
          toast.success("Offer Accepted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }        
      })
      .addCase(GetScoutOfferDownloadApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutDeleteOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutDeleteOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.deleteScoutOfferDetails = action.payload;
        if (action.payload?.message == "Offer Accepted") {
          toast.success("Offer Accepted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }        
      })
      .addCase(ScoutDeleteOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutMakeCommentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutMakeCommentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.scoutMakeCommentData = action.payload;        
      })
      .addCase(ScoutMakeCommentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutDealCommentsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ScoutDealCommentsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.scoutcommentsOfferData = action.payload;        
      })
      .addCase(ScoutDealCommentsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetAllScoutDealSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetAllScoutDealSlice;
  export default GetAllScoutDealSlice.reducer;
  