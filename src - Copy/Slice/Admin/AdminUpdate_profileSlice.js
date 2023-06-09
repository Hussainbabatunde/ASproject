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

  Admin_update_user_bio: null,
  Admin_update_user_bio_isError: false,
  Admin_update_user_bio_isSuccess: false,
  Admin_update_user_bio_isLoading: false,
  Admin_update_user_bio_message: null,

  Admin_update_user_physical_stat_stat: null,
  Admin_update_user_physical_stat_isError: false,
  Admin_update_user_physical_stat_isSuccess: false,
  Admin_update_user_physical_stat_isLoading: false,
  Admin_update_user_physical_stat_message: null,

  Admin_update_user_BusinessService: null,
  Admin_update_user_BusinessService_isError: false,
  Admin_update_user_BusinessService_isSuccess: false,
  Admin_update_user_BusinessService_isLoading: false,
  Admin_update_user_BusinessService_message: null,

  Admin_Get_All_Player: null,
  Admin_Get_All_Player_isError: false,
  Admin_Get_All_Player_isSuccess: false,
  Admin_Get_All_Player_isLoading: false,
  Admin_Get_All_Player_message: null,

  Admin_Get_All_Suspended_Player: null,
  Admin_Get_All_Suspended_Player_isError: false,
  Admin_Get_All_Suspended_Player_isSuccess: false,
  Admin_Get_All_Suspended_Player_isLoading: false,
  Admin_Get_All_Suspended_Player_message: null,

  Admin_Get_All_Review_Player: null,
  Admin_Get_All_Review_Player_isError: false,
  Admin_Get_All_Review_Player_isSuccess: false,
  Admin_Get_All_Review_Player_isLoading: false,
  Admin_Get_All_Review_Player_message: null,
};

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

const Admin_Get_All_Review_Player_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/player/review`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_Get_All_Review_Player_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_Get_All_Review_Player_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Get_All_Review_Player_fun_Service(token);
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

const Admin_Get_All_Suspended_Player_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/player/all-suspended`;

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

export const Admin_Get_All_Suspended_Player_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_Get_All_Suspended_Player_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Get_All_Suspended_Player_fun_Service(token);
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

const Admin_Get_ALLPlayers_fun_Service = async (token) => {
  let API_URL = `${baseURL}admin/player/players`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_Get_ALLPlayers_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_Get_ALLPlayers_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      return await Admin_Get_ALLPlayers_fun_Service(token);
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

const Admin_Get_Players_Profile_detailsfun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/profile/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Admin_Get_Players_Profile_detailsfun = createAsyncThunk(
  "AdminUpdate_profileSlice/get_All_Role_fun",
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

const Admin_update_user_image_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/profile-picture`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Admin_update_user_image_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_update_user_image_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_update_user_image_fun_Service(data, token);
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

const Admin_update_user_BIO_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/bio`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(data);
  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Admin_update_user_BIO_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_update_user_BIO_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_update_user_BIO_fun_Service(data, token);
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

const Admin_update_user_physical_stat_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/physical_stat`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Admin_update_user_physical_stat_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_update_user_physical_stat_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_update_user_physical_stat_fun_Service(data, token);
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

const Admin_update_user_upload_id_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/identification`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Admin_update_user_upload_id_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_update_user_upload_id_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_update_user_upload_id_fun_Service(data, token);
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

const Admin_update_user_Your_image_id_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/images`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Admin_update_user_Your_image_id_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_update_user_Your_image_id_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_update_user_Your_image_id_fun_Service(data, token);
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

const Admin_update_user_BusinessService_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}admin/player/service_type`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(data);
  const response = await axios.post(API_URL, data, config);
  console.log(response.data);
  return response.data;
};

export const Admin_update_user_BusinessService_fun = createAsyncThunk(
  "AdminUpdate_profileSlice/Admin_update_user_BusinessService_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Admin_update_user_BusinessService_fun_Service(data, token);
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
    reset_Profile_post_request: (state, action) => {
      state.Admin_update_user_image_isError = false;
      state.Admin_update_user_image_isSuccess = false;
      state.Admin_update_user_image_isLoading = false;
      state.Admin_update_user_image_message = null;
      state.Admin_update_user_image = null;

      state.Admin_update_user_bio_isError = false;
      state.Admin_update_user_bio_isSuccess = false;
      state.Admin_update_user_bio_isLoading = false;
      state.Admin_update_user_bio_message = null;
      state.Admin_update_user_bio = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Admin_Get_ALLPlayers_fun.pending, (state) => {
        state.Admin_Get_All_Player_isLoading = true;
      })
      .addCase(Admin_Get_ALLPlayers_fun.fulfilled, (state, action) => {
        state.Admin_Get_All_Player = action.payload;
        state.Admin_Get_All_Player_isSuccess = true;
        state.Admin_Get_All_Player_isLoading = false;
      })
      .addCase(Admin_Get_ALLPlayers_fun.rejected, (state, action) => {
        state.Admin_Get_All_Player_isError = true;
        state.Admin_Get_All_Player_message = action.payload;
        state.Admin_Get_All_Player_isLoading = false;
        toast.error(`${state.Admin_Get_All_Player_message}`, {
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

      .addCase(Admin_Get_All_Review_Player_fun.pending, (state) => {
        state.Admin_Get_All_Review_Player_isLoading = true;
      })
      .addCase(Admin_Get_All_Review_Player_fun.fulfilled, (state, action) => {
        state.Admin_Get_All_Review_Player = action.payload;
        state.Admin_Get_All_Review_Player_isSuccess = true;
        state.Admin_Get_All_Review_Player_isLoading = false;
      })
      .addCase(Admin_Get_All_Review_Player_fun.rejected, (state, action) => {
        state.Admin_Get_All_Review_Player_isError = true;
        state.Admin_Get_All_Review_Player_message = action.payload;
        state.Admin_Get_All_Review_Player_isLoading = false;
        toast.error(`${state.Admin_Get_All_Review_Player_message}`, {
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

      .addCase(Admin_Get_All_Suspended_Player_fun.pending, (state) => {
        state.Admin_Get_All_Suspended_Player_isLoading = true;
      })
      .addCase(
        Admin_Get_All_Suspended_Player_fun.fulfilled,
        (state, action) => {
          state.Admin_Get_All_Suspended_Player = action.payload;
          state.Admin_Get_All_Suspended_Player_isSuccess = true;
          state.Admin_Get_All_Suspended_Player_isLoading = false;
        }
      )
      .addCase(Admin_Get_All_Suspended_Player_fun.rejected, (state, action) => {
        state.Admin_Get_All_Suspended_Player_isError = true;
        state.Admin_Get_All_Suspended_Player_message = action.payload;
        state.Admin_Get_All_Suspended_Player_isLoading = false;
        toast.error(`${state.Admin_Get_All_Suspended_Player_message}`, {
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

      .addCase(Admin_Get_Players_Profile_detailsfun.pending, (state) => {
        state.Admin_Get_Players_Profile_details_isLoading = true;
      })
      .addCase(
        Admin_Get_Players_Profile_detailsfun.fulfilled,
        (state, action) => {
          state.Admin_Get_Players_Profile_details = action.payload;
          state.Admin_Get_Players_Profile_details_isSuccess = true;
          state.Admin_Get_Players_Profile_details_isLoading = false;
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
      )

      .addCase(Admin_update_user_upload_id_fun.pending, (state) => {
        state.Admin_update_user_image_isLoading = true;
      })
      .addCase(Admin_update_user_upload_id_fun.fulfilled, (state, action) => {
        state.Admin_update_user_image = action.payload;
        state.Admin_update_user_image_isSuccess = true;
        state.Admin_update_user_image_isLoading = false;
        toast.success("ID uploaded ", {
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
      .addCase(Admin_update_user_upload_id_fun.rejected, (state, action) => {
        state.Admin_update_user_image_isError = true;
        state.Admin_update_user_image_message = action.payload;
        state.Admin_update_user_image_isLoading = false;
        toast.error(`${state.Admin_update_user_image_message}`, {
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
      .addCase(Admin_update_user_image_fun.pending, (state) => {
        state.Admin_update_user_image_isLoading = true;
      })
      .addCase(Admin_update_user_image_fun.fulfilled, (state, action) => {
        state.Admin_update_user_image = action.payload;
        state.Admin_update_user_image_isSuccess = true;
        state.Admin_update_user_image_isLoading = false;
        toast.success("image uploaded ", {
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
      .addCase(Admin_update_user_image_fun.rejected, (state, action) => {
        state.Admin_update_user_image_isError = true;
        state.Admin_update_user_image_message = action.payload;
        state.Admin_update_user_image_isLoading = false;
        toast.error(`${state.Admin_update_user_image_message}`, {
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

      .addCase(Admin_update_user_BIO_fun.pending, (state) => {
        state.Admin_update_user_bio_isLoading = true;
      })
      .addCase(Admin_update_user_BIO_fun.fulfilled, (state, action) => {
        state.Admin_update_user_bio = action.payload;
        state.Admin_update_user_bio_isSuccess = true;
        state.Admin_update_user_bio_isLoading = false;
        toast.success(" uploaded ", {
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
      .addCase(Admin_update_user_BIO_fun.rejected, (state, action) => {
        state.Admin_update_user_bio_isError = true;
        state.Admin_update_user_bio_message = action.payload;
        state.Admin_update_user_bio_isLoading = false;
        toast.error(`${state.Admin_update_user_bio_message}`, {
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

      .addCase(Admin_update_user_physical_stat_fun.pending, (state) => {
        state.Admin_update_user_physical_stat_isLoading = true;
      })
      .addCase(
        Admin_update_user_physical_stat_fun.fulfilled,
        (state, action) => {
          state.Admin_update_user_physical_stat_stat = action.payload;
          state.Admin_update_user_physical_stat_isSuccess = true;
          state.Admin_update_user_physical_stat_isLoading = false;
          toast.success(" uploaded ", {
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
        Admin_update_user_physical_stat_fun.rejected,
        (state, action) => {
          state.Admin_update_user_physical_stat_isError = true;
          state.Admin_update_user_physical_stat_message = action.payload;
          state.Admin_update_user_physical_stat_isLoading = false;
          toast.error(`${state.Admin_update_user_physical_stat_message}`, {
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

      .addCase(Admin_update_user_BusinessService_fun.pending, (state) => {
        state.Admin_update_user_BusinessService_isLoading = true;
      })
      .addCase(
        Admin_update_user_BusinessService_fun.fulfilled,
        (state, action) => {
          state.Admin_update_user_BusinessService = action.payload;
          state.Admin_update_user_BusinessService_isSuccess = true;
          state.Admin_update_user_BusinessService_isLoading = false;
          toast.success(" uploaded ", {
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
        Admin_update_user_BusinessService_fun.rejected,
        (state, action) => {
          state.Admin_update_user_BusinessService_isError = true;
          state.Admin_update_user_BusinessService_message = action.payload;
          state.Admin_update_user_BusinessService_isLoading = false;
          toast.error(`${state.Admin_update_user_BusinessService_message}`, {
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

export const { reset_Profile_post_request, reset_role_Create_options } =
  AdminUpdate_profileSlice.actions;
export default AdminUpdate_profileSlice.reducer;
