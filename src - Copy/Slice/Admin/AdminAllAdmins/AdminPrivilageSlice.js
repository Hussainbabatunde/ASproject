import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  get_All_Admin_Admin_Privilage: null,
  get_All_Admin_Admin_Privilage_isError: false,
  get_All_Admin_Admin_Privilage_isSuccess: false,
  get_All_Admin_Admin_Privilage_isLoading: false,
  get_All_Admin_Admin_Privilage_message: null,

  Create__Admin__Privilage: null,
  Create__Admin__Privilage_isError: false,
  Create__Admin__Privilage_isSuccess: false,
  Create__Admin__Privilage_isLoading: false,
  Create__Admin__Privilage_message: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Get_Admin_Privilage_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/authorize/privilege/all`;

  console.log(API_URL);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  console.log(response.data);

  return response.data;
};

export const Get_Admin_Privilage_fun = createAsyncThunk(
  "Admin_Privilage/Get_Admin_Privilage_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Get_Admin_Privilage_fun_Service(token);
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

export const AdminPrivilageSlice = createSlice({
  name: "Admin_Privilage",
  initialState,

  reducers: {
    reset_role: (state) => initialState,

    // reset_role_options: (state, action) => {
    //   state.Role_isError = false;
    //   state.Role_isSuccess = false;
    //   state.Role_isLoading = false;
    //   state.Role_message = null;
    // },

    reset_Create__Admin_Privilege_options: (state, action) => {
      state.Create__Admin__Privilage_isError = false;
      state.Create__Admin__Privilage_isSuccess = false;
      state.Create__Admin__Privilage_isLoading = false;
      state.Create__Admin__Privilage_message = null;
      state.Create__Admin__Privilage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Get_Admin_Privilage_fun.pending, (state) => {
        state.get_All_Admin_Admin_Privilage_isLoading = true;
      })
      .addCase(Get_Admin_Privilage_fun.fulfilled, (state, action) => {
        state.get_All_Admin_Admin_Privilage = action.payload;
        state.get_All_Admin_Admin_Privilage_isSuccess = true;
        state.get_All_Admin_Admin_Privilage_isLoading = false;
        // toast.success("Deleted successful", {
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
      .addCase(Get_Admin_Privilage_fun.rejected, (state, action) => {
        state.get_All_Admin_Admin_Privilage_isError = true;
        state.get_All_Admin_Admin_Privilage_message = action.payload;
        state.get_All_Admin_Admin_Privilage_isLoading = false;
        toast.error(`${state.get_All_Admin_Admin_Privilage_message}`, {
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

export const { reset_Create__Admin_Privilege_options } =
  AdminPrivilageSlice.actions;
export default AdminPrivilageSlice.reducer;
