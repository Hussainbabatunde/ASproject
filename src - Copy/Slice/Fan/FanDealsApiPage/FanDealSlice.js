import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    fanDealData: null,
    getOfferDetailsData: null,
    acceptfanOfferDetails: null,
    deletefanOfferDetails: null,
    downloadfanOfferDetails: null,
    fancommentedData: null,
    fanCommentMadePlayerData: null
  };

  export const fanDealsApi = createAsyncThunk(
    "fanDealsApi/userfanDealsApi",
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
        .get('fan/requests')
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

  export const GetfanOfferDetailsApi = createAsyncThunk(
    "fanOfferDeatilsApi/userfanOfferDeatilsApi",
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
        .get(`fan/offer/detail/${id}/${userId}`)
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

  export const GetfanOfferDownloadApi = createAsyncThunk(
    'fanOfferDownloadApi/userfanOfferDownloadApi',
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
  
        const response = await instance.get(`fan/offer/download/${id}/${userId}`);
  
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

  export const FanDealsApi = createAsyncThunk(
    "fanDealsApi/userFanDealsApi",
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
        .get('fan/offers')
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

  export const fanAcceptOfferDetailsApi = createAsyncThunk(
    "fanAcceptOfferDeatilsApi/userfanAcceptOfferDeatilsApi",
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
        .post('fan/offer/accept', data)
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

  export const fanDeleteOfferDetailsApi = createAsyncThunk(
    "fanDeleteOfferDeatilsApi/userfanDeleteOfferDeatilsApi",
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
        .post('fan/offer/decline', data)
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

  export const FanMakeCommentApi = createAsyncThunk(
    "fanMakeCommentApi/userfanMakeCommentApi",
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
        .post('fan/request/comments', data)
        .then(async (response) => {
            // console.log('fan comment shown ',response.data)
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

  export const FanFanDealCommentsApi = createAsyncThunk(
    "FanFanDealsCommentsApi/userFanFanDealsCommentsApi",
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
        .get(`fan/request-interactions/${id}/${senderId}/${userId}`)
        .then(async (response) => {
          console.log(' fan comments made details lrt',response)
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


  export const GetAllfanDealSlice = createSlice({
    name: "GetAllfanDeals",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(fanDealsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(fanDealsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.fanDealData = action.payload;        
      })
      .addCase(fanDealsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetfanOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetfanOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getOfferDetailsData = action.payload;        
      })
      .addCase(GetfanOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fanAcceptOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(fanAcceptOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.acceptfanOfferDetails = action.payload;
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
      .addCase(fanAcceptOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(FanMakeCommentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(FanMakeCommentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.fancommentedData = action.payload;
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
      .addCase(FanMakeCommentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetfanOfferDownloadApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetfanOfferDownloadApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.downloadfanOfferDetails = action.payload;
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
      .addCase(GetfanOfferDownloadApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fanDeleteOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(fanDeleteOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.deletefanOfferDetails = action.payload;
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
      .addCase(fanDeleteOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(FanFanDealCommentsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(FanFanDealCommentsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.fanCommentMadePlayerData = action.payload;
               
      })
      .addCase(FanFanDealCommentsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    },
  });
  
  export const { reset } = GetAllfanDealSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.GetAllfanDealSlice;
  export default GetAllfanDealSlice.reducer;
  