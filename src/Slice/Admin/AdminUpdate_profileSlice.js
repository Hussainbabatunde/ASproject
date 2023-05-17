import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Admin_Get_Players_Profile_details: null,
  Admin_Get_Players_Profile_details_isError: false,
  Admin_Get_Players_Profile_details_isSuccess: false,
  Admin_Get_Players_Profile_details_isLoading: false,
  Admin_Get_Players_Profile_details_message: null,

  Admin_update_user_image: null,
  Admin_update_user_image_isError: false,
  Admin_update_user_image_isSuccess: false,
  Admin_update_user_image_isLoading: false,
  Admin_update_user_image_message: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const Admin_Get_Players_Profile_detailsfun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/profile/${data}`;

  console.log(API_URL);
  console.log(data);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

export const Admin_Get_Players_Profile_detailsfun = createAsyncThunk(
  "role_fun/get_All_Role_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Get_Players_Profile_detailsfun_Service(data, token);
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

export const AdminUpdate_profileSlice = createSlice({
  name: "AdminUpdate_profileSlice",
  initialState,

  reducers: {
    //   reset_role: (state) => initialState,
    //   reset_role_options: (state, action) => {
    //     state.Role_isError = false;
    //     state.Role_isSuccess = false;
    //     state.Role_isLoading = false;
    //     state.Role_message = null;
    //   },
    //   reset_role_Create_options: (state, action) => {
    //     state.createRole_isError = false;
    //     state.createRole_isSuccess = false;
    //     state.createRole_isLoading = false;
    //     state.createRole_message = null;
    //     state.createRole = null;
    //   },
  },

  extraReducers: (builder) => {
    builder
      .addCase(Admin_Get_Players_Profile_detailsfun.pending, (state) => {
        state.Role_isLoading = true;
      })
      .addCase(
        Admin_Get_Players_Profile_detailsfun.fulfilled,
        (state, action) => {
          state.Admin_Get_Players_Profile_details = action.payload;
          state.Admin_Get_Players_Profile_details_isSuccess = true;
          state.Admin_Get_Players_Profile_details_isLoading = false;
          toast.success("gotten Update", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      )
      .addCase(
        Admin_Get_Players_Profile_detailsfun.rejected,
        (state, action) => {
          state.Admin_Get_Players_Profile_details_isError = true;
          state.Admin_Get_Players_Profile_details_message = action.payload;
          state.Admin_Get_Players_Profile_details_isLoading = false;
          toast.error(`${state.Admin_Get_Players_Profile_details_message}`, {
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
      );

    //     .addCase(Create_All_Role_fun.pending, (state) => {
    //       state.createRole_isLoading = true;
    //     })
    //     .addCase(Create_All_Role_fun.fulfilled, (state, action) => {
    //       state.createRole = action.payload;
    //       state.createRole_isSuccess = true;
    //       state.createRole_isLoading = false;
    //       toast.success("Role create successful", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     })
    //     .addCase(Create_All_Role_fun.rejected, (state, action) => {
    //       state.createRole_isError = true;
    //       state.createRole_message = action.payload;
    //       state.createRole_isLoading = false;
    //       toast.error(`${state.createRole_message}`, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         className: "Forbidden403",
    //       });
    //     })

    //     .addCase(Delete_All_Role_fun.pending, (state) => {
    //       state.createRole_isLoading = true;
    //     })
    //     .addCase(Delete_All_Role_fun.fulfilled, (state, action) => {
    //       state.createRole = action.payload;
    //       state.createRole_isSuccess = true;
    //       state.createRole_isLoading = false;
    //       toast.success("Deleted successful", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     })
    //     .addCase(Delete_All_Role_fun.rejected, (state, action) => {
    //       state.createRole_isError = true;
    //       state.createRole_message = action.payload;
    //       state.createRole_isLoading = false;

    //       console.log(state.createRole_message);
    //       toast.error(`${state.createRole_message}`, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         className: "Forbidden403",
    //       });
    //     });
  },
});

export const { reset_role_options, reset_role_Create_options } =
  AdminUpdate_profileSlice.actions;
export default AdminUpdate_profileSlice.reducer;
