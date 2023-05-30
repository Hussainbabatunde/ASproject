import React, { useState } from "react";

import imgPlaceHolder from "../../../../assets/imageplaceholder.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Aprove_decline_Player_fun,
  Admin_update_user_image_fun,
} from "../../../../Slice/Admin/AdminUpdate_profileSlice";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const tokengot = localStorage.getItem("token");

function UploadImage({ Admin_Get_Players_Profile_details }) {
  const dispatch = useDispatch();

  const { Admin_update_user_image_isLoading, Admin_update_user_image } =
    useSelector((state) => state.reducer.AdminUpdate_profileSlice);

  const userDataInfo = Admin_Get_Players_Profile_details?.data;

  let img_Data = userDataInfo?.profile_pics;

  const [file, setFile] = useState(img_Data || imgPlaceHolder);
  const [picFile, setPicFile] = useState(null);

  function handleChange(e) {
    setPicFile(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleImgSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile", picFile);
    formData.append("id", userDataInfo.id);
    dispatch(Admin_update_user_image_fun(formData));
  };

  const [loading, setLoading] = useState(false);

  const handleAprove_decline = async (data) => {
    console.log(data);
    let API_URL;
    if (data === "approved") {
      API_URL = `${baseURL}admin/player/accept-review`;
    }
    if (data === "decline") {
      API_URL = `${baseURL}admin/player/decline-review`;
    }

    let user_Data = {
      user_id: userDataInfo.id,
    };

    let api_object = { data, API_URL, user_Data };

    console.log(api_object);
    const tokengot = localStorage.getItem("token");

    // dispatch(Admin_Aprove_decline_Player_fun(api_object));

    try {
      // Set the loading state to true before sending the request
      console.log("Sending POST request...");
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };
      const response = await axios.post(
        API_URL,

        user_Data,

        config
      );

      // Reset the loading state to false after receiving the response
      setLoading(false);
      console.log("POST request successful");
      console.log(response);
      console.log("Response:", response.data);
      toast.success(`${response.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      // Reset the loading state to false in case of an error
      setLoading(false);
      console.error("Error:", error.message);
      toast.error(`${error.message}`, {
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
  };

  return (
    <div className="">
      <div>
        <div className="upload_img flex items-center lg:justify-between">
          <label for="imagePlcholder" className="block">
            <img src={file} className="w-[128px] h-[128px] rounded-[50%]" />
            <input
              type="file"
              id="imagePlcholder"
              onChange={handleChange}
              className="Scoutpage_Profile_ImagePlaceInput"
            />
          </label>

          <div className="text-base ">
            <p className="">
              {`${userDataInfo?.firstname} ${userDataInfo?.surname}`}{" "}
              <span className="">
                {userDataInfo?.status
                  ? `(${userDataInfo?.status})`
                  : "(not Verified)"}
              </span>
            </p>
            <p className="">Player Account</p>
          </div>

          <button
            type="submit"
            className="w-32 h-10 text-white bg-[#1B8550]  text-base rounded-md border-none"
            onClick={() => handleAprove_decline("approved")}

            // onClick={}
          >
            <span>
              {" "}
              {loading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Approved"
              )}
            </span>
          </button>
          <div className="ml-2">
            <button
              type="submit"
              className="w-32 h-10 text-[#8A291C]  text-base rounded-md border-none hover:bg-[#8A291C]  hover:text-white"
              onClick={() => handleAprove_decline("decline")}
            >
              <span>
                {" "}
                {loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Decline"
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
