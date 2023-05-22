import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin_Get_All_Scouts: null,
  Admin_Get_All_Scouts_isError: false,
  Admin_Get_All_Scouts_isSuccess: false,
  Admin_Get_All_Scouts_isLoading: false,
  Admin_Get_All_Scouts_message: null,

  Admin_Get_ScoutsDetails: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const Admin_Get_All_Scouts_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/scout/negotiation`;

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

export const Admin_Get_All_Scouts_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_Get_All_Review_Player_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Get_All_Scouts_fun_Service(token);
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

const Admin_Get_ScoutsDetails_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/scout/profile/22`;

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

export const Admin_Get_ScoutsDetails_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_Get_ScoutsDetails_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      console.log(data);
      return await Admin_Get_ScoutsDetails_fun_Service(data, token);
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

export const Admin_Scouts_Slice = createSlice({
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

      .addCase(Admin_Get_All_Scouts_fun.pending, (state) => {
        state.Admin_Get_All_Scouts_isLoading = true;
      })
      .addCase(Admin_Get_All_Scouts_fun.fulfilled, (state, action) => {
        state.Admin_Get_All_Scouts = action.payload;
        state.Admin_Get_All_Scouts_isSuccess = true;
        state.Admin_Get_All_Scouts_isLoading = false;
      })
      .addCase(Admin_Get_All_Scouts_fun.rejected, (state, action) => {
        state.Admin_Get_All_Scouts_isError = true;
        state.Admin_Get_All_Scouts_message = action.payload;
        state.Admin_Get_All_Scouts_isLoading = false;
        toast.error(`${state.Admin_Get_All_Scouts_message}`, {
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

export const { reset__Admin_Scouts_Slice } = Admin_Scouts_Slice.actions;
export default Admin_Scouts_Slice.reducer;
