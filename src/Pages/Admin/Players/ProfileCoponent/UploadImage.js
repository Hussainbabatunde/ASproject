import React, { useState } from "react";

import imgPlaceHolder from "../../../../assets/imageplaceholder.png";
import { useSelector } from "react-redux";

function UploadImage({ Admin_Get_Players_Profile_details }) {
  const [file, setFile] = useState(imgPlaceHolder);
  const [picFile, setPicFile] = useState(null);

  const userDataInfo = Admin_Get_Players_Profile_details?.data;

  function handleChange(e) {
    // console.log(e.target.files[0])
    setPicFile(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));

    console.log();
  }
  const handleImgSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", picFile);
    formData.append("id", userId);

    //   await dispatch(PlayerProfilePicture(formData))
    //   await dispatch(PlayerProfileVerificationStatus())
  };

  console.log(Admin_Get_Players_Profile_details);

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
