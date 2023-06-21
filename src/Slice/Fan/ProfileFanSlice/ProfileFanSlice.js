import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    fanPicturedata: null,
    fanProfileformdata: null,
    fanPhysicalStatsdata: null,
    fanBusinessServicedata: null,
    fanUploadIddata: null,
    fanYourImagesdata: null,
    fanVerificationStatusData:null,
    fanAllProfileDetailsData: null,
    fanVideoLinksData: null,
    fanSetcoverImgData: null,
    fanDeleteImgData: null
  };


  export const ProfileDetailsfan = createAsyncThunk(
    "fanProfileDetailsScreen/userfanProfileDetailsScreen",
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


  export const fanProfileVerificationStatus = createAsyncThunk(
    "fanVerificationStatus/userfanVerificationStatus",
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
        .get(`fan/profile-progress-bar/${id}`)
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

  export const fanProfilePicture = createAsyncThunk(
    "fanprofilepicture/userfanProfilePicture",
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
        .post("fan/profile-picture", details)
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

  export const fanSetCoverImg = createAsyncThunk(
    "fansetcoverimg/userfanSetCoverImg",
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
        .post("fan/make-cover-page", details)
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

  export const fanDeleteImgApi = createAsyncThunk(
    "fandeleteimg/userfanDeleteImg",
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
        .delete(`fan/remove-image/${id}/${user_id}`)
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

  export const fanProfileVideoLink = createAsyncThunk(
    "fanprofilevideos/userfanProfileVideos",
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
        .post("fan/video_text_url", details)
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

  export const fanYourImagesApi = createAsyncThunk(
    "fanyourimages/userfanYourImages",
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
        .post("fan/images", details)
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

  export const fanProfileProfileformApi = createAsyncThunk(
    "fanprofileProfileform/userfanprofileProfileform",
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
        .post("fan/bio", details)
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


  export const fanProfilePhysicalStatsApi = createAsyncThunk(
    "fanprofilePhysicalStats/userfanprofilePhysicalStats",
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
        .post("fan/physical_stat", details)
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

  export const fanProfileBusinessServiceApi = createAsyncThunk(
    "fanprofileBusinessStats/userfanprofileBusinessStats",
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
        .post("fan/service-type", details)
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


  export const fanProfileUploadIdApi = createAsyncThunk(
    "fanprofileUploadId/userfanprofileUploadId",
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
        .post("fan/identification", details)
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


  export const fanProfileSlice = createSlice({
    name: "fanprofile",
    initialState,
    reducers: {
      reset: (state) => {
        Object.assign(state, initialState);
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(ProfileDetailsfan.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ProfileDetailsfan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.fanAllProfileDetailsData = action.payload;
        
      })
      .addCase(ProfileDetailsfan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fanProfilePicture.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfilePicture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanPicturedata = action.payload;
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
        .addCase(fanProfilePicture.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanSetCoverImg.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanSetCoverImg.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanSetcoverImgData = action.payload;
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
        .addCase(fanSetCoverImg.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanDeleteImgApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanDeleteImgApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanDeleteImgData = action.payload;
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
        .addCase(fanDeleteImgApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanProfileVerificationStatus.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfileVerificationStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanVerificationStatusData = action.payload;
          
        })
        .addCase(fanProfileVerificationStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanYourImagesApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanYourImagesApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanYourImagesdata = action.payload;
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
        .addCase(fanYourImagesApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanProfileProfileformApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfileProfileformApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanProfileformdata = action.payload;
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
        .addCase(fanProfileProfileformApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanProfilePhysicalStatsApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfilePhysicalStatsApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanPhysicalStatsdata = action.payload;
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
        .addCase(fanProfilePhysicalStatsApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanProfileBusinessServiceApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfileBusinessServiceApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanBusinessServicedata = action.payload;
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
        .addCase(fanProfileBusinessServiceApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanProfileUploadIdApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfileUploadIdApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanUploadIddata = action.payload;
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
        .addCase(fanProfileUploadIdApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(fanProfileVideoLink.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(fanProfileVideoLink.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.fanVideoLinksData = action.payload;
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
        .addCase(fanProfileVideoLink.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
    },
  });
  
  export const { reset } = fanProfileSlice.actions;
  
  export const selectfanProfileSlice = (state) => state.fanProfileSlice;
  export default fanProfileSlice.reducer;
  