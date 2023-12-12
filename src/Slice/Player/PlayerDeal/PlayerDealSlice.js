import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    PlayerDealData: null,
    getOfferDetailsData: null,
    acceptPlayerOfferDetails: null,
    deletePlayerOfferDetails: null,
    downloadPlayerOfferDetails: null,
    detailsDealData: null,
    commentMadeData: null,
    commentsOfferData: null
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
        .get('player/offers')
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


export const PlayerDealsDetailsApi = createAsyncThunk(
  "playerDealsDetailsApi/userPlayerDealsDetailsApi",
  async (id, { rejectWithValue }) => {
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
      .get(`user/profile/${id}`)
      .then(async (response) => {
        // console.log('deals details ',response.data)
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

export const DealCommentsApi = createAsyncThunk(
  "playerDealsCommentsApi/userPlayerDealsCommentsApi",
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
      .get(`player/offer/interaction/${id}/${userId}/${senderId}`)
      .then(async (response) => {
        // console.log('comments made details ',response)
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

export const MakeCommentApi = createAsyncThunk(
  "makeCommentApi/usermakeCommentApi",
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
      .post("player/offer/comments", data)
      .then(async (response) => {
        // console.log('comment shown ',response.data)
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

export const GetPlayerOfferDetailsApi = createAsyncThunk(
  "playerOfferDeatilsApi/userPlayerOfferDeatilsApi",
  async ({ id, userId }, { rejectWithValue }) => {
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
      .get(`player/offer/detail/${id}/${userId}`)
      .then(async (response) => {
        // console.log('offer details deals ',response.data)
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

export const GetPlayerOfferDownloadApi = createAsyncThunk(
  "playerOfferDownloadApi/userPlayerOfferDownloadApi",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
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
        responseType: "blob", // Set the response type to 'blob' for downloading files
      });

      const response = await instance.get(
        `player/offer/download/${id}/${userId}`
      );

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to simulate a click on it
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); // Set the desired filename

      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL and link element
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      let errdata = err.response.data;
      console.log("error ", errdata);
      return rejectWithValue(errdata);
    }
  }
);

export const PlayerAcceptOfferDetailsApi = createAsyncThunk(
  "playerAcceptOfferDeatilsApi/userPlayerAcceptOfferDeatilsApi",
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
      .post("player/offer/accept", data)
      .then(async (response) => {
        console.log("accept deals ", response.data);
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

export const PlayerDeleteOfferDetailsApi = createAsyncThunk(
  "playerDeleteOfferDeatilsApi/userPlayerDeleteOfferDeatilsApi",
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
      .post("player/offer/decline", data)
      .then(async (response) => {
        console.log("decline deals ", response.data);
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

export const ScoutDeleteOfferDetailsApi = createAsyncThunk(
  "scoutDeleteOfferDeatilsApi/userScoutDeleteOfferDeatilsApi",
  async (id, { rejectWithValue }) => {
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
      .post(`scout/remove-offer/${id}`)
      .then(async (response) => {
        // console.log("scout decline deals ", response.data);
        if(response?.message == 'Offer alredy accetped, cant be deleted' ){
        toast.error(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "Forbidden403",
        });
      }

      else if (response?.message == 'Offer deleted.'){
        toast.success(`${response?.message} `, {
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

export const GetAllPlayerDealSlice = createSlice({
  name: "GetAllPlayerDeals",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    }
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
      .addCase(GetPlayerOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetPlayerOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getOfferDetailsData = action.payload;
      })
      .addCase(GetPlayerOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(PlayerAcceptOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(PlayerAcceptOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.acceptPlayerOfferDetails = action.payload;
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
      .addCase(PlayerAcceptOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetPlayerOfferDownloadApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetPlayerOfferDownloadApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.downloadPlayerOfferDetails = action.payload;
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
      .addCase(GetPlayerOfferDownloadApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(PlayerDeleteOfferDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(PlayerDeleteOfferDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.deletePlayerOfferDetails = action.payload;
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
      .addCase(PlayerDeleteOfferDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(PlayerDealsDetailsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(PlayerDealsDetailsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.detailsDealData = action.payload;
      })
      .addCase(PlayerDealsDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(MakeCommentApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(MakeCommentApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.commentMadeData = action.payload;
      })
      .addCase(MakeCommentApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(DealCommentsApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(DealCommentsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.commentsOfferData = action.payload;
      })
      .addCase(DealCommentsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = GetAllPlayerDealSlice.actions;

export const selectPlayerProfileSlice = (state) => state.GetAllPlayerDealSlice;
export default GetAllPlayerDealSlice.reducer;
