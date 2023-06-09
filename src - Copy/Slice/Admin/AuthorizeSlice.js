import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  create_authorize: null,
  create_authorize_isError: false,
  create_authorize_isSuccess: false,
  create_authorize_isLoading: false,
  create_authorize_message: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Create_authorize_fun_Service = async (token, data) => {
  let API_URL = `${baseURL}admin/authorize/attach-permission-to-privilege`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Create_authorize_fun = createAsyncThunk(
  "AuthorizeSlice/Create_authorize_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      console.log(data);
      console.log(token);

      return await Create_authorize_fun_Service(token, data);
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

export const AuthorizeSlice = createSlice({
  name: "AuthorizeSlice",
  initialState,

  //   reducers: {
  //     reset_role: (state) => initialState,

  //     reset_role_options: (state, action) => {
  //       state.Role_isError = false;
  //       state.Role_isSuccess = false;
  //       state.Role_isLoading = false;
  //       state.Role_message = null;
  //     },

  //     reset_role_Create_options: (state, action) => {
  //       state.createRole_isError = false;
  //       state.createRole_isSuccess = false;
  //       state.createRole_isLoading = false;
  //       state.createRole_message = null;
  //       state.createRole = null;
  //     },
  //   },

  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(get_All_Role_fun.pending, (state) => {
  //         state.Role_isLoading = true;
  //       })
  //       .addCase(get_All_Role_fun.fulfilled, (state, action) => {
  //         state.GetRole = action.payload;
  //         state.Role_isSuccess = true;
  //         state.Role_isLoading = false;
  //         // toast.success("gotten Update", {
  //         //   position: "top-right",
  //         //   autoClose: 5000,
  //         //   hideProgressBar: false,
  //         //   closeOnClick: true,
  //         //   pauseOnHover: true,
  //         //   draggable: true,
  //         //   progress: undefined,
  //         //   theme: "light",
  //         // });
  //       })
  //       .addCase(get_All_Role_fun.rejected, (state, action) => {
  //         state.Role_isError = true;
  //         state.Role_message = action.payload;
  //         state.Role_isLoading = false;
  //         toast.error(`${state.Role_message}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           className: "Forbidden403",
  //         });
  //       })

  //       .addCase(Create_All_Role_fun.pending, (state) => {
  //         state.createRole_isLoading = true;
  //       })
  //       .addCase(Create_All_Role_fun.fulfilled, (state, action) => {
  //         state.createRole = action.payload;
  //         state.createRole_isSuccess = true;
  //         state.createRole_isLoading = false;
  //         toast.success("Role create successful", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       })
  //       .addCase(Create_All_Role_fun.rejected, (state, action) => {
  //         state.createRole_isError = true;
  //         state.createRole_message = action.payload;
  //         state.createRole_isLoading = false;
  //         toast.error(`${state.createRole_message}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           className: "Forbidden403",
  //         });
  //       })

  //       .addCase(Delete_All_Role_fun.pending, (state) => {
  //         state.createRole_isLoading = true;
  //       })
  //       .addCase(Delete_All_Role_fun.fulfilled, (state, action) => {
  //         state.createRole = action.payload;
  //         state.createRole_isSuccess = true;
  //         state.createRole_isLoading = false;
  //         toast.success("Deleted successful", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       })
  //       .addCase(Delete_All_Role_fun.rejected, (state, action) => {
  //         state.createRole_isError = true;
  //         state.createRole_message = action.payload;
  //         state.createRole_isLoading = false;

  //         console.log(state.createRole_message);
  //         toast.error(`${state.createRole_message}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           className: "Forbidden403",
  //         });
  //       });
  //   },
});

export const {} = AuthorizeSlice.actions;
export default AuthorizeSlice.reducer;
