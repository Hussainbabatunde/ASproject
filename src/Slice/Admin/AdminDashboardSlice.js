import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin_Header_Summary: null,
  Admin_Header_Summary_isError: false,
  Admin_Header_Summary_isSuccess: false,
  Admin_Header_Summary_isLoading: false,
  Admin_Header_Summary_message: null,

  Admin_dashboard_approved_player: null,

  Admin_dashboard_active_negotiations: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const Admin_Header_Summary_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/dashboard/summary`;
  console.log(API_URL);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

export const Admin_Header_Summary_fun = createAsyncThunk(
  "AdminDashboardSlice/Players_Under_Review_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Header_Summary_fun_Service(token);
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

const Admin_dashboard_approved_player_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/dashboard/approved-player`;
  console.log(API_URL);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

export const Admin_dashboard_approved_player_fun = createAsyncThunk(
  "AdminDashboardSlice/Admin_dashboard_approved_player_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_dashboard_approved_player_fun_Service(token);
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

const Admin_dashboard_active_negotiations_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/dashboard/active-negotiations`;
  console.log(API_URL);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

export const Admin_dashboard_active_negotiations_fun = createAsyncThunk(
  "AdminDashboardSlice/Admin_dashboard_active_negotiations_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_dashboard_active_negotiations_fun_Service(token);
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

export const AdminDashboardSlice = createSlice({
  name: "AdminDashboardSlice",
  initialState,

  reducers: {
    reset__dashbord: (state, action) => {
      state.Players_Under_Review_isError = false;
      state.Players_Under_Review_isSuccess = false;
      state.Players_Under_Review_isLoading = false;
      state.Players_Under_Review_message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Admin_Header_Summary_fun.pending, (state) => {
        state.Admin_Header_Summary_isLoading = true;
      })
      .addCase(Admin_Header_Summary_fun.fulfilled, (state, action) => {
        state.Admin_Header_Summary = action.payload;
        state.Admin_Header_Summary_isSuccess = true;
        state.Admin_Header_Summary_isLoading = false;
      })
      .addCase(Admin_Header_Summary_fun.rejected, (state, action) => {
        state.Admin_Header_Summary_isError = true;
        state.Admin_Header_Summary_message = action.payload;
        state.Admin_Header_Summary_isLoading = false;
        toast.error(`${state.Admin_Header_Summary_message}`, {
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

      .addCase(
        Admin_dashboard_approved_player_fun.fulfilled,
        (state, action) => {
          state.Admin_dashboard_approved_player = action.payload;
          state.Admin_Header_Summary_isSuccess = true;
          state.Admin_Header_Summary_isLoading = false;
        }
      )

      .addCase(
        Admin_dashboard_active_negotiations_fun.fulfilled,
        (state, action) => {
          state.Admin_dashboard_active_negotiations = action.payload;
          state.Admin_Header_Summary_isSuccess = true;
          state.Admin_Header_Summary_isLoading = false;
        }
      );
  },
});

export const {} = AdminDashboardSlice.actions;
export default AdminDashboardSlice.reducer;
