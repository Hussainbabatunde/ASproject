import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin___Negotiations: null,

  Admin___Negotiations_isError: false,
  Admin___Negotiations_isSuccess: false,
  Admin___Negotiations_isLoading: false,
  Admin___Negotiations_message: null,

  Admin___Negotiations_detail: null,
  Admin___Negotiations_comment: null,

  Admin___Negotiations_comment_isError: false,
  Admin___Negotiations_comment_isSuccess: false,
  Admin___Negotiations_comment_isLoading: false,
  Admin___Negotiations_comment_message: null,

  Admin_TalentManager___Negotiations_detail: null,
  Admin_TalentManager___Negotiations_detail_isError: false,
  Admin_TalentManager___Negotiations_detail_isSuccess: false,
  Admin_TalentManager___Negotiations_detail_isLoading: false,
  Admin_TalentManager___Negotiations_detail_message: null,
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

const Admin___Negotiations_detail_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/negotiations/detail/${data?.offer_id}/${data?.from_id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const Admin___Negotiations_detail_fun = createAsyncThunk(
  "Admin_NegotiationsSlice/Admin___Negotiations_detail_fun",
  async (data, thunkAPI) => {
    try {
      console.log({
        sssaaa: data,
      });
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin___Negotiations_detail_fun_Service(data, token);
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

const Admin__Talentmanager__Negotiations_detail_fun_Service = async (
  id,
  token
) => {
  let API_URL = `${baseURL}admin/talent-manager/negotiation-detail/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
export const Admin__Talentmanager__Negotiations_detail_fun = createAsyncThunk(
  "Admin_NegotiationsSlice/Admin__Talentmanager__Negotiations_detail_fun",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin__Talentmanager__Negotiations_detail_fun_Service(
        id,
        token
      );
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

const Admin___Negotiations_comment_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/negotiations/offer-comments/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  console.log({ aa: response.data });

  return response.data;
};

export const Admin___Negotiations_comment_fun = createAsyncThunk(
  "Admin_NegotiationsSlice/Admin___Negotiations_comment_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin___Negotiations_comment_fun_Service(data, token);
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
      })
      .addCase(Admin___Negotiations_detail_fun.pending, (state) => {
        state.Admin___Negotiations_isLoading = true;
      })
      .addCase(Admin___Negotiations_detail_fun.fulfilled, (state, action) => {
        state.Admin___Negotiations_detail = action.payload;
        state.Admin___Negotiations_isSuccess = true;
        state.Admin___Negotiations_isLoading = false;
      })
      .addCase(Admin___Negotiations_detail_fun.rejected, (state, action) => {
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
      })

      .addCase(Admin___Negotiations_comment_fun.pending, (state) => {
        state.Admin___Negotiations_comment_isLoading = true;
      })
      .addCase(Admin___Negotiations_comment_fun.fulfilled, (state, action) => {
        state.Admin___Negotiations_comment = action.payload;
        state.Admin___Negotiations_comment_isSuccess = true;
        state.Admin___Negotiations_comment_isLoading = false;
      })
      .addCase(Admin___Negotiations_comment_fun.rejected, (state, action) => {
        state.Admin___Negotiations_comment_isError = true;
        state.Admin___Negotiations_comment_message = action.payload;
        state.Admin___Negotiations_comment_isLoading = false;
        toast.error(`${state.Admin___Negotiations_comment_message}`, {
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
        Admin__Talentmanager__Negotiations_detail_fun.pending,
        (state) => {
          state.Admin_TalentManager___Negotiations_detail_isLoading = true;
        }
      )

      .addCase(
        Admin__Talentmanager__Negotiations_detail_fun.fulfilled,
        (state, action) => {
          state.Admin_TalentManager___Negotiations_detail = action.payload;
          console.log({
            ronaldo: state.Admin_TalentManager___Negotiations_detail,
          });
          state.Admin_TalentManager___Negotiations_detail_isSuccess = true;
          state.Admin_TalentManager___Negotiations_detail_isLoading = false;
        }
      )

      .addCase(
        Admin__Talentmanager__Negotiations_detail_fun.rejected,
        (state, action) => {
          state.Admin_TalentManager___Negotiations_detail_isError = true;
          state.Admin_TalentManager___Negotiations_detail_message =
            action.payload;
          state.Admin_TalentManager___Negotiations_detail_isLoading = false;
          state.Admin_TalentManager___Negotiations_detail = null;

          toast.error(
            `${state.Admin_TalentManager___Negotiations_detail_message}`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              className: "Forbidden403",
            }
          );
        }
      );
  },
});

export const {} = Admin_NegotiationsSlice.actions;
export default Admin_NegotiationsSlice.reducer;
