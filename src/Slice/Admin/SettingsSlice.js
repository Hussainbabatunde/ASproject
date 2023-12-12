import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const initialState = {
  Settings_isError: false,
  Settings_isSuccess: false,
  Settings_isLoading: false,
  Settings_message: null,
  Settings: null,
};

const Settings_fun_Service = async (token) => {
  let API_URL_percentage = `${baseURL}admin/percentage`;
  let API_URL_market_fee = `${baseURL}admin/market-fee`;
  let API_URL_sorting = `${baseURL}admin/sorting`;
  let API_URL_advert_fee = `${baseURL}admin/advert-fee`;
  let API_URL_montly_advert_fee = `${baseURL}admin/monthly-advert-fee
  `;
  console.log({
    API_URL_montly_advert_fee,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const percentage_response = await axios.get(API_URL_percentage, config);
  const market_response = await axios.get(API_URL_market_fee, config);
  const sorting_response = await axios.get(API_URL_sorting, config);
  const advert_response = await axios.get(API_URL_advert_fee, config);
  const advert_monthly_response = await axios.get(
    API_URL_montly_advert_fee,
    config
  );

  console.log({ sss: advert_monthly_response?.data });
  let percentage = percentage_response.data,
    market = market_response.data,
    sorting = sorting_response.data,
    advert = advert_response.data,
    advert_monthly = advert_monthly_response.data;

  return { percentage, market, sorting, advert, advert_monthly };
};

export const Settings_fun = createAsyncThunk(
  "SettingsSlice/Settings_fun",
  async (_, thunkAPI) => {
    try {
      console.log("this is working ");
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Settings_fun_Service(token);
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

export const SettingsSlice = createSlice({
  name: "SettingsSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Settings_fun.pending, (state) => {
        state.Settings_isLoading = true;
      })
      .addCase(Settings_fun.fulfilled, (state, action) => {
        state.Settings = action.payload;
        state.Settings_isSuccess = true;
        state.Settings_isLoading = false;
      })
      .addCase(Settings_fun.rejected, (state, action) => {
        state.Settings_isError = true;
        state.Settings_message = action.payload;
        state.Settings_isLoading = false;
        toast.error(`error`, {
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
export const {} = SettingsSlice.actions;
export default SettingsSlice.reducer;
