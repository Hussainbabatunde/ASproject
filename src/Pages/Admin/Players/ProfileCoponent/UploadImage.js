import React, { useState } from "react";

import imgPlaceHolder from "../../../../assets/imageplaceholder.png";
import { useDispatch, useSelector } from "react-redux";
import { Admin_update_user_image_fun } from "../../../../Slice/Admin/AdminUpdate_profileSlice";
import { CircularProgress } from "@mui/material";

function UploadImage({ Admin_Get_Players_Profile_details }) {
  const dispatch = useDispatch();

  const { Admin_update_user_image_isLoading, Admin_update_user_image } =
    useSelector((state) => state.reducer.AdminUpdate_profileSlice);

  const userDataInfo = Admin_Get_Players_Profile_details?.data;

  console.log(Admin_Get_Players_Profile_details);

  console.log(userDataInfo);

  let img_Data = userDataInfo?.profile_pics;

  const [file, setFile] = useState(img_Data);
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

  return (
    <div className="">
      <div>
        <div className="upload_img flex items-center lg:justify-between">
          <label for="imagePlcholder" className="block">
            <img
              src={file || imgPlaceHolder}
              className="w-[128px] h-[128px] rounded-[50%]"
            />
            <input
              type="file"
              id="imagePlcholder"
              onChange={handleChange}
              className="Scoutpage_Profile_ImagePlaceInput"
            />

            <button
              onClick={handleImgSubmit}
              type="button"
              className="w-32 h-10 text-white bg-[#1B8550]  text-base rounded-md border-none"
            >
              {Admin_update_user_image_isLoading ? (
                <CircularProgress size={15} />
              ) : (
                <span>Upload photo</span>
              )}
            </button>
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

          <p className=" lg:text-[14px] text-xs font-semibold text-[#1B8550]">
            View Profile
          </p>
          <div>
            <button
              type="submit"
              className="w-32 h-10 text-white bg-[#1B8550]  text-base rounded-md border-none"
            >
              {/* {imgloader ? (
<CircularProgress size={15} />
) : (
<span>Upload photo</span>
)} */}
              <span>Save </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
