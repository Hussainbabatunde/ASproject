import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  GetRole: null,
  Role_isError: false,
  Role_isSuccess: false,
  Role_isLoading: false,
  Role_message: null,

  createRole: null,
  createRole_isError: false,
  createRole_isSuccess: false,
  createRole_isLoading: false,
  createRole_message: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

// Get user goals

// Get user goals
const get_All_Role_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/authorize/role/all`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const get_All_Role_fun = createAsyncThunk(
  "role_fun/get_All_Role_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await get_All_Role_fun_Service(token);
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

const Create_All_Role_fun_Service = async (token, data) => {
  let API_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (data.id) {
    console.log("theis wht");
    API_URL = `${baseURL}admin/authorize/role/update`;
    const response = await axios.put(API_URL, data, config);

    console.log(response.data);
    return response.data;
  } else {
    console.log("this is for create");

    API_URL = `${baseURL}admin/authorize/role/create`;

    const response = await axios.post(API_URL, data, config);

    console.log(response.data);
    return response.data;
  }
};

export const Create_All_Role_fun = createAsyncThunk(
  "role_fun/Create_All_Role_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      console.log(data);
      return await Create_All_Role_fun_Service(token, data);
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

const Delete_All_Role_fun_Service = async (token, data) => {
  let API_URL = `${baseURL}admin/authorize/role/delete/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL, config);

  console.log(response.data);
  return response.data;
};

export const Delete_All_Role_fun = createAsyncThunk(
  "role_fun/Delete_All_Role_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      console.log(data);
      return await Delete_All_Role_fun_Service(token, data);
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

export const RoleSlice = createSlice({
  name: "role_fun",
  initialState,

  reducers: {
    reset_role: (state) => initialState,

    reset_role_options: (state, action) => {
      state.Role_isError = false;
      state.Role_isSuccess = false;
      state.Role_isLoading = false;
      state.Role_message = null;
    },

    reset_role_Create_options: (state, action) => {
      state.createRole_isError = false;
      state.createRole_isSuccess = false;
      state.createRole_isLoading = false;
      state.createRole_message = null;
      state.createRole = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(get_All_Role_fun.pending, (state) => {
        state.Role_isLoading = true;
      })
      .addCase(get_All_Role_fun.fulfilled, (state, action) => {
        state.GetRole = action.payload;
        state.Role_isSuccess = true;
        state.Role_isLoading = false;
        // toast.success("gotten Update", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      })
      .addCase(get_All_Role_fun.rejected, (state, action) => {
        state.Role_isError = true;
        state.Role_message = action.payload;
        state.Role_isLoading = false;

        toast.error(`${state.Role_message} this is not me oo`, {
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

      .addCase(Create_All_Role_fun.pending, (state) => {
        state.createRole_isLoading = true;
      })
      .addCase(Create_All_Role_fun.fulfilled, (state, action) => {
        state.createRole = action.payload;
        state.createRole_isSuccess = true;
        state.createRole_isLoading = false;
        toast.success("Role create successful", {
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
      .addCase(Create_All_Role_fun.rejected, (state, action) => {
        state.createRole_isError = true;
        state.createRole_message = action.payload;
        state.createRole_isLoading = false;
        toast.error(`${state.createRole_message}`, {
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

      .addCase(Delete_All_Role_fun.pending, (state) => {
        state.createRole_isLoading = true;
      })
      .addCase(Delete_All_Role_fun.fulfilled, (state, action) => {
        state.createRole = action.payload;
        state.createRole_isSuccess = true;
        state.createRole_isLoading = false;
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
      .addCase(Delete_All_Role_fun.rejected, (state, action) => {
        state.createRole_isError = true;
        state.createRole_message = action.payload;
        state.createRole_isLoading = false;

        console.log(state.createRole_message);
        toast.error(`${state.createRole_message}`, {
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

export const { reset_role_options, reset_role_Create_options } =
  RoleSlice.actions;
export default RoleSlice.reducer;
