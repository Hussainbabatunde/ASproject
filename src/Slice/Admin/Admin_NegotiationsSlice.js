import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin__Active_Negotiations: null,

  Admin__Active_Negotiations_isError: false,
  Admin__Active_Negotiations_isSuccess: false,
  Admin__Active_Negotiations_isLoading: false,
  Admin__Active_Negotiations_message: null,

  Admin_Get_ScoutsDetails: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const Admin__Active_Negotiations_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/negotiations/active`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin__Active_Negotiations_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_Get_ScoutsDetails_fun",
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
  name: "Admin_Scouts_Slice",
  initialState,

  reducers: {
    reset__Admin_Scouts_Slice: (state, action) => {
      state.Admin_Get_All_Scouts_isError = false;
      state.Admin_Get_All_Scouts_isSuccess = false;
      state.Admin_Get_All_Scouts_isLoading = false;
      state.Admin_Get_All_Scouts_message = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(Admin__Active_Negotiations_fun.pending, (state) => {
        state.Admin__Active_Negotiations_isLoading = true;
      })
      .addCase(Admin__Active_Negotiations_fun.fulfilled, (state, action) => {
        state.Admin__Active_Negotiations = action.payload;
        state.Admin__Active_Negotiations_isSuccess = true;
        state.Admin__Active_Negotiations_isLoading = false;
      })
      .addCase(Admin__Active_Negotiations_fun.rejected, (state, action) => {
        state.Admin__Active_Negotiations_isError = true;
        state.Admin__Active_Negotiations_message = action.payload;
        state.Admin__Active_Negotiations_isLoading = false;
        toast.error(`${state.Admin__Active_Negotiations_message}`, {
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
    //   .addCase(Admin_Get_ScoutsDetails_fun.pending, (state) => {
    //     state.Admin_Get_All_Scouts_isLoading = true;
    //   })
    //   .addCase(Admin_Get_ScoutsDetails_fun.fulfilled, (state, action) => {
    //     state.Admin_Get_ScoutsDetails = action.payload;
    //     state.Admin_Get_All_Scouts_isSuccess = true;
    //     state.Admin_Get_All_Scouts_isLoading = false;
    //   })
    //   .addCase(Admin_Get_ScoutsDetails_fun.rejected, (state, action) => {
    //     state.Admin_Get_All_Scouts_isError = true;
    //     state.Admin_Get_All_Scouts_message = action.payload;
    //     state.Admin_Get_All_Scouts_isLoading = false;
    //     toast.error(`${state.Admin_Get_All_Scouts_message}`, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       className: "Forbidden403",
    //     });
    //   });
  },
});

export const {} = Admin_NegotiationsSlice.actions;
export default Admin_NegotiationsSlice.reducer;
