import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  GetRole: null,
  Role_isError: false,
  Role_isSuccess: false,
  Role_isLoading: false,
  Role_message: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

// Get user goals

// Get user goals
const get_All_Role_fun_Service = async () => {
  let API_URL = `${baseURL}admin/authorize/role/all`;

  const config = {
    headers: {
      Authorization: `Bearer ${tokengot}`,
    },
  };

  console.log("this ");

  const response = await axios.get(API_URL, config);

  //   console.log(response.data);

  return response.data;
};

export const get_All_Role_fun = createAsyncThunk(
  "role_fun/get_All_Role_fun",
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState()  .reducer.LoginSlice.logindata.data

      return await get_All_Role_fun_Service();
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
        toast.error(`${state.Role_message}`, {
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

export const { reset_role_options } = RoleSlice.actions;
export default RoleSlice.reducer;
