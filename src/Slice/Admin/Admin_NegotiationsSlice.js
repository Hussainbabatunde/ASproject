import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin___Negotiations: null,

  Admin___Negotiations_isError: false,
  Admin___Negotiations_isSuccess: false,
  Admin___Negotiations_isLoading: false,
  Admin___Negotiations_message: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const Admin__Active_Negotiations_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/negotiations/active`;
  let API_URL_close = `${baseURL}admin/negotiations/closed`;
  let API_URL_terminante = `${baseURL}admin/negotiations/terminated`;
  let API_URL_suspend = `${baseURL}admin/negotiations/suspended`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Active = await axios.get(API_URL, config);
  const Close = await axios.get(API_URL_close, config);
  const Terminate = await axios.get(API_URL_terminante, config);
  const Suspended = await axios.get(API_URL_suspend, config);

  let Admin__Active_Negotiations = Active.data;
  let Admin__Close_Negotiations = Close.data;
  let Admin__Terminate_Negotiations = Terminate.data;
  let Admin__Suspended_Negotiations = Suspended.data;

  let Admin___Negotiations = {
    Admin__Active_Negotiations,
    Admin__Close_Negotiations,
    Admin__Terminate_Negotiations,
    Admin__Suspended_Negotiations,
  };

  return Admin___Negotiations;
};

export const Admin___Negotiations_fun = createAsyncThunk(
  "Admin_NegotiationsSlice/Admin___Negotiations_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin__Active_Negotiations_fun_Service(token);
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

export const Admin_NegotiationsSlice = createSlice({
  name: "Admin_NegotiationsSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Admin___Negotiations_fun.pending, (state) => {
        state.Admin___Negotiations_isLoading = true;
      })
      .addCase(Admin___Negotiations_fun.fulfilled, (state, action) => {
        state.Admin___Negotiations = action.payload;
        state.Admin___Negotiations_isSuccess = true;
        state.Admin___Negotiations_isLoading = false;
      })
      .addCase(Admin___Negotiations_fun.rejected, (state, action) => {
        state.Admin___Negotiations_isError = true;
        state.Admin___Negotiations_message = action.payload;
        state.Admin___Negotiations_isLoading = false;
        toast.error(`${state.Admin___Negotiations_message}`, {
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

export const {} = Admin_NegotiationsSlice.actions;
export default Admin_NegotiationsSlice.reducer;
