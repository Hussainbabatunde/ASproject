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
  };

  export const ScoutProfilePicture = createAsyncThunk(
    "scoutprofilepicture/userScoutProfilePicture",
    async (details, { rejectWithValue }) => {
        
    // console.log('details ', details)
    for (const [name, value] of details.entries()) {
        console.log(`${name}: ${value}`);
      }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
    // console.log('env file',process.env.REACT_APP_AFRISPORTURL)
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
            console.log('profile picture ',response.data)
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
        .addCase(ScoutProfilePicture.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(ScoutProfilePicture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.ProfilePicturedata = action.payload;
          if(action.payload?.message == 'Access granted'){
          toast.success('Login successful', {
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
          else if(action.payload?.message == 'Invalid username or password'){
            toast.error('Invalid username or password', {
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
    },
  });
  
  export const { reset } = ScoutProfileSlice.actions;
  
  export const selectScoutProfileSlice = (state) => state.ScoutProfileSlice;
  export default ScoutProfileSlice.reducer;
  