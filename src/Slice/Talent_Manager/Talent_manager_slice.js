import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Talent_manager_details: null,
  Talent_manager_details_isError: false,
  Talent_manager_details_isSuccess: false,
  Talent_manager_details_isLoading: false,
  Talent_manager_details_message: null,

  Talent_manager_details_create: null,
  Talent_manager_details_create_isError: false,
  Talent_manager_details_create_isSuccess: false,
  Talent_manager_details_create_isLoading: false,
  Talent_manager_details_create_message: null,

  Talent_manager_details_Get_all_player: null,
  Talent_manager_details_Get_all_player_isError: false,
  Talent_manager_details_Get_all_player_isSuccess: false,
  Talent_manager_details_Get_all_player_isLoading: false,
  Talent_manager_details_Get_all_player_message: null,

  Talent_manager_Add_player: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Talent_manager_Add_player_fun_Service = async (data, id, token) => {
  let API_URL = `${baseURL}talent-manager/player/add`;

  let userData = {
    manager_id: id,
    player_id: data?.user_id,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userData, config);

  return response.data;
};

export const Talent_manager_Add_player_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_Add_player_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const id =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;

      return await Talent_manager_Add_player_fun_Service(data, id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const Talent_manager_details_Get_all_player_fun_Service = async (
  data,
  token
) => {
  let API_URL = `${baseURL}players`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const Talent_manager_details_Get_all_player_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_details_Get_all_player_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const data =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;

      return await Talent_manager_details_Get_all_player_fun_Service(
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
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const data =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;

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

const Talent_manager_details_Image_uplaod_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}talent-manager/profile-picture`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  return response.data;
};

export const Talent_manager_details_Image_uplaod_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_details_Image_uplaod_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Talent_manager_details_Image_uplaod_fun_Service(data, token);
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

const Talent_manager_details_identification_uplaod_fun_Service = async (
  data,
  token
) => {
  let API_URL = `${baseURL}talent-manager/identification`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  return response.data;
};

export const Talent_manager_details_identification_uplaod_fun =
  createAsyncThunk(
    "Talent_manager_slice/Talent_manager_details_identification_uplaod_fun",
    async (data, thunkAPI) => {
      try {
        const token =
          thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

        return await Talent_manager_details_identification_uplaod_fun_Service(
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

const Talent_manager_details_Bio_uplaod_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}talent-manager/bio`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  return response.data;
};

export const Talent_manager_details_Bio_uplaod_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_details_Bio_uplaod_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Talent_manager_details_Bio_uplaod_fun_Service(data, token);
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

    reset_CreateTalent: (state, action) => {
      state.Talent_manager_details_create = null;
      state.Talent_manager_details_create_isError = false;
      state.Talent_manager_details_create_isSuccess = false;
      state.Talent_manager_details_create_isLoading = false;
      state.Talent_manager_details_create_message = null;
    },

    reset_Get_all_players: (state, action) => {
      state.Talent_manager_details_Get_all_player_isError = false;
      state.Talent_manager_details_Get_all_player_isSuccess = false;
      state.Talent_manager_details_Get_all_player_isLoading = false;
      state.Talent_manager_details_Get_all_player_message = null;
    },

    reset_Talent_manager_details: (state, action) => {
      state.Talent_manager_details_isError = false;
      state.Talent_manager_details_isSuccess = false;
      state.Talent_manager_details_isLoading = false;
      state.Talent_manager_details_message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Talent_manager_details_Get_all_player_fun.pending, (state) => {
        state.Talent_manager_details_Get_all_player_isLoading = true;
      })
      .addCase(
        Talent_manager_details_Get_all_player_fun.fulfilled,
        (state, action) => {
          state.Talent_manager_details_Get_all_player = action.payload;
          state.Talent_manager_details_Get_all_player_isSuccess = true;
          state.Talent_manager_details_Get_all_player_isLoading = false;
        }
      )
      .addCase(
        Talent_manager_details_Get_all_player_fun.rejected,
        (state, action) => {
          state.Talent_manager_details_Get_all_player_isError = true;
          state.Talent_manager_details_Get_all_player_message = action.payload;
          state.Talent_manager_details_Get_all_player_isLoading = false;
          state.Talent_manager_details_Get_all_player_isSuccess = false;

          toast.error(
            `${state.Talent_manager_details_Get_all_player_message}`,
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
      )

      .addCase(Talent_manager_details_fun.pending, (state) => {
        state.Talent_manager_details_isLoading = true;
      })
      .addCase(Talent_manager_details_fun.fulfilled, (state, action) => {
        state.Talent_manager_details = action.payload;
        state.Talent_manager_details_isSuccess = true;
        state.Talent_manager_details_isLoading = false;
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
      })

      .addCase(Talent_manager_Add_player_fun.pending, (state) => {
        state.Talent_manager_details_isLoading = true;
      })
      .addCase(Talent_manager_Add_player_fun.fulfilled, (state, action) => {
        state.Talent_manager_Add_player = action.payload;
        state.Talent_manager_details_isSuccess = true;
        state.Talent_manager_details_isLoading = false;

        toast.success("Added successful", {
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
      .addCase(Talent_manager_Add_player_fun.rejected, (state, action) => {
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
      })

      .addCase(Talent_manager_details_Image_uplaod_fun.pending, (state) => {
        state.Talent_manager_details_create_isLoading = true;
      })
      .addCase(
        Talent_manager_details_Image_uplaod_fun.fulfilled,
        (state, action) => {
          state.Talent_manager_details_create = action.payload;
          state.Talent_manager_details_create_isSuccess = true;
          state.Talent_manager_details_create_isLoading = false;
          toast.success("Upload successful", {
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
        Talent_manager_details_Image_uplaod_fun.rejected,
        (state, action) => {
          state.Talent_manager_details_create_isError = true;
          state.Talent_manager_details_create_message = action.payload;
          state.Talent_manager_details_create_isLoading = false;
          state.Talent_manager_details_create_isSuccess = false;

          toast.error(`${state.Talent_manager_details_create_message}`, {
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
      .addCase(Talent_manager_details_Bio_uplaod_fun.pending, (state) => {
        state.Talent_manager_details_create_isLoading = true;
      })
      .addCase(
        Talent_manager_details_Bio_uplaod_fun.fulfilled,
        (state, action) => {
          state.Talent_manager_details_create = action.payload;
          state.Talent_manager_details_create_isSuccess = true;
          state.Talent_manager_details_create_isLoading = false;
          toast.success("Upload successful", {
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
        Talent_manager_details_Bio_uplaod_fun.rejected,
        (state, action) => {
          state.Talent_manager_details_create_isError = true;
          state.Talent_manager_details_create_message = action.payload;
          state.Talent_manager_details_create_isLoading = false;
          state.Talent_manager_details_create_isSuccess = false;

          toast.error(`${state.Talent_manager_details_create_message}`, {
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
      .addCase(
        Talent_manager_details_identification_uplaod_fun.pending,
        (state) => {
          state.Talent_manager_details_create_isLoading = true;
        }
      )
      .addCase(
        Talent_manager_details_identification_uplaod_fun.fulfilled,
        (state, action) => {
          state.Talent_manager_details_create = action.payload;
          state.Talent_manager_details_create_isSuccess = true;
          state.Talent_manager_details_create_isLoading = false;
          toast.success("Upload successful", {
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
        Talent_manager_details_identification_uplaod_fun.rejected,
        (state, action) => {
          state.Talent_manager_details_create_isError = true;
          state.Talent_manager_details_create_message = action.payload;
          state.Talent_manager_details_create_isLoading = false;
          state.Talent_manager_details_create_isSuccess = false;

          toast.error(`${state.Talent_manager_details_create_message}`, {
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
  },
});

export const {
  reset_CreateTalent,
  reset_Get_all_players,
  reset_Talent_manager_details,
} = Talent_manager_slice.actions;
export default Talent_manager_slice.reducer;
