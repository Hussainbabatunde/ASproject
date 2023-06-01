import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAuth } from "../../Slice/auth/Login";
import {
  ProfileDetailsfan,
  fanProfilePicture,
} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice";
import CircularProgress from "@mui/material/CircularProgress";
import imgPlaceHolder from "../../assets/imageplaceholder.png";

import { ToastContainer } from "react-toastify";
import { NavLink, Route, Routes } from "react-router-dom";
import { UserLogout } from "../../Components/Player/UserLogOut";
import FanProfileUploadId from "../../Components/Fan/FanProfileUploadId";
import FanProfileProfileform from "../../Components/Fan/FanProfileProfileform";
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import Talent_Profileform from "../../Components/TalentManagersCompnente/Talent_Profileform";

const Talent_manager_Profile = () => {
  const { Talent_manager_details } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  let userDataInfo = Talent_manager_details?.data;

  const VerifiedStatus = useSelector(
    (state) => state.reducer?.ScoutProfileSlice?.VerificationStatusData?.data
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

  const [imgloader, setImgLoader] = useState(false);

  const [file, setFile] = useState(userDataInfo || imgPlaceHolder);
  const [picFile, setPicFile] = useState(null);
  const [checkedVideoLink, setCheckedVideoLink] = useState(false);
  const [checkedProfilePic, setCheckedProfilePic] = useState(false);
  const [checkedPhysicalStats, setCheckedPhysicalStats] = useState(false);
  const [checkedUploadPics, setCheckedUploadPics] = useState(false);
  const [checkedMeansofID, setCheckedMeansofID] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(LogoutAuth());
    // await dispatch(resetScoutProfileSlice())
    UserLogout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  function handleChange(e) {
    // console.log(e.target.files[0])
    setPicFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );

  const PlayerDetails = useSelector(
    (state) => state?.reducer?.FanProfileSlice?.fanAllProfileDetailsData?.data
  );

  useEffect(() => {
    dispatch(ProfileDetailsfan(userId));
    return () => {};
  }, []);

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", picFile);
    formData.append("id", userId);

    setImgLoader(true);
    await dispatch(fanProfilePicture(formData));
    // await dispatch(ScoutProfileVerificationStatus())
    setImgLoader(false);
  };

  return (
    <div className="Scoutpage_contents">
      <ToastContainer />

      <Talent_Header />

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
                    src={file}
                    className="Scoutpage_Profile_placeholder"
                    width="132px"
                    height="136px"
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
                  {imgloader ? (
                    <CircularProgress size={15} />
                  ) : (
                    <span>Upload photo</span>
                  )}
                </button>
              </form>
              <div className="Scoutpage_Profile_nameVerify">
                <p className="Scoutpage_profile_Username">{`${userDataInfo?.firstname} ${userDataInfo?.surname}`}</p>
                <p className="Scoutpage_profile_Usertype">Talent Account</p>
              </div>
            </div>
            {/* <Link to='/afrisport/player/viewprofile' className='Scoutpage_Profile_Viewprofilebutton'>View Profile</Link> */}
          </div>

          <Talent_Profileform userId={userId} />
          <FanProfileUploadId userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Talent_manager_Profile;
