import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin_Get_All_Scouts: null,
  Admin_Get_All_Scouts_isError: false,
  Admin_Get_All_Scouts_isSuccess: false,
  Admin_Get_All_Scouts_isLoading: false,
  Admin_Get_All_Scouts_message: null,

  Admin_Get_All_Suspended_Scouts: null,
  Admin_Get_ScoutsDetails: null,
  Single_Scout_Negotiations_Detail: null,
  Details_Of_Scout_Negotiations_Detail: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");
const Details_Of_Scout_Negotiations_Detail_fun_Service = async (
  data,
  token
) => {
  if (data === null || data === undefined) {
    console.log("error");
  } else {
    let API_URL = `${baseURL}admin/scout/negotiation-detail/${data?.User}/${data?.OfferId}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);

    console.log(response.data);

    return response.data;
  }
};

export const Details_Of_Scout_Negotiations_Detail_fun = createAsyncThunk(
  "Admin_Scouts_Slice/Details_Of_Scout_Negotiations_Detail_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Details_Of_Scout_Negotiations_Detail_fun_Service(
        data,
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

const Admin_Get_All_Suspended_Scouts_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/scout/all-suspended`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_Get_All_Suspended_Scouts_fun = createAsyncThunk(
  "Admin_Scouts_Slice/Admin_Get_All_Suspended_Scouts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Get_All_Suspended_Scouts_fun_Service(token);
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

const Admin_Get_All_Scouts_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/scout/negotiation`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_Get_All_Scouts_fun = createAsyncThunk(
  "Admin_Scouts_Slice/Admin_Get_All_Scouts_fun",
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
  let API_URL = `${baseURL}admin/scout/profile/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_Get_ScoutsDetails_fun = createAsyncThunk(
  "Admin_Scouts_Slice/Admin_Get_ScoutsDetails_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
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

const Single_Scout_Negotiations_Detail_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/scout/negotiations/${data}`;

  let API_URL_active = `${baseURL}admin/scout/active-negotiations/${data}`;

  let API_URL_close = `${baseURL}admin/scout/closed-negotiations/${data}`;
  let API_URL_suspended = `${baseURL}admin/scout/suspended-negotiations/${data}`;
  let API_URL_terminated = `${baseURL}admin/scout/terminated-negotiations/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const ALL = await axios.get(API_URL, config);

  const active = await axios.get(API_URL_active, config);
  const close = await axios.get(API_URL_close, config);
  const suspended = await axios.get(API_URL_suspended, config);
  const terminated = await axios.get(API_URL_terminated, config);

  // return response.data;
  let All_negotiations_data = ALL.data;

  let active_negotiations_data = active.data;
  let close_negotiations_data = close.data;
  let suspended_negotiations_data = suspended.data;
  let terminated_negotiations_data = terminated.data;

  let negotiations_data = {
    All_negotiations_data,
    active_negotiations_data,
    close_negotiations_data,
    suspended_negotiations_data,
    terminated_negotiations_data,
  };

  return negotiations_data;
};

export const Single_Scout_Negotiations_Detail_fun = createAsyncThunk(
  "Admin_Scouts_Slice/Single_Scout_Negotiations_Detail_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Single_Scout_Negotiations_Detail_fun_Service(data, token);
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
    reset__Admin_Scouts_fun: (state, action) => {
      state.Admin_Get_All_Scouts_isError = false;
      state.Admin_Get_All_Scouts_isSuccess = false;
      state.Admin_Get_All_Scouts_isLoading = false;
      state.Admin_Get_All_Scouts_message = null;
    },

    reset__Admin_Scouts_Details_fun: (state, action) => {
      state.Admin_Get_ScoutsDetails = null;
    },

    reset__Admin_Get_All_Suspended_Scouts_fun: (state, action) => {
      state.Admin_Get_All_Suspended_Scouts = null;
    },

    reset_Details_Of_Scout_Negotiations_Detail_fun: (state, action) => {
      state.Details_Of_Scout_Negotiations_Detail = null;
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
      })

      .addCase(Admin_Get_ScoutsDetails_fun.pending, (state) => {
        state.Admin_Get_All_Scouts_isLoading = true;
      })
      .addCase(Admin_Get_ScoutsDetails_fun.fulfilled, (state, action) => {
        state.Admin_Get_ScoutsDetails = action.payload;
        state.Admin_Get_All_Scouts_isSuccess = true;
        state.Admin_Get_All_Scouts_isLoading = false;
      })
      .addCase(Admin_Get_ScoutsDetails_fun.rejected, (state, action) => {
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
      })

      .addCase(Details_Of_Scout_Negotiations_Detail_fun.pending, (state) => {
        state.Admin_Get_All_Scouts_isLoading = true;
      })
      .addCase(
        Details_Of_Scout_Negotiations_Detail_fun.fulfilled,
        (state, action) => {
          state.Details_Of_Scout_Negotiations_Detail = action.payload;
          state.Admin_Get_All_Scouts_isSuccess = true;
          state.Admin_Get_All_Scouts_isLoading = false;
        }
      )
      .addCase(
        Details_Of_Scout_Negotiations_Detail_fun.rejected,
        (state, action) => {
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
        }
      )

      .addCase(Single_Scout_Negotiations_Detail_fun.pending, (state) => {
        state.Admin_Get_All_Scouts_isLoading = true;
      })
      .addCase(
        Single_Scout_Negotiations_Detail_fun.fulfilled,
        (state, action) => {
          state.Single_Scout_Negotiations_Detail = action.payload;
          state.Admin_Get_All_Scouts_isSuccess = true;
          state.Admin_Get_All_Scouts_isLoading = false;
        }
      )
      .addCase(
        Single_Scout_Negotiations_Detail_fun.rejected,
        (state, action) => {
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
        }
      )

      .addCase(Admin_Get_All_Suspended_Scouts_fun.pending, (state) => {
        state.Admin_Get_All_Scouts_isLoading = true;
      })
      .addCase(
        Admin_Get_All_Suspended_Scouts_fun.fulfilled,
        (state, action) => {
          state.Admin_Get_All_Suspended_Scouts = action.payload;
          state.Admin_Get_All_Scouts_isSuccess = true;
          state.Admin_Get_All_Scouts_isLoading = false;
        }
      )
      .addCase(Admin_Get_All_Suspended_Scouts_fun.rejected, (state, action) => {
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

export const {
  reset__Admin_Get_All_Suspended_Scouts_fun,
  reset__Admin_Scouts_fun,
  reset__Admin_Scouts_Details_fun,
  reset_Details_Of_Scout_Negotiations_Detail_fun,
} = Admin_Scouts_Slice.actions;
export default Admin_Scouts_Slice.reducer;
