import React, { useEffect, useState } from "react";
import "../Scout/ScoutProfile.css";
import imgPlaceHolder from "../../assets/imageplaceholder.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { LogoutAuth } from "../../Slice/auth/Login";
import { RxExit } from "react-icons/rx";
import { NavLink, Route, Routes } from "react-router-dom";
import PlayerProfileProfileform from "./PlayerProfileProfileform";
import PlayerProfileBusinessService from "./PlayerProfileBusinessService";
import PlayerProfileUploadId from "./PlayerProfileUploadId";
import PlayerProfileYourImages from "./PlayerProfileYourImages";
import PlayerProfileVideo from "./PlayerProfileVideo";
import PlayerProfilePhysicalStats from "./PlayerProfilePhysicalStats";
import {
  PlayerProfilePicture,
  PlayerProfileVerificationStatus,
  PlayerProfileVideoLink,
  ProfileDetailsPlayer,
} from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import { ToastContainer } from "react-toastify";
import { reset as resetPlayerProfileSlice } from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import { reset as resetGetAllPlayerDealSlice } from "../../Slice/Player/PlayerDeal/PlayerDealSlice";
import { UserLogout } from "./UserLogOut";
import PlayerProfileFanService from "./PlayerFanServicePrice";

const PlayerProfile = () => {
  const VerifiedStatus = useSelector(
    (state) => state.reducer?.PlayerProfileSlice?.VerificationStatusData?.data
  );
  // console.log('verification ', VerifiedStatus)
  let progress =
    VerifiedStatus?.identification +
    VerifiedStatus?.profile_pics +
    VerifiedStatus?.physical_stat +
    VerifiedStatus?.images +
    VerifiedStatus?.videos;
  useEffect(() => {
    if (VerifiedStatus?.videos == 20) {
      setCheckedVideoLink(true);
    }
    if (VerifiedStatus?.physical_stat == 20) {
      setCheckedPhysicalStats(true);
    }
    if (VerifiedStatus?.images == 20) {
      setCheckedUploadPics(true);
    }
    if (VerifiedStatus?.identification == 20) {
      setCheckedMeansofID(true);
    }
    if (VerifiedStatus?.profile_pics == 20) {
      setCheckedProfilePic(true);
    }
  }, [VerifiedStatus]);

  const Parentdiv = {
    height: "1rem",
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#91BE3F",
    borderRadius: 40,
    textAlign: "right",
    marginTop: 10,
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  const [imgloader, setImgLoader] = useState(false);

  const [file, setFile] = useState(imgPlaceHolder);
  const [picFile, setPicFile] = useState(null);
  const [checkedVideoLink, setCheckedVideoLink] = useState(false);
  const [checkedProfilePic, setCheckedProfilePic] = useState(false);
  const [checkedPhysicalStats, setCheckedPhysicalStats] = useState(false);
  const [checkedUploadPics, setCheckedUploadPics] = useState(false);
  const [checkedMeansofID, setCheckedMeansofID] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(LogoutAuth());
    // await dispatch(resetPlayerProfileSlice())
    UserLogout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  const data = [
    { id: 1, pathTo: "/afrisport/player/profile", pathName: "Profile" },
    { id: 2, pathTo: "/afrisport/player/deal", pathName: "Scout Deals" },
    {id: 2, pathTo: '/afrisport/player/fandeal', pathName: 'Fan Deals'},
    { id: 3, pathTo: "/afrisport/player/views", pathName: "Views" },
    { id: 4, pathTo: "/afrisport/player/payment", pathName: "Payment" },
  ];
  function handleChange(e) {
    // console.log(e.target.files[0])
    setPicFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
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
  // console.log('user ', userId)

  useEffect(() => {
    const checkingVerification = async () => {
      await dispatch(ProfileDetailsPlayer(userId));
      await dispatch(PlayerProfileVerificationStatus(userId));
    };
    checkingVerification();
  }, []);

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", picFile);
    formData.append("id", userId);

    setImgLoader(true);
    await dispatch(PlayerProfilePicture(formData));
    await dispatch(PlayerProfileVerificationStatus(userId));
    setImgLoader(false);
  };

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

  const handleSubmitVideos = async (e) => {
    videoData.user_id = userId;
    videoData.videos_url = inputs;
    e.preventDefault();
    setVideoLoader(true);
    await dispatch(PlayerProfileVideoLink(videoData));
    await dispatch(PlayerProfileVerificationStatus(userId))
    setVideoLoader(false);
    // console.log('inputs ', inputs)
  };

  useEffect(() => {
    setFile(PlayerDetails?.profile_pics);
  }, [PlayerDetails]);

  return (
    <div className="Scoutpage_contents">
      <ToastContainer />
      <div className="Scoutpage_AccountLogout_div">
        <p className="Scoutpage_AccountWord">Account</p>
        <p
          className="Scoutpage_AccountWord"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout <RxExit />
        </p>
      </div>
      <div className="Scoutpage_LinkPages">
        {data.map((each, index) => (
          <NavLink
            to={each?.pathTo}
            key={index}
            className={({ isActive }) =>
              isActive ? "Scoutpage_Profileactivepage" : "Scoutpage_Profilepage"
            }
          >
            {each?.pathName}
          </NavLink>
        ))}
      </div>
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
                  <img src={file} className="Scoutpage_Profile_placeholder" />
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
                  {imgloader ? (
                    <CircularProgress size={15} />
                  ) : (
                    <span>Upload photo</span>
                  )}
                </button>
              </form>
              <div className="Scoutpage_Profile_nameVerify">
                <p className="Scoutpage_profile_Username">
                  {`${userDataInfo?.firstname} ${userDataInfo?.surname}`}{" "}
                  <span className="Scoutpage_Profile_Verificationstatus">
                    (not Verified)
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
          <PlayerProfileProfileform userId={userId} />
          <PlayerProfilePhysicalStats userId={userId} />
          <PlayerProfileBusinessService userId={userId} />
          <PlayerProfileFanService userId={userId} />
          <PlayerProfileUploadId userId={userId} />
          <PlayerProfileYourImages userId={userId} />
          <PlayerProfileVideo
            userId={userId}
            videoLoader={videoLoader}
            handleSubmitVideos={handleSubmitVideos}
            addInput={addInput}
            handleInputChange={handleInputChange}
            inputs={inputs}
            removeInput={removeInput}
          />
        </div>
        <div className="ScoutProfile_VerificationCol">
          <div className="ScoutProfile_VerificationDiv">
            <p className="Scoutpage_Profile_Profiledetailstext">
              Verify Account
            </p>
            <p className="ScoutProfile_VerifyAccountText">
              Your profile is not visible. Complete 3 more tasks to level up to
            </p>
            <div style={Parentdiv}>
              <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
              </div>
            </div>
            <div className="ScoutProfile_VerifyAccountCheckdiv">
              <input type="radio" checked={checkedVideoLink} />
              <p className="ScoutProfile_VerifyAccountCheck_Text">
                Add a Youtube link to a Video of your showcasing skillsets
              </p>
            </div>
            <div className="ScoutProfile_VerifyAccountCheckdiv">
              <input type="radio" checked={checkedProfilePic} />
              <p className="ScoutProfile_VerifyAccountCheck_Text">
                Upload a Profile Picture of Your Actial face
              </p>
            </div>
            <div className="ScoutProfile_VerifyAccountCheckdiv">
              <input type="radio" checked={checkedPhysicalStats} />
              <p className="ScoutProfile_VerifyAccountCheck_Text">
                Add all Your Physical Stats
              </p>
            </div>
            <div className="ScoutProfile_VerifyAccountCheckdiv">
              <input type="radio" checked={checkedUploadPics} />
              <p className="ScoutProfile_VerifyAccountCheck_Text">
                Upload 5 pictures of yourself
              </p>
            </div>
            <div className="ScoutProfile_VerifyAccountCheckdiv">
              <input type="radio" checked={checkedMeansofID} />
              <p className="ScoutProfile_VerifyAccountCheck_Text">
                Upload Means of ID
              </p>
            </div>
            <button className="ScoutProfile_Profileform_SendRequest">
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
