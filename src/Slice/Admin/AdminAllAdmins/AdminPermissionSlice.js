import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
    AdminPermissiondata: null,
    GetAdminPermissiondata: null,
    DeleteAdminPermissionData: null
  };

  export const AdminAllPermissionsRequest = createAsyncThunk(
    "adminPermission/userAdminPermission",
    async (details, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded
        },
      });
      return await instance
        .post("admin/authorize/permission/create", details)
        .then(async (response) => {
            // console.log(' permissions ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const AdminGetAllPermissionsRequest = createAsyncThunk(
    "adminGetPermission/userAdminGetPermission",
    async (_, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded
        },
      });
      return await instance
        .get("admin/authorize/permission/all")
        .then(async (response) => {
            // console.log('get all permissions ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const AdminDeletePermissionsRequest = createAsyncThunk(
    "adminDeletePermission/userAdminDeletePermission",
    async (id, { rejectWithValue }) => {
        
    // for (const [name, value] of details.entries()) {
    //     console.log(`${name}: ${value}`);
    //   }
      const tokengot = localStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: process.env.REACT_APP_AFRISPORTURL ,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded
        },
      });
      return await instance
        .delete(`admin/authorize/permission/delete/${id}`)
        .then(async (response) => {
            console.log('get all permissions ',response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );


  export const AdminAllAdminSlice = createSlice({
    name: "adminAllAdmin",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(AdminAllPermissionsRequest.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(AdminAllPermissionsRequest.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.AdminPermissiondata = action.payload;
          if(action.payload?.message == "Permission successfully created"){
          toast.success("Permission successfully created", {
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
          else if(action.payload?.message == "Permission already exist"){
            toast.error("Permission already exist", {
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
        })
        .addCase(AdminAllPermissionsRequest.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(AdminGetAllPermissionsRequest.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(AdminGetAllPermissionsRequest.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.GetAdminPermissiondata = action.payload;
          
        })
        .addCase(AdminGetAllPermissionsRequest.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(AdminDeletePermissionsRequest.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(AdminDeletePermissionsRequest.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.DeleteAdminPermissionData = action.payload;
          if(action.payload?.message == "Permission successfully deleted"){
            toast.success("Permission successfully deleted", {
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
        })
        .addCase(AdminDeletePermissionsRequest.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
    },
  });
  
  export const { reset } = AdminAllAdminSlice.actions;
  
  export const selectPlayerProfileSlice = (state) => state.AdminAllAdminSlice;
  export default AdminAllAdminSlice.reducer;
  