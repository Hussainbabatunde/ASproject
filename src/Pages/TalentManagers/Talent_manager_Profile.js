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
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import Talent_Profileform from "../../Components/TalentManagersCompnente/Talent_Profileform";
import {
  Talent_manager_details_Image_uplaod_fun,
  Talent_manager_details_fun,
} from "../../Slice/Talent_Manager/Talent_manager_slice";
import TalentProfileUploadId from "../../Components/TalentManagersCompnente/TalentProfileUploadId";

const Talent_manager_Profile = () => {
  const { Talent_manager_details } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  let userDataInfo = Talent_manager_details?.data;

  const [imgloader, setImgLoader] = useState(false);

  const [file, setFile] = useState(
    userDataInfo?.profile_pics || imgPlaceHolder
  );
  const [picFile, setPicFile] = useState(null);

  const dispatch = useDispatch();

  function handleChange(e) {
    setPicFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", picFile);
    formData.append("id", userId);

    setImgLoader(true);
    dispatch(Talent_manager_details_Image_uplaod_fun(formData));

    setImgLoader(false);
  };

  useEffect(() => {
    dispatch(Talent_manager_details_fun());

    return () => {};
  }, []);

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

          <TalentProfileUploadId userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Talent_manager_Profile;
