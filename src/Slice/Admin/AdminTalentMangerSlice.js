import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");
const initialState = {
  Admin_talent_manager: null,
  Admin_talent_manager_isError: false,
  Admin_talent_manager_isSuccess: false,
  Admin_talent_manager_isLoading: false,
  Admin_talent_manager_message: null,
};

const Admin_talent_manager_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/talent-manager/negotiation`;
  let API_URL_suspend = `${baseURL}admin/talent-manager/all-suspended`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Active = await axios.get(API_URL, config);
  const Suspended = await axios.get(API_URL_suspend, config);

  let Admin__TalentManger__Active_Negotiations = Active.data;
  let Admin__TalentManger__Suspended_Negotiations = Suspended.data;

  let Admin___TalentManger = {
    Admin__TalentManger__Active_Negotiations,
    Admin__TalentManger__Suspended_Negotiations,
  };

  return Admin___TalentManger;
};

export const Admin_talent_manager_fun = createAsyncThunk(
  "AdminTalentMangerSlice/Admin_talent_manager_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_talent_manager_fun_Service(token);
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

export const AdminTalentMangerSlice = createSlice({
  name: "AdminTalentMangerSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Admin_talent_manager_fun.pending, (state) => {
        state.Admin_talent_manager_isLoading = true;
      })
      .addCase(Admin_talent_manager_fun.fulfilled, (state, action) => {
        state.Admin_talent_manager = action.payload;
        state.Admin_talent_manager_isSuccess = true;
        state.Admin_talent_manager_isLoading = false;
      })
      .addCase(Admin_talent_manager_fun.rejected, (state, action) => {
        state.Admin_talent_manager_isError = true;
        state.Admin_talent_manager_message = action.payload;
        state.Admin_talent_manager_isLoading = false;
        toast.error(`${state.Admin_talent_manager_message}`, {
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

export const {} = AdminTalentMangerSlice.actions;
export default AdminTalentMangerSlice.reducer;
