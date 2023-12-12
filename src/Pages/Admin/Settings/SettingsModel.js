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
import { Settings_fun } from "../../../Slice/Admin/SettingsSlice";

const tokengot = localStorage.getItem("token");

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function Settings_model({ setFormData, formData, setModal }) {
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
    name: formData.name,
    data: formData.data,
  });

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

      if (formData?.name === "Percentage") {
        API_URL = `${baseURL}admin/change-percentage`;

        const response = await axios.post(
          API_URL,
          {
            percentage: data,
          },
          config
        );
        return response.data;
      } else if (formData?.name === "Market_Fee") {
        API_URL = `${baseURL}admin/change-market-fee`;

        const response = await axios.post(
          API_URL,
          {
            market_fee: data,
          },
          config
        );
        return response.data;
      } else if (formData?.name === "Sorting") {
        API_URL = `${baseURL}admin/change-sorting`;

        const response = await axios.post(
          API_URL,
          {
            sorting: data,
          },
          config
        );
        return response.data;
      } else if (formData?.name === "Advert Fee") {
        console.log({ data, formData });

        API_URL = `${baseURL}admin/change-advert-fee`;

        const response = await axios.post(
          API_URL,
          {
            advert_fee: data,
          },
          config
        );

        return response.data;
      } else if (formData?.name === "Monthly Advert-Fee") {
        console.log({ data, formData });

        API_URL = `${baseURL}admin/change-monthly-advert-fee`;

        const response = await axios.post(
          API_URL,
          {
            monthly_advert_fee: data,
          },
          config
        );

        return response.data;
      }
    },
    {
      onSuccess: () => {
        // Success toast notification

        dispatch(Settings_fun());

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

  const [inputValue, setInputValue] = useState(formData.data);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Create_mutation.mutate(inputValue);
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
                    {formData?.name} Update
                  </h3>
                </div>

                <div>
                  <button
                    className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                    onClick={() => {
                      setFormData("");
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
                          {formData?.name}
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="text"
                          id="textInput"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

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

export default Settings_model;
