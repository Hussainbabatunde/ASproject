import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Create__Admin_fun,
  get_All_Admin_fun,
} from "../../../Slice/Admin/AdminAllAdmins/AdminUserSlice";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function Admin_model({ setFormData, formData, setModal }) {
  const dispatch = useDispatch();
  const { GetRole, Role_isSuccess, createRole_isSuccess } = useSelector(
    (state) => state?.reducer?.RoleSlice
  );

  const {
    get_All_Admin,
    Create__Admin,
    Create__Admin_isError,
    Create__Admin_isSuccess,
    Create__Admin_isLoading,
    Create__Admin_message,
  } = useSelector((state) => state?.reducer?.AdminUserSlice);
  const [userAdmin, setUserAdmin] = useState({
    role: formData.role,
    fullname: formData.fullname,
    email: formData.email,
    phone: formData.phone,
    id: formData.id,
    password: formData.password,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const Create_mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API
      let API_URL;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          "Content-type": "application/json",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      if (data.id) {
        API_URL = `${baseURL}admin/user/update`;

        let fullName = data.fullname;
        let nameParts = fullName.split(" ");

        let update_Data = {
          id: data.id,
          firstname: nameParts[0],
          surname: nameParts[1],
          phone: data.phone,
          email: data.email,
        };

        const response = await axios.put(API_URL, update_Data, config);
        console.log(response.data);
        return response.data;
      } else {
        API_URL = `${baseURL}admin/user/create`;
        console.log(data);

        let creat_Data = {
          role: data.role,
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          password: data.password,
        };

        const response = await axios.post(API_URL, creat_Data, config);
        console.log(response.data);
        return response.data;
      }
    },
    {
      onSuccess: () => {
        // Success toast notification

        dispatch(get_All_Admin_fun());

        toast.success(" successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError: () => {
        // Error toast notification
        toast.error("Error occurred while submitting .", {
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
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userAdmin);

    Create_mutation.mutate(userAdmin);
  };

  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen  px-4 ">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
          </div>
          <div className="bg-white   rounded-lg overflow-hidden w-[60%] lg:w-[40%]  shadow-xl transform transition-all ">
            <div className="border-b bord   ">
              <div className=" flex justify-between    px-7 py-3 items-center ">
                <div>
                  <h3 className="text-[20px] font-semibold ">
                    {formData?.id ? "Update Admin" : "Create Admin"}
                  </h3>
                </div>

                <div>
                  <button
                    className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                    onClick={() => {
                      setFormData({
                        role: "",
                        fullname: "",
                        email: "",
                        phone: "",
                        id: null,
                        password: "",
                      });
                      setModal(false);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>

              <div>
                <div className="modal-content bg-white rounded-lg shadow-lg">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="p-4">
                      <div className="mb-4">
                        <label htmlFor="" className="block mb-2">
                          Fullname
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="fullname"
                          value={userAdmin.fullname}
                          placeholder="fullname"
                          onChange={handleInputChange}
                        />
                      </div>

                      {!formData?.id && (
                        <div className="mb-4">
                          <label htmlFor="" className="block mb-2">
                            Password
                          </label>
                          <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="password"
                            value={userAdmin.password}
                            placeholder="password"
                            onChange={handleInputChange}
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="" className="block mb-2">
                          Email
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="email"
                          value={userAdmin.email}
                          placeholder="email"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="block mb-2">
                          Phone
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="tel"
                          name="phone"
                          value={userAdmin.phone}
                          placeholder="phone"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="" className="block mb-2">
                          Role
                        </label>

                        {formData?.id ? (
                          <>
                            <input
                              className="w-full p-2 border border-gray-300 rounded"
                              value={userAdmin.role}
                            />
                          </>
                        ) : (
                          <select
                            name="role"
                            value={userAdmin.role}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                          >
                            <>
                              <option value="">Select a grade</option>
                              {GetRole?.data.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.name}
                                  className=" w-24"
                                >
                                  {item.name}
                                </option>
                              ))}
                            </>
                          </select>
                        )}
                      </div>
                    </div>
                    {/* {!Create__Admin_isLoading && (
                  <button className="form-submit" type="submit">
                    Submit
                  </button>
                )} */}

                    <div className="text-center ">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                      >
                        {Create_mutation.isLoading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_model;
