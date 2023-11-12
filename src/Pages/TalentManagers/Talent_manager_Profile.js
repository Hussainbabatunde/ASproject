import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import imgPlaceHolder from "../../assets/imageplaceholder.png";

import { AiFillCamera } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import Talent_Profileform from "../../Components/TalentManagersCompnente/Talent_Profileform";
import { Talent_manager_details_Image_uplaod_fun } from "../../Slice/Talent_Manager/Talent_manager_slice";
import TalentProfileUploadId from "../../Components/TalentManagersCompnente/TalentProfileUploadId";

const Talent_manager_Profile = () => {
  const { Talent_manager_details } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  let PlayerDetails = Talent_manager_details?.data;

  let userDataInfo = Talent_manager_details?.data;

  const [imgloader, setImgLoader] = useState(false);

  const [file, setFile] = useState(
    userDataInfo?.profile_pics || imgPlaceHolder
  );
  const [picFile, setPicFile] = useState(null);

  const dispatch = useDispatch();

  function handleChange(e) {
    setPicFile(e.target.files[0]);
    setFile(URL?.createObjectURL(e.target.files[0]));
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
    setFile(PlayerDetails?.profile_pics);

    // dispatch(Talent_manager_details_fun());
  }, [PlayerDetails]);

  return (
    <div className="Scoutpage_maxWidthContainer">
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
                  <label
                    className="ProfileName_InputImage"
                    for="imagePlcholder"
                  >
                    <img src={file} className="Scoutpage_Profile_placeholder" />
                    <input
                      type="file"
                      id="imagePlcholder"
                      onChange={handleChange}
                      className="Scoutpage_Profile_ImagePlaceInput"
                    />
                    {/* ImageHolder_PrifilepicImg */}
                    {console.log({ ss: PlayerDetails?.profile_pics })}
                    <div
                      // className={`${
                      //   PlayerDetails?.profile_pics ? "debug" : ""
                      // }`}

                      className={`ab absolute top-0 w-[132px] bg-black h-[132px] bg-opacity-20 rounded-[50%]`}
                    >
                      <AiFillCamera className="Profile_EditCameraImg" />
                    </div>
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

            <p className="text-red-600">
              Important Notice: Profile has to be completed before adding or
              creating a player.
            </p>
            <Talent_Profileform userId={userId} />

            <TalentProfileUploadId userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent_manager_Profile;
