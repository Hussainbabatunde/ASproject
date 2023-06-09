import React, { useState } from "react";
import "../Scout/profileform.css";
import imgPlaceHolder from "../../assets/imageplaceholder.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
import {
  PlayerProfileUploadIdApi,
  PlayerProfileVerificationStatus,
} from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const TalentPlayerProfileUploadId = ({ userId }) => {
  const [fileUploadId, setFileUploadId] = useState(imgPlaceHolder);
  const [uploadId, setUploadId] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loadUploadId, setLoadUploadId] = useState(false);
  const dispatch = useDispatch();
  function handleUploadIdChange(e) {
    setUploadId(e.target.files[0]);
    setFileUploadId(URL.createObjectURL(e.target.files[0]));
    setUploaded(true);
  }

  const ProfileImagemutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/player/identification`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };
      return axios.post(API_URL, formData, config);
    },
    {
      onSuccess: () => {
        toast.success("Form submitted successfully!", {
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
        toast.error("Error occurred while submitting the form.", {
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

  const handleUploadIdSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("identification", uploadId);
    formData.append("id", userId);

    ProfileImagemutation.mutate(formData);
  };

  const handleUploadIDDeleteImage = () => {
    setUploadId(null);
    setFileUploadId(null);
    setUploaded(false);
  };

  return (
    <form
      onSubmit={handleUploadIdSubmit}
      className="Scoutpage_ProfileforContent "
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Upload ID</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Verification by means of ID, International Passport, NIN
      </p>
      <label for="UploadId" className="Scoutpage_Profileform_savebutton ">
        Select Image
      </label>
      <input
        type="file"
        id="UploadId"
        onChange={handleUploadIdChange}
        className="Scoutpage_Profileform_ImgIploaded "
      />

      {uploaded && (
        <div className="Scoutpage_Profileform_ImgIploaded">
          <div className="Scoutpage_Profileform_UploadIDImg">
            <img src={fileUploadId} width="100px" height="100px" />
            <p style={{ marginLeft: "20px" }}> 100 x 100</p>
          </div>
          <RiDeleteBin6Fill
            onClick={handleUploadIDDeleteImage}
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
        </div>
      )}

      <button type="submit" className="Scoutpage_Profileform_uploadButton">
        <FaRegImages style={{ fontSize: "18px", marginRight: "5px" }} />
        {ProfileImagemutation?.isLoading ? (
          <CircularProgress size={15} />
        ) : (
          <span>Upload photo</span>
        )}
      </button>
    </form>
  );
};

export default TalentPlayerProfileUploadId;
