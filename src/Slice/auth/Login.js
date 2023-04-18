import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";




const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  logindata: null,
  registerData: null,
  forgotPasswordData: null, 
  logoutData: null,
  resetPasswordData: null
};


export const RegisterAuth = createAsyncThunk(
  "register/userRegistered",
  async (details, { rejectWithValue }) => {
  //   const tokengot = await AsyncStorage.getItem("token");
  //   const infoneeded = `Bearer ${tokengot}`;
  // console.log('env file',process.env.REACT_APP_AFRISPORTURL)
    const instance = axios.create({
      baseURL: process.env.REACT_APP_AFRISPORTURL ,
      timeout: 20000,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await instance
      .post("signup", details)
      .then(async (response) => {
          // console.log('signup ',response.data)
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


export const loginAuth = createAsyncThunk(
    "login/userlogin",
    async (details, { rejectWithValue }) => {
    //   const tokengot = await AsyncStorage.getItem("token");
    //   const infoneeded = `Bearer ${tokengot}`;
    // console.log('env file',process.env.REACT_APP_LMSURL)
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .post("login", details)
        .then(async (response) => {
          if (response.data.plus.token !== undefined) {
            localStorage.setItem('token', response.data.plus.token)
          }            
          // console.log(response.data)
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

  export const ForgotPasswordAuth = createAsyncThunk(
    "forgotpassword/userForgotPassword",
    async (details, { rejectWithValue }) => {
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .post("forgot-password", details)
        .then(async (response) => {
            console.log(response.data)
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

  export const LogoutAuth = createAsyncThunk(
    "logout/userLogout",
    async (_, { rejectWithValue }) => {
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      return await instance
        .post("logout")
        .then(async (response) => {
            console.log(response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
        });
    }
  );

  export const ResetPasswordAuth = createAsyncThunk(
    "resetPassword/userResetPassword",
    async (details, { rejectWithValue }) => {
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      });
      return await instance
        .post("email/set-new-password", details)
        .then(async (response) => {
            console.log(response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
        });
    }
  );

export const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.logindata = action.payload;
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
      .addCase(loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(RegisterAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(RegisterAuth.fulfilled, (state, action) => {
        console.log('register state ', action?.payload)
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.registerData = action.payload;
        if(action.payload?.message == 'Registration Successful. Email Verification Link sent to your email'){
        toast.success('Registration Successful. Email Verification Link sent to your email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }else if(action.payload?.data?.email[0] == 'The email has already been taken.'){
          toast.error('The email has already been taken.', {
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
      .addCase(RegisterAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        
      })
      .addCase(ForgotPasswordAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ForgotPasswordAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.forgotPasswordData = action.payload;
        if(action.payload?.message == 'Reset Link sent to your email'){
        toast.success('Reset Link sent to your email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        } else if(action.payload?.message == 'No match found for your input'){
          toast.error('No match found', {
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
      .addCase(ForgotPasswordAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        
      })
      .addCase(LogoutAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(LogoutAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.logoutData = action.payload;
        state.logindata= null;
        if(action.payload?.message == 'User Successfully logged out'){
        toast.success('User Successfully logged out', {
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
      .addCase(LogoutAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.logoutData = null;
        
      })
      .addCase(ResetPasswordAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(ResetPasswordAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.resetPasswordData = action.payload;
        if(action.payload?.message){
        toast.success(action.payload?.message, {
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
      .addCase(ResetPasswordAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        
      });
  },
});

export const { reset } = LoginSlice.actions;

export const selectLoginSlice = (state) => state.LoginSlice;
export default LoginSlice.reducer;
