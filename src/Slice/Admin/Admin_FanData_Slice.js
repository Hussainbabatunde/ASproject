import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const initialState = {
  Admin_Fan: null,
  Admin_Fan_isError: false,
  Admin_Fan_isSuccess: false,
  Admin_Fan_isLoading: false,
  Admin_Fan_message: null,

  Single_Admin_Fan: null,
};

const Admin_FanData__fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/fans/negotiation`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_FanData__fun = createAsyncThunk(
  "Admin_FanData_Slice/Admin_FanData__fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_FanData__fun_Service(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const Single_Admin_Fan__fun_Service = async (id, token) => {
  let API_URL = `${baseURL}admin/fans/profile/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Single_Admin_Fan__fun = createAsyncThunk(
  "Admin_FanData_Slice/Single_Admin_Fan__fun",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Single_Admin_Fan__fun_Service(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const Admin_FanData_Slice = createSlice({
  name: "Admin_FanData_Slice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Admin_FanData__fun.pending, (state) => {
        state.Admin_Fan_isLoading = true;
      })
      .addCase(Admin_FanData__fun.fulfilled, (state, action) => {
        state.Admin_Fan = action.payload;
        state.Admin_Fan_isSuccess = true;
        state.Admin_Fan_isLoading = false;
      })
      .addCase(Admin_FanData__fun.rejected, (state, action) => {
        state.Admin_Fan_isError = true;
        state.Admin_Fan_message = action.payload;
        state.Admin_Fan_isLoading = false;
        toast.error(`${state.Admin_Fan_message}`, {
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
      })

      .addCase(Single_Admin_Fan__fun.pending, (state) => {
        state.Admin_Fan_isLoading = true;
      })
      .addCase(Single_Admin_Fan__fun.fulfilled, (state, action) => {
        state.Single_Admin_Fan = action.payload;
        state.Admin_Fan_isSuccess = true;
        state.Admin_Fan_isLoading = false;
      })
      .addCase(Single_Admin_Fan__fun.rejected, (state, action) => {
        state.Admin_Fan_isError = true;
        state.Admin_Fan_message = action.payload;
        state.Admin_Fan_isLoading = false;
        toast.error(`${state.Admin_Fan_message}`, {
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
      });
  },
});

export const {} = Admin_FanData_Slice.actions;
export default Admin_FanData_Slice.reducer;
