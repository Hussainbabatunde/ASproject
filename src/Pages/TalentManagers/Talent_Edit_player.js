import React, { useEffect, useState } from "react";
// import "../Scout/ScoutProfile.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { RxExit } from "react-icons/rx";

import { useMutation } from "react-query";

import { ToastContainer, toast } from "react-toastify";
import { UserLogout } from "../../Components/Player/UserLogOut";
// import { reset as resetPlayerProfileSlice } from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
// import { reset as resetGetAllPlayerDealSlice } from "../../Slice/Player/PlayerDeal/PlayerDealSlice";
// import { UserLogout } from "./UserLogOut";
// import PlayerProfileFanService from "./PlayerFanServicePrice";
import { useLocation } from "react-router";
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import {
  Talent_manager_Get_Single_player_fun,
  reset_Single_manager_player,
} from "../../Slice/Talent_Manager/Talent_manager_slice";
import axios from "axios";
import TalentPlayerProfileProfileform from "../../Components/TalentManagersCompnente/TalentPlayerProfileProfileform";
import TalentPlayerProfilePhysicalStats from "../../Components/TalentManagersCompnente/TalentPlayerProfilePhysicalStats";
import TalentPlayerProfileBusinessService from "../../Components/TalentManagersCompnente/TalentPlayerProfileBusinessService";
import TalentPlayerProfileFanService from "../../Components/TalentManagersCompnente/TalentPlayerProfileFanService";
import TalentPlayerProfileUploadId from "../../Components/TalentManagersCompnente/TalentPlayerProfileUploadId";
import TalentPlayerProfileVideo from "../../Components/TalentManagersCompnente/TalentPlayerProfileVideo";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Talent_Edit_player = () => {
  const dispatch = useDispatch();

  let player_data = useLocation();

  const { Talent_manager_Get_Single_player } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );
  const { each } = player_data.state;

  useEffect(() => {
    dispatch(Talent_manager_Get_Single_player_fun(each?.id));
    return () => {
      dispatch(reset_Single_manager_player());
    };
  }, []);

  let Player_Details = Talent_manager_Get_Single_player?.data;

  const [imgloader, setImgLoader] = useState(false);

  const [file, setFile] = useState(Player_Details?.profile_pics);

  const [picFile, setPicFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(Player_Details?.profile_pics);
  const [checkedVideoLink, setCheckedVideoLink] = useState(false);
  const [checkedProfilePic, setCheckedProfilePic] = useState(false);
  const [checkedPhysicalStats, setCheckedPhysicalStats] = useState(false);
  const [checkedUploadPics, setCheckedUploadPics] = useState(false);
  const [checkedMeansofID, setCheckedMeansofID] = useState(false);

  const data = [
    { id: 1, pathTo: "/afrisport/player/profile", pathName: "Profile" },
    { id: 2, pathTo: "/afrisport/player/deal", pathName: "Deals" },
    { id: 3, pathTo: "/afrisport/player/views", pathName: "Views" },
    { id: 4, pathTo: "/afrisport/player/payment", pathName: "Payment" },
  ];

  function handleChange(e) {
    setPicFile(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0])); // Update the image source
  }

  const PlayerDetails = useSelector(
    (state) => state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data
  );
  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );
  const userDataInfo = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user
  );

  //for the vieo upload

  const [inputs, setInputs] = useState([""]);
  const [videoLoader, setVideoLoader] = useState(false); // Initialize with one empty input
  const [videoData, setVideoData] = useState({});

  const addInput = () => {
    const newInputs = [...inputs, ""]; // Add an empty input
    setInputs(newInputs);
  };

  const removeInput = (index) => {
    const newInputs = [...inputs]; // Copy the current inputs array
    newInputs.splice(index, 1); // Remove the input at the specified index
    setInputs(newInputs);
  };

  const handleInputChange = (value, index) => {
    const newInputs = [...inputs];
    newInputs[index] = value; // Update the value of the input at the specified index
    setInputs(newInputs);
  };

  const Profilevidoemutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      console.log({ formData });
      let API_URL = `${baseURL}talent-manager/player/video_text_url`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
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

  console.log({ ee: Player_Details?.id });

  const handleSubmitVideos = async (e) => {
    videoData.user_id = Player_Details?.id;

    videoData.videos_url = inputs;
    e.preventDefault();

    setVideoLoader(true);
    console.log({ videoData });
    Profilevidoemutation.mutate(videoData);

    // await dispatch(PlayerProfileVideoLink(videoData));
    setVideoLoader(false);
  };

  // useEffect(() => {
  //   setFile(PlayerDetails?.profile_pics);
  // }, [PlayerDetails]);

  const ProfileImagemutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/player/profile-picture`;
      const tokengot = localStorage.getItem("token");

      console.log({ formData });

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

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", picFile);
    formData.append("id", Player_Details?.id);

    ProfileImagemutation.mutate(formData);
  };

  return (
    <div className="Scoutpage_contents">
      <ToastContainer />

      <Talent_Header />

      <div className="Scoutpage_maxWidthContainer">
        <div className="Scoutpage_ProfileContent">
          <div className="Scoutpage_ProfileContent_editformside">
            <div className="Scoutpage_Profile_ImgVerificationSec">
              <div className="Scoutpage_Profile_ImgNameSec">
                <form
                  onSubmit={handleImgSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <label for="imagePlcholder">
                    <img
                      src={imageSrc}
                      alt=""
                      className="Scoutpage_Profile_placeholder"
                    />

                    <input
                      type="file"
                      id="imagePlcholder"
                      onChange={handleChange}
                      className="Scoutpage_Profile_ImagePlaceInput"
                    />
                  </label>
                  <button
                    type="submit"
                    className="Scoutpage_Profileform_savebutton"
                  >
                    {ProfileImagemutation?.isLoading ? (
                      <CircularProgress size={15} />
                    ) : (
                      <span>Upload photo</span>
                    )}
                  </button>
                </form>
                <div className="Scoutpage_Profile_nameVerify">
                  <p className="Scoutpage_profile_Username">
                    {`${Player_Details?.firstname} ${Player_Details?.surname}`}
                    <span className="Scoutpage_Profile_Verificationstatus">
                      {Player_Details?.reviewed === "approved"
                        ? " ( Verified)"
                        : " (not Verified)"}
                    </span>
                  </p>
                  <p className="Scoutpage_profile_Usertype">Player Account</p>
                </div>
              </div>
              <Link
                to="/afrisport/player/viewprofile"
                className="Scoutpage_Profile_Viewprofilebutton"
              >
                View Profile
              </Link>
            </div>

            <TalentPlayerProfileProfileform user_data={Player_Details} />
            <TalentPlayerProfilePhysicalStats user_data={Player_Details} />
            <TalentPlayerProfileBusinessService user_data={Player_Details} />
            {/* <TalentPlayerProfileFanService user_data={Player_Details} /> */}
            <TalentPlayerProfileUploadId user_data={Player_Details} />
            <TalentPlayerProfileVideo
              user_data={Player_Details}
              videoLoader={videoLoader}
              handleSubmitVideos={handleSubmitVideos}
              addInput={addInput}
              handleInputChange={handleInputChange}
              inputs={inputs}
              removeInput={removeInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent_Edit_player;
