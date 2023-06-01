import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Talent_manager_details: null,
  Talent_manager_details_isError: false,
  Talent_manager_details_isSuccess: false,
  Talent_manager_details_isLoading: false,
  Talent_manager_details_message: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

// Get user goals

// Get user goals
const Talent_manager_details_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}user/profile/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const Talent_manager_details_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_details_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Talent_manager_details_fun_Service(data, token);
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

export const Talent_manager_slice = createSlice({
  name: "Talent_manager_slice",
  initialState,

  reducers: {
    reset_role: (state) => initialState,

    // reset_role_options: (state, action) => {
    //   state.Role_isError = false;
    //   state.Role_isSuccess = false;
    //   state.Role_isLoading = false;
    //   state.Role_message = null;
    // },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Talent_manager_details_fun.pending, (state) => {
        state.Talent_manager_details_isLoading = true;
      })
      .addCase(Talent_manager_details_fun.fulfilled, (state, action) => {
        state.Talent_manager_details = action.payload;
        state.Talent_manager_details_isSuccess = true;
        state.Talent_manager_details_isLoading = false;
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
      .addCase(Talent_manager_details_fun.rejected, (state, action) => {
        state.Talent_manager_details_isError = true;
        state.Talent_manager_details_message = action.payload;
        state.Talent_manager_details_isLoading = false;
        state.Talent_manager_details_isSuccess = false;

        toast.error(`${state.Talent_manager_details_message}`, {
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

export const {} = Talent_manager_slice.actions;
export default Talent_manager_slice.reducer;
