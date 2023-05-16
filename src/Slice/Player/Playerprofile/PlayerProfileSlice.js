import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
    AllProfileDetailsData: null
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
        
    for (const [name, value] of details.entries()) {
        console.log(`${name}: ${value}`);
      }
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


  export const PlayerProfileSlice = createSlice({
    name: "playerprofile",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
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
      }).addCase(PlayerProfilePicture.pending, (state) => {
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
    },
  });
  
  export const { reset } = PlayerProfileSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.PlayerProfileSlice;
  export default PlayerProfileSlice.reducer;
  