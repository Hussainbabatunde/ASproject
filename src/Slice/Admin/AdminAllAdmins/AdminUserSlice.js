import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  get_All_Admin: null,
  get_All_Admin_isError: false,
  get_All_Admin_isSuccess: false,
  get_All_Admin_isLoading: false,
  get_All_Admin_message: null,

  Create__Admin: null,
  Create__Admin_isError: false,
  Create__Admin_isSuccess: false,
  Create__Admin_isLoading: false,
  Create__Admin_message: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

// Get user goals

const Create__Admin_fun_Service = async (token, data) => {
  let API_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (data.id) {
    console.log("theis wht");
    // API_URL = `${baseURL}admin/authorize/role/update`;
    // const response = await axios.put(API_URL, data, config);

    // console.log(response.data);
    // return response.data;
  } else {
    console.log("this is for create");
    API_URL = `${baseURL}admin/user/create`;
    const response = await axios.post(API_URL, data, config);
    console.log(response.data);
    return response.data;
  }
};

export const Create__Admin_fun = createAsyncThunk(
  "role_fun/Create__Admin_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Create__Admin_fun_Service(token, data);
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

const Delete__Admin_fun_Service = async (token, data) => {
  let API_URL = `${baseURL}admin/user/delete/${data}`;

  console.log(API_URL);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL, config);

  console.log(response.data);

  //   return response.data;
};

export const Delete__Admin_fun = createAsyncThunk(
  "All_admin/Delete__Admin_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Delete__Admin_fun_Service(token, data);
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

const get_All_Admin_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/user/all`;

  console.log(API_URL);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  //   console.log(response.data);

  return response.data;
};

export const get_All_Admin_fun = createAsyncThunk(
  "All_admin/get_All_Admin_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await get_All_Admin_fun_Service(token);
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

export const AdminUserSlice = createSlice({
  name: "All_admin",
  initialState,

  reducers: {
    reset_role: (state) => initialState,

    // reset_role_options: (state, action) => {
    //   state.Role_isError = false;
    //   state.Role_isSuccess = false;
    //   state.Role_isLoading = false;
    //   state.Role_message = null;
    // },

    reset_Create__Admin_options: (state, action) => {
      state.Create__Admin_isError = false;
      state.Create__Admin_isSuccess = false;
      state.Create__Admin_isLoading = false;
      state.Create__Admin_message = null;
      state.Create__Admin = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(get_All_Admin_fun.pending, (state) => {
        state.get_All_Admin_isLoading = true;
      })
      .addCase(get_All_Admin_fun.fulfilled, (state, action) => {
        state.get_All_Admin = action.payload;
        state.get_All_Admin_isSuccess = true;
        state.Role_isLoading = false;
      })
      .addCase(get_All_Admin_fun.rejected, (state, action) => {
        state.get_All_Admin_isError = true;
        state.get_All_Admin_message = action.payload;
        state.get_All_Admin_isLoading = false;
        toast.error(`${state.get_All_Admin_message}`, {
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

      .addCase(Delete__Admin_fun.pending, (state) => {
        state.Create__Admin_isLoading = true;
      })
      .addCase(Delete__Admin_fun.fulfilled, (state, action) => {
        state.Create__Admin = action.payload;
        state.Create__Admin_isSuccess = true;
        state.Create__Admin_isLoading = false;
        toast.success("Deleted successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(Delete__Admin_fun.rejected, (state, action) => {
        state.Create__Admin_isError = true;
        state.Create__Admin_message = action.payload;
        state.Create__Admin_isLoading = false;
        toast.error(`${state.Create__Admin_message}`, {
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

      .addCase(Create__Admin_fun.pending, (state) => {
        state.Create__Admin_isLoading = true;
      })
      .addCase(Create__Admin_fun.fulfilled, (state, action) => {
        state.Create__Admin = action.payload;
        state.Create__Admin_isSuccess = true;
        state.Create__Admin_isLoading = false;
        toast.success("Deleted successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(Create__Admin_fun.rejected, (state, action) => {
        state.Create__Admin_isError = true;
        state.Create__Admin_message = action.payload;
        state.Create__Admin_isLoading = false;
        toast.error(`${state.Create__Admin_message}`, {
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

export const { reset_Create__Admin_options } = AdminUserSlice.actions;
export default AdminUserSlice.reducer;
