import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    ScoutPicturedata: null,
    ScoutProfileformdata: null,
    ScoutPhysicalStatsdata: null,
    ScoutBusinessServicedata: null,
    ScoutUploadIddata: null,
    ScoutYourImagesdata: null,
    ScoutVerificationStatusData:null,
    ScoutAllProfileDetailsData: null,
    ScoutVideoLinksData: null,
    ScoutSetcoverImgData: null,
    ScoutDeleteImgData: null
  };


  export const ProfileDetailsScout = createAsyncThunk(
    "scoutProfileDetailsScreen/userScoutProfileDetailsScreen",
    async (id, { rejectWithValue }) => {
        
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
        .get(`player/profile/${id}`)
        .then(async (response) => {
            // console.log('profile details ',response.data)
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


  export const ScoutProfileVerificationStatus = createAsyncThunk(
    "scoutVerificationStatus/userScoutVerificationStatus",
    async (id, { rejectWithValue }) => {
        
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
        .get(`scout/profile-progress-bar/${id}`)
        .then(async (response) => {
            // console.log('progress bar ',response.data)
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

  export const ScoutProfilePicture = createAsyncThunk(
    "scoutprofilepicture/userScoutProfilePicture",
    async (details, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: infoneeded
        },
      });
      return await instance
        .post("scout/profile-picture", details)
        .then(async (response) => {
            // console.log('profile picture ',response.data)
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

  export const ScoutSetCoverImg = createAsyncThunk(
    "scoutsetcoverimg/userScoutSetCoverImg",
    async (details, { rejectWithValue }) => {
        
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
        .post("scout/make-cover-page", details)
        .then(async (response) => {
            // console.log('cover image set ',response.data)
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

  export const ScoutDeleteImgApi = createAsyncThunk(
    "scoutdeleteimg/userScoutDeleteImg",
    async ({id, user_id}, { rejectWithValue }) => {
        
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
        .delete(`scout/remove-image/${id}/${user_id}`)
        .then(async (response) => {
            // console.log('deleted img ',response.data)
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

  export const ScoutProfileVideoLink = createAsyncThunk(
    "scoutprofilevideos/userScoutProfileVideos",
    async (details, { rejectWithValue }) => {
        
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
        .post("scout/video_text_url", details)
        .then(async (response) => {
            // console.log('Video links ',response.data)
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

  export const ScoutYourImagesApi = createAsyncThunk(
    "scoutyourimages/userScoutYourImages",
    async (details, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: infoneeded
        },
      });
      return await instance
        .post("scout/images", details)
        .then(async (response) => {
            console.log('your images ',response.data)
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

  export const ScoutProfileProfileformApi = createAsyncThunk(
    "scoutprofileProfileform/userScoutprofileProfileform",
    async (details, { rejectWithValue }) => {
        
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
        .post("scout/bio", details)
        .then(async (response) => {
          console.log('response gotten ', response.data)
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


  export const ScoutProfilePhysicalStatsApi = createAsyncThunk(
    "scoutprofilePhysicalStats/userScoutprofilePhysicalStats",
    async (details, { rejectWithValue }) => {
        
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
        .post("scout/physical_stat", details)
        .then(async (response) => {
          // console.log('profile physical stats ', response.data)
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

  export const ScoutProfileBusinessServiceApi = createAsyncThunk(
    "scoutprofileBusinessStats/userScoutprofileBusinessStats",
    async (details, { rejectWithValue }) => {
        
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
        .post("scout/service-type", details)
        .then(async (response) => {
          // console.log('profile business service ', response.data)
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


  export const ScoutProfileUploadIdApi = createAsyncThunk(
    "scoutprofileUploadId/userScoutprofileUploadId",
    async (details, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: infoneeded
        },
      });
      return await instance
        .post("scout/identification", details)
        .then(async (response) => {
          console.log('identification ', response.data)
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


  export const ScoutProfileSlice = createSlice({
    name: "scoutprofile",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(ProfileDetailsScout.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ProfileDetailsScout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.ScoutAllProfileDetailsData = action.payload;
        
      })
      .addCase(ProfileDetailsScout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ScoutProfilePicture.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfilePicture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutPicturedata = action.payload;
          if(action.payload?.message == "Profile Photo Uploaded"){
          toast.success("Profile Photo Uploaded", {
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
          else if(action.payload?.message == "Select an image to upload"){
            toast.error("Select an image to upload", {
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
        .addCase(ScoutProfilePicture.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutSetCoverImg.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutSetCoverImg.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutSetcoverImgData = action.payload;
          if(action.payload?.message == "New Cover Page set"){
          toast.success("New Cover Page set", {
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
        .addCase(ScoutSetCoverImg.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutDeleteImgApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutDeleteImgApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutDeleteImgData = action.payload;
          if(action.payload?.message == "Image deleted"){
          toast.success("Image deleted", {
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
        .addCase(ScoutDeleteImgApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutProfileVerificationStatus.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfileVerificationStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutVerificationStatusData = action.payload;
          
        })
        .addCase(ScoutProfileVerificationStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutYourImagesApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutYourImagesApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutYourImagesdata = action.payload;
          if(action.payload?.message == "Image(s) Uploaded"){
          toast.success("Image(s) Uploaded", {
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
          else if(action.payload?.message == "Select an image to upload"){
            toast.error("Select an image to upload", {
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
        .addCase(ScoutYourImagesApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutProfileProfileformApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfileProfileformApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutProfileformdata = action.payload;
          if(action.payload?.message == "Successful"){
          toast.success("Profile Details Updated", {
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
        .addCase(ScoutProfileProfileformApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutProfilePhysicalStatsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfilePhysicalStatsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutPhysicalStatsdata = action.payload;
          if(action.payload?.message == "Successful"){
          toast.success("Physical Stats Updated", {
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
        .addCase(ScoutProfilePhysicalStatsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutProfileBusinessServiceApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfileBusinessServiceApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutBusinessServicedata = action.payload;
          if(action.payload?.message == "Successful"){
          toast.success("Business service Updated", {
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
        .addCase(ScoutProfileBusinessServiceApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutProfileUploadIdApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfileUploadIdApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutUploadIddata = action.payload;
          if(action.payload?.message == 
            "Image Uploaded"){
          toast.success("Upload Id Updated", {
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
        .addCase(ScoutProfileUploadIdApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(ScoutProfileVideoLink.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfileVideoLink.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ScoutVideoLinksData = action.payload;
          if(action.payload?.message == "Video(s) Uploaded"){
          toast.success("Video(s) Uploaded", {
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
        .addCase(ScoutProfileVideoLink.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
    },
  });
  
  export const { reset } = ScoutProfileSlice.actions;
  
  export const selectScoutProfileSlice = (state) => state.ScoutProfileSlice;
  export default ScoutProfileSlice.reducer;
  