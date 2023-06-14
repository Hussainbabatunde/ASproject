import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const initialState = {
  Transaction_total_amount: null,
  Transaction_total_amount_isError: false,
  Transaction_total_amount_isSuccess: false,
  Transaction_total_amount_isLoading: false,
  Transaction_total_amount_message: null,
  Transaction_list: null,
  Transaction_detail: null,
};

const Transaction_detail_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/finance/transaction-detail/${data}`;
  console.log(data);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(token);

  console.log(response.data);

  return response.data;
};
export const Transaction_detail_fun = createAsyncThunk(
  "TransactionSlice/Transaction_detail_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Transaction_detail_fun_Service(data, token);
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

const Transaction_list_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/finance/transactions`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(token);

  console.log(response.data);

  return response.data;
};
export const Transaction_list_fun = createAsyncThunk(
  "TransactionSlice/Transaction_list_fun",
  async (_, thunkAPI) => {
    try {
      console.log("this is working ");
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Transaction_list_fun_Service(token);
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

const Transaction_total_amount_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/finance/total-amount`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(token);

  console.log(response.data);

  return response.data;
};
export const Transaction_total_amount_fun = createAsyncThunk(
  "TransactionSlice/Transaction_total_amount_fun",
  async (_, thunkAPI) => {
    try {
      console.log("this is working ");
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Transaction_total_amount_fun_Service(token);
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

export const TransactionSlice = createSlice({
  name: "TransactionSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Transaction_total_amount_fun.pending, (state) => {
        state.Transaction_total_amount_isLoading = true;
      })
      .addCase(Transaction_total_amount_fun.fulfilled, (state, action) => {
        state.Transaction_total_amount = action.payload;
        state.Transaction_total_amount_isSuccess = true;
        state.Transaction_total_amount_isLoading = false;
      })
      .addCase(Transaction_total_amount_fun.rejected, (state, action) => {
        state.Transaction_total_amount_isError = true;
        state.Transaction_total_amount_message = action.payload;
        state.Transaction_total_amount_isLoading = false;
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
      })
      .addCase(Transaction_list_fun.pending, (state) => {
        state.Transaction_total_amount_isLoading = true;
      })
      .addCase(Transaction_list_fun.fulfilled, (state, action) => {
        state.Transaction_list = action.payload;
        state.Transaction_total_amount_isSuccess = true;
        state.Transaction_total_amount_isLoading = false;
      })
      .addCase(Transaction_list_fun.rejected, (state, action) => {
        state.Transaction_total_amount_isError = true;
        state.Transaction_total_amount_message = action.payload;
        state.Transaction_total_amount_isLoading = false;
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
export const {} = TransactionSlice.actions;
export default TransactionSlice.reducer;
