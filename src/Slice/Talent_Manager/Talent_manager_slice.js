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

  Talent_manager_Get_Single_player: null,
  Talent_manager_Get_Single_player_isError: false,
  Talent_manager_Get_Single_player_isSuccess: false,
  Talent_manager_Get_Single_player_isLoading: false,
  Talent_manager_Get_Single_player_message: null,

  Talent_manager_Deals: null,
  Talent_manager_Deals_isError: false,
  Talent_manager_Deals_isSuccess: false,
  Talent_manager_Deals_isLoading: false,
  Talent_manager_Deals_message: null,

  Talent_manager_requested_players: null,

  Talent_manager_deal_details: null,

  Talent_manager_Interaction: null,
  Talent_manager_InteractionisError: false,
  Talent_manager_Interaction_isSuccess: false,
  Talent_manager_Interaction_isLoading: false,
  Talent_manager_Interaction_message: null,
};

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Talent_manager_Interaction_fun_Service = async (data, token, id) => {
  // let request = data?.request?.id;
  // let player = data?.player?.id;
  // let sender = data?.sender?.id;

  // let talent_manager = id;
  // console.log(talent_manager);

  let API_URL = `${baseURL}talent-manager/offer/interaction/${data?.offer_id}/${data?.player_id}/${data?.sender_id}/${data?.manager_id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log({ xx: response.data });
  return response.data;
};

export const Talent_manager_Interaction_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_Interaction_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;

      const id =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;
      return await Talent_manager_Interaction_fun_Service(data, token, id);
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

const Talent_manager_deal_details_fun_Service = async (data, token) => {
  // let id = data?.id;
  // let from_person = data?.from;

  let API_URL = `${baseURL}talent-manager/offer/detail/${data?.offer_id}/${data?.player_id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  console.log({ dd: response.data });
  return response.data;
};

export const Talent_manager_deal_details_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_deal_details_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      return await Talent_manager_deal_details_fun_Service(data, token);
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

const Talent_manager_requested_players_fun_Service = async (token) => {
  let API_URL = `${baseURL}talent-manager/request`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log({ data: response.data });
  return response.data;
};

export const Talent_manager_requested_players_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_requested_players_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const id =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;
      return await Talent_manager_requested_players_fun_Service(token);
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

const Talent_manager_Deals_fun_Service = async (token) => {
  // let API_URL = `${baseURL}talent-manager/player/offers`;
  let API_URL = `${baseURL}talent-manager/offer`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

export const Talent_manager_Deals_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_Deals_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const id =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;

      return await Talent_manager_Deals_fun_Service(token);
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

const Talent_manager_Get_Single_player_fun_Service = async (data, token) => {
  let API_URL = `${baseURL}talent-manager/player/profile/${data}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

export const Talent_manager_Get_Single_player_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_Get_Single_player_fun",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const id =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;
      console.log(data);
      return await Talent_manager_Get_Single_player_fun_Service(data, token);
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

const Talent_manager_Add_player_fun_Service = async (data, id, token) => {
  let API_URL = `${baseURL}talent-manager/player/add`;

  let userData = {
    manager_id: id,
    player_id: data?.id,
  };

  console.log({ userData });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userData, config);

  console.log(response.data);
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
  let All_Player_API_URL = `${baseURL}talent-manager/players/expcept-manager-players`;

  let exact_manager_players_API_URL = `${baseURL}talent-manager/players`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const All_Player__data = await axios.get(All_Player_API_URL, config);
  const exact_manager_players__data = await axios.get(
    exact_manager_players_API_URL,
    config
  );

  const talent_Object = {
    All_Player_api: All_Player__data.data,
    exact_manager_players__api: exact_manager_players__data.data,
  };

  return talent_Object;
};

export const Talent_manager_details_Get_all_player_fun = createAsyncThunk(
  "Talent_manager_slice/Talent_manager_details_Get_all_player_fun",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().reducer.LoginSlice.logindata.data.token;
      const data =
        thunkAPI.getState().reducer.LoginSlice.logindata.data?.user?.id;
      console.log("thththh");
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
      console.log("thththh");
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

    reset_Single_manager_player: (state, action) => {
      state.Talent_manager_Get_Single_player_isError = false;
      state.Talent_manager_Get_Single_player_isSuccess = false;
      state.Talent_manager_Get_Single_player_isLoading = false;
      state.Talent_manager_Get_Single_player = null;
      state.Talent_manager_Get_Single_player_message = null;
    },

    reset_Talent_manager_Deals: (state, action) => {
      state.Talent_manager_Deals_isError = false;
      state.Talent_manager_Deals_message = null;
      state.Talent_manager_Deals = null;
      state.Talent_manager_requested_players = null;
      state.Talent_manager_deal_details = null;

      state.Talent_manager_Deals_isLoading = false;
      state.Talent_manager_Deals_isSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(Talent_manager_Interaction_fun.pending, (state) => {
        state.Talent_manager_Interaction_isLoading = true;
      })
      .addCase(Talent_manager_Interaction_fun.fulfilled, (state, action) => {
        state.Talent_manager_Interaction = action.payload;
        state.Talent_manager_Interaction_isSuccess = true;
        state.Talent_manager_Interaction_isLoading = false;
      })
      .addCase(Talent_manager_Interaction_fun.rejected, (state, action) => {
        state.Talent_manager_InteractionisError = true;
        state.Talent_manager_Interaction_message = action.payload;
        state.Talent_manager_Interaction_isLoading = false;
        state.Talent_manager_Interaction_isSuccess = false;

        toast.error(`${state.Talent_manager_Interaction_message}`, {
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

      .addCase(Talent_manager_deal_details_fun.pending, (state) => {
        state.Talent_manager_Deals_isLoading = true;
      })
      .addCase(Talent_manager_deal_details_fun.fulfilled, (state, action) => {
        state.Talent_manager_deal_details = action.payload;
        state.Talent_manager_Deals_isSuccess = true;
        state.Talent_manager_Deals_isLoading = false;
      })
      .addCase(Talent_manager_deal_details_fun.rejected, (state, action) => {
        state.Talent_manager_Deals_isError = true;
        state.Talent_manager_Deals_message = action.payload;
        state.Talent_manager_Deals_isLoading = false;
        state.Talent_manager_Deals_isSuccess = false;

        toast.error(`${state.Talent_manager_Deals_message}`, {
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

      .addCase(Talent_manager_requested_players_fun.pending, (state) => {
        state.Talent_manager_Deals_isLoading = true;
      })
      .addCase(
        Talent_manager_requested_players_fun.fulfilled,
        (state, action) => {
          state.Talent_manager_requested_players = action.payload;
          state.Talent_manager_Deals_isSuccess = true;
          state.Talent_manager_Deals_isLoading = false;
        }
      )
      .addCase(
        Talent_manager_requested_players_fun.rejected,
        (state, action) => {
          state.Talent_manager_Deals_isError = true;
          state.Talent_manager_Deals_message = action.payload;
          state.Talent_manager_Deals_isLoading = false;
          state.Talent_manager_Deals_isSuccess = false;

          toast.error(`${state.Talent_manager_Deals_message}`, {
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

      .addCase(Talent_manager_Deals_fun.pending, (state) => {
        state.Talent_manager_Deals_isLoading = true;
      })
      .addCase(Talent_manager_Deals_fun.fulfilled, (state, action) => {
        state.Talent_manager_Deals = action.payload;
        state.Talent_manager_Deals_isSuccess = true;
        state.Talent_manager_Deals_isLoading = false;
      })
      .addCase(Talent_manager_Deals_fun.rejected, (state, action) => {
        state.Talent_manager_Deals_isError = true;
        state.Talent_manager_Deals_message = action.payload;
        state.Talent_manager_Deals_isLoading = false;
        state.Talent_manager_Deals_isSuccess = false;

        toast.error(`${state.Talent_manager_Deals_message}`, {
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

      .addCase(Talent_manager_Get_Single_player_fun.pending, (state) => {
        state.Talent_manager_Get_Single_player_isLoading = true;
      })
      .addCase(
        Talent_manager_Get_Single_player_fun.fulfilled,
        (state, action) => {
          state.Talent_manager_Get_Single_player = action.payload;
          state.Talent_manager_Get_Single_player_isSuccess = true;
          state.Talent_manager_Get_Single_player_isLoading = false;
        }
      )
      .addCase(
        Talent_manager_Get_Single_player_fun.rejected,
        (state, action) => {
          state.Talent_manager_Get_Single_player_isError = true;
          state.Talent_manager_Get_Single_player_message = action.payload;
          state.Talent_manager_Get_Single_player_isLoading = false;
          state.Talent_manager_Get_Single_player_isSuccess = false;

          toast.error(`${state.Talent_manager_Get_Single_player_message}`, {
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
  reset_Single_manager_player,
  reset_Talent_manager_Deals,
} = Talent_manager_slice.actions;
export default Talent_manager_slice.reducer;
