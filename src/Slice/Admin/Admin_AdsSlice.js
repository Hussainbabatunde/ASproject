import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const initialState = {
  Admin_Ads: null,
  Admin_Ads_isError: false,
  Admin_Ads_isSuccess: false,
  Admin_Ads_isLoading: false,
  Admin_Ads_message: null,
};

const Admin_Ads_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/advert/all-advert`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
export const Admin_Ads_fun = createAsyncThunk(
  "Admin_AdsSlice/Admin_Ads_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_Ads_fun_Service(token);
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

export const Admin_AdsSlice = createSlice({
  name: "Admin_AdsSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Admin_Ads_fun.pending, (state) => {
        state.Admin_Ads_isLoading = true;
      })
      .addCase(Admin_Ads_fun.fulfilled, (state, action) => {
        state.Admin_Ads = action.payload;
        state.Admin_Ads_isSuccess = true;
        state.Admin_Ads_isLoading = false;
      })
      .addCase(Admin_Ads_fun.rejected, (state, action) => {
        state.Admin_Ads_isError = true;
        state.Admin_Ads_message = action.payload;
        state.Admin_Ads_isLoading = false;
        toast.error(`${state.Admin_Ads_message}`, {
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
export const {} = Admin_AdsSlice.actions;
export default Admin_AdsSlice.reducer;
