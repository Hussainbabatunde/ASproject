import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { createAction } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    ProfilePicturedata: null,
    ProfileProfileformdata: null,
    ProfilePhysicalStatsdata: null,
    ProfileBusinessServicedata: null,
    ProfileUploadIddata: null,
    ProfileYourImagesdata: null,
    VerificationStatusData:null,
    AllProfileDetailsData: null,
    ProfileVideoLinksData: null,
    ProfileSetcoverImgData: null,
    ProfileDeleteImgData: null,
    ProfileDeleteVideoData: null,
    ProfileFanServiceData: null,
    ProfileAdvertisePlayerData: null
  };


  export const ProfileDetailsPlayer = createAsyncThunk(
    "playerProfileDetailsScreen/userPlayerProfileDetailsScreen",
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
        .get(`user/profile/${id}`)
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


  export const PlayerProfileVerificationStatus = createAsyncThunk(
    "playerVerificationStatus/userPlayerVerificationStatus",
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
        .get(`player/profile-progress-bar/${id}`)
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

  export const PlayerProfilePicture = createAsyncThunk(
    "playerprofilepicture/userPlayerProfilePicture",
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
        .post("player/profile-picture", details)
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

  export const PlayerProfileFanServiceApi = createAsyncThunk(
    "playerprofilefanservice/userPlayerProfileFanService",
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
        .post("player/fan-service-price", details)
        .then(async (response) => {
            // console.log('fan service ',response.data)
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

  export const PlayerSetCoverImg = createAsyncThunk(
    "playersetcoverimg/userPlayerSetCoverImg",
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
        .post("player/make-cover-page", details)
        .then(async (response) => {
            console.log('cover image set ',response.data)
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

  export const PlayerDeleteImgApi = createAsyncThunk(
    "playerdeleteimg/userPlayerDeleteImg",
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
        .delete(`player/remove-image/${id}/${user_id}`)
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

  export const PlayerDeleteVideoApi = createAsyncThunk(
    "playerdeletevideo/userPlayerDeleteVideo",
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
        .delete(`player/remove-video-url/${id}/${user_id}`)
        .then(async (response) => {
            console.log('deleted video ',response.data)
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


  export const PlayerProfileVideoLink = createAsyncThunk(
    "playerprofilevideos/userPlayerProfileVideos",
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
        .post("player/video_text_url", details)
        .then(async (response) => {
            console.log('Video links ',response.data)
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

  export const PlayerYourImagesApi = createAsyncThunk(
    "playeryourimages/userPlayerYourImages",
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
        .post("player/images", details)
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

  export const PlayerProfileProfileformApi = createAsyncThunk(
    "playerprofileProfileform/userPlayerprofileProfileform",
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
        .post("player/bio", details)
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


  export const PlayerProfilePhysicalStatsApi = createAsyncThunk(
    "playerprofilePhysicalStats/userPlayerprofilePhysicalStats",
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
        .post("player/physical_stat", details)
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

  export const PlayerProfileBusinessServiceApi = createAsyncThunk(
    "playerprofileBusinessStats/userPlayerprofileBusinessStats",
    async (details, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
        // console.log(details);
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
        .post("player/service-type", details)
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


  export const PlayerProfileUploadIdApi = createAsyncThunk(
    "playerprofileUploadId/userPlayerprofileUploadId",
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
        .post("player/identification", details)
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


  export const PlayerProfileAdvertiseApi = createAsyncThunk(
    "playerprofileadvertise/userPlayerProfileAdvertise",
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
        .post("player/advertise", details)
        .then(async (response) => {
            // console.log('advertise response ',response.data)
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
  
  export const resetState = createAction('resetState');



  export const PlayerProfileSlice = createSlice({
    name: "playerprofile",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(PlayerProfileAdvertiseApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(PlayerProfileAdvertiseApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.ProfileAdvertisePlayerData = action.payload;
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
      .addCase(PlayerProfileAdvertiseApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ProfileDetailsPlayer.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ProfileDetailsPlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.AllProfileDetailsData = action.payload;
        
      })
      .addCase(ProfileDetailsPlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(PlayerProfilePicture.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfilePicture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfilePicturedata = action.payload;
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
        .addCase(PlayerProfilePicture.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfileFanServiceApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfileFanServiceApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileFanServiceData = action.payload;
          if(action.payload?.message == "Player service successfully updated"){
          toast.success("Fan service price Updated successfully", {
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
        .addCase(PlayerProfileFanServiceApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerSetCoverImg.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerSetCoverImg.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileSetcoverImgData = action.payload;
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
        .addCase(PlayerSetCoverImg.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerDeleteImgApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerDeleteImgApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileDeleteImgData = action.payload;
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
        .addCase(PlayerDeleteImgApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerDeleteVideoApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerDeleteVideoApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileDeleteImgData = action.payload;
          if(action.payload?.message == "Video deleted"){
          toast.success("Video deleted", {
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
        .addCase(PlayerDeleteVideoApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfileVerificationStatus.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfileVerificationStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.VerificationStatusData = action.payload;
          
        })
        .addCase(PlayerProfileVerificationStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerYourImagesApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerYourImagesApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileYourImagesdata = action.payload;
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
        .addCase(PlayerYourImagesApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfileProfileformApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfileProfileformApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileProfileformdata = action.payload;
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
        .addCase(PlayerProfileProfileformApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfilePhysicalStatsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfilePhysicalStatsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfilePhysicalStatsdata = action.payload;
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
        .addCase(PlayerProfilePhysicalStatsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfileBusinessServiceApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfileBusinessServiceApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileBusinessServicedata = action.payload;
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
        .addCase(PlayerProfileBusinessServiceApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfileUploadIdApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfileUploadIdApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileUploadIddata = action.payload;
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
        .addCase(PlayerProfileUploadIdApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(PlayerProfileVideoLink.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(PlayerProfileVideoLink.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfileVideoLinksData = action.payload;
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
        .addCase(PlayerProfileVideoLink.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(resetState, (state) => {
          Object.assign(state, initialState);
        });
    },
  });
  
  // export const { reset } = PlayerProfileSlice.actions;
  export const { reducer, actions } = PlayerProfileSlice;

  
  export const selectPlayerProfileSlice = (state) => state.PlayerProfileSlice;
  export default PlayerProfileSlice.reducer;
  