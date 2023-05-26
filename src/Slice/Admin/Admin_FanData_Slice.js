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

  Admin_fan_get_negotiations: null,
  Admin_fan_get_negotiations_isError: false,
  Admin_fan_get_negotiations_isSuccess: false,
  Admin_fan_get_negotiations_isLoading: false,
  Admin_fan_get_negotiations_message: null,
};

const Admin_fan_get_negotiations_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/fans/active-negotiations/${data}`;
  let API_URL_close = `${baseURL}admin/fans/closed-negotiations/${data}`;
  let API_URL_terminante = `${baseURL}admin/fans/terminated-negotiations/${data}`;
  let API_URL_suspend = `${baseURL}admin/fans/suspended-negotiations/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Active = await axios.get(API_URL, config);
  const Close = await axios.get(API_URL_close, config);
  const Terminate = await axios.get(API_URL_terminante, config);
  const Suspended = await axios.get(API_URL_suspend, config);

  let Admin__Fan__Active_Negotiations = Active.data;
  let Admin__Fan__Close_Negotiations = Close.data;
  let Admin__Fan__Terminate_Negotiations = Terminate.data;
  let Admin__Fan__Suspended_Negotiations = Suspended.data;

  let Admin___Fan__Negotiations = {
    Admin__Fan__Active_Negotiations,
    Admin__Fan__Close_Negotiations,
    Admin__Fan__Terminate_Negotiations,
    Admin__Fan__Suspended_Negotiations,
  };

  return Admin___Fan__Negotiations;
};

export const Admin_fan_get_negotiations_fun = createAsyncThunk(
  "Admin_FanData_Slice/Admin_fan_get_negotiations_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_fan_get_negotiations_fun_Service(data, token);
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

const Admin_FanData__fun_Service = async (token) => {
  let API_URL_All_Fan = `${baseURL}admin/fans/negotiation`;
  let API_URL_ALL_suspended_Fan = `${baseURL}admin/fans/all-suspended`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const AllFan = await axios.get(API_URL_All_Fan, config);
  const suspendedFan = await axios.get(API_URL_ALL_suspended_Fan, config);

  let AllFan_data = AllFan.data;
  let suspendedFan_data = suspendedFan.data;

  let Fans_data = {
    AllFan_data,
    suspendedFan_data,
  };

  return Fans_data;
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
      })

      .addCase(Admin_fan_get_negotiations_fun.pending, (state) => {
        state.Admin_fan_get_negotiations_isLoading = true;
      })
      .addCase(Admin_fan_get_negotiations_fun.fulfilled, (state, action) => {
        state.Admin_fan_get_negotiations = action.payload;
        state.Admin_fan_get_negotiations_isSuccess = true;
        state.Admin_fan_get_negotiations_isLoading = false;
      })
      .addCase(Admin_fan_get_negotiations_fun.rejected, (state, action) => {
        state.Admin_fan_get_negotiations_isError = true;
        state.Admin_fan_get_negotiations_message = action.payload;
        state.Admin_fan_get_negotiations_isLoading = false;
        toast.error(`${state.Admin_fan_get_negotiations_message}`, {
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
