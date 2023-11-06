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

function ReseAdminPassoword({ setFormData, formData, setModal, modal }) {
  const dispatch = useDispatch();

  const [userAdmin, setUserAdmin] = useState({
    password: "",
    confirm_password: "",
    user: formData.id,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const Create_mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}set-new-password`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.post(API_URL, data, config);
        console.log(response.data); // Logging the response data
        return response;
      } catch (error) {
        console.error(error);
        throw error;
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
    //   setFormData({
    //     role: userAdmin.role,
    //     fullname: userAdmin.fullname,
    //     email: userAdmin.email,
    //     phone: userAdmin.phone,
    //     id: userAdmin.id,
    //   });
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
                  <h3 className="text-[20px] font-semibold ">Reset Password</h3>
                </div>

                <div>
                  <button
                    className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                    onClick={() => {
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
                          password
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

                      <div className="mb-4">
                        <label htmlFor="" className="block mb-2">
                          password
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          name="confirm_password"
                          value={userAdmin.confirm_password}
                          placeholder="confirm_password"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="text-center flex justify-center pb-5">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[70%]  block"
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

export default ReseAdminPassoword;
