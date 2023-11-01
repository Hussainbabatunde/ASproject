import React, { useEffect, useState } from "react";
import "../../Pages/Scout/ScoutViewProfile.css";
import { Link, useLocation } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { BsShareFill } from "react-icons/bs";
import imgPlaceholder from "../../assets/imgPlaceholder.png";
import { BsFillPatchCheckFill, BsHouseDoor, BsDot } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { RiDashboardLine } from "react-icons/ri";
import PlayerImg from "../../assets/Player1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  PlayerDeleteImgApi,
  PlayerDeleteVideoApi,
  PlayerProfileVerificationStatus,
  PlayerSetCoverImg,
  ProfileDetailsPlayer,
} from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import { CircularProgress, Skeleton } from "@mui/material";
import ReactPlayer from "react-player";
import { ToastContainer } from "react-toastify";
// import ModalImgViewProfile from "./ModalImgViewProfile";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import ModalImgViewProfile from "../../Components/Player/ModalImgViewProfile";
import AdvertisePlayerModal from "../../Components/Player/AdvertisePlayerModal";
import {
  Talent_manager_Get_Single_player_fun,
  reset_Single_manager_player,
} from "../../Slice/Talent_Manager/Talent_manager_slice";

const Talent_PlayerDetails = () => {
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

  let PlayerDetails = Talent_manager_Get_Single_player?.data;

  const [loading, setLoading] = useState(false);

  const [deleteimgIndex, setDeleteImgIndex] = useState({});
  //   const [deleteVideoIndex, setDeleteVideoIndex] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [imgModal, setImgModal] = useState(null);
  const [showImgModal, setShowImgModal] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div className="ScoutViewProfile">
      <ToastContainer />
      <div className="ScoutViewProfile_navigation">
        <div className="ScoutViewProfile_navigationprogress">
          <Link
            to="/afrisport/talent-manager/players"
            className="ScoutViewProfile_navigationback"
          >
            Back
          </Link>
          <GrFormNext style={{ fontSize: "16px" }} />
          <p className="ScoutViewProfile_navigationprofile">Profile</p>
        </div>
        <Link className="ScoutViewProfile_share">
          {" "}
          <BsShareFill style={{ color: "rgba(150, 150, 150, 1)" }} />{" "}
          <span style={{ color: "rgba(150, 150, 150, 1)", marginLeft: "10px" }}>
            Share
          </span>
        </Link>
      </div>

      <div className="ScoutViewProfile_UserProfileSection">
        <div className="ScoutViewProfile_UserProfiledetailsSection">
          <img
            src={PlayerDetails?.profile_pics}
            alt="image placeholder"
            className="ScoutViewProfile_UserProfileImage"
          />
          <div>
            <p className="ScoutViewProfile_UserProfiledetailsUsername">
              {loading == true ? (
                <Skeleton variant="rounded" width="90%" height={32} />
              ) : (
                <span style={{ display: "flex", alignItems: "center" }}>
                  {PlayerDetails?.firstname} {PlayerDetails?.surname}{" "}
                  <BsFillPatchCheckFill
                    style={{
                      fontSize: "22px",
                      color: "#0F7BEF",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              )}
            </p>
            <p className="ScoutViewProfile_UserProfileScore">
              {/* Score: {progress}/100 */}
            </p>
            {loading == true ? (
              <Skeleton variant="rounded" width="90%" height={22} />
            ) : (
              <p className="ScoutViewProfile_UserProfileCurrentlyAvailable">
                {PlayerDetails?.bio?.available == 0
                  ? `Not Available`
                  : `Currently Available`}
              </p>
            )}
            <div className="ScoutViewProfile_UserProfilePositionSection">
              {loading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="ScoutViewProfile_UserProfilePosition">
                  {/* {positionPlayed} */}
                </p>
              )}
            </div>

            <p className="ScoutViewProfile_UserProfilePricerange">
              Contract:{" "}
              {loading == true ? (
                <Skeleton variant="rounded" width="90%" height={20} />
              ) : (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <TbCurrencyNaira style={{ fontSize: "18px" }} />
                  {PlayerDetails?.price?.minimum} -{" "}
                  {PlayerDetails?.price?.maximum}
                </span>
              )}
            </p>
          </div>
        </div>
        {/* 
        <button
          onClick={() => setShow(true)}
          className="ScoutViewProfile_AdvertiseProfile"
        >
          Advertise Profile
        </button> */}
      </div>

      <div className="ScoutViewProfile_AboutSection">
        <p className="ScoutViewProfile_AboutTopicText">About</p>
        <div className="ScoutViewProfile_AboutSectionInfo">
          <p className="ScoutViewProfile_AboutSectionIcon">66</p>
          <div>
            <p className="ScoutViewProfile_AboutSectionIconTopic">Biography</p>
            <p className="ScoutViewProfile_AboutSectionIconText">
              {loading == true ? (
                <Skeleton variant="rounded" width="90%" height={22} />
              ) : (
                PlayerDetails?.bio?.about
              )}
            </p>
          </div>
        </div>
        <div className="ScoutViewProfile_AboutSectionInfo">
          <p className="ScoutViewProfile_AboutSectionIcon">
            <MdOutlineDashboard />
          </p>
          <div>
            <p className="ScoutViewProfile_AboutSectionIconTopic">
              Current Club
            </p>
            <p className="ScoutViewProfile_AboutSectionIconText">
              {loading == true ? (
                <Skeleton variant="rounded" width="90%" height={22} />
              ) : (
                PlayerDetails?.bio?.current_club
              )}
            </p>
          </div>
        </div>
        <div className="ScoutViewProfile_AboutSectionInfo">
          <p className="ScoutViewProfile_AboutSectionIcon">
            <SlLocationPin />
          </p>
          <div>
            <p className="ScoutViewProfile_AboutSectionIconTopic">Location</p>
            <p className="ScoutViewProfile_AboutSectionIconText">
              {loading == true ? (
                <Skeleton variant="rounded" width="90%" height={22} />
              ) : (
                PlayerDetails?.bio?.location
              )}
            </p>
          </div>
        </div>
        <div className="ScoutViewProfile_AboutSectionInfo">
          <p className="ScoutViewProfile_AboutSectionIcon">
            <BsHouseDoor />
          </p>
          <div>
            <p className="ScoutViewProfile_AboutSectionIconTopic">Hometown</p>
            <p className="ScoutViewProfile_AboutSectionIconText">
              {loading == true ? (
                <Skeleton variant="rounded" width="90%" height={22} />
              ) : (
                PlayerDetails?.bio?.home_town
              )}
              .
            </p>
          </div>
        </div>
        <div className="ScoutViewProfile_AboutSectionInfo">
          <p className="ScoutViewProfile_AboutSectionIcon">
            <RiDashboardLine />
          </p>
          <div>
            <p className="ScoutViewProfile_AboutSectionIconTopic">Interest</p>
            <p className="ScoutViewProfile_AboutSectionIconText">
              Gamming, Singing.
            </p>
          </div>
        </div>
        <p className="ScoutViewProfile_PhysicalStatsText">Physical Stats</p>
        <div className="ScoutViewProfile_PhysicalStatsInfo">
          <p className="ScoutViewProfile_PhysicalStatsGender">
            Gender:{" "}
            {loading == true ? (
              <Skeleton variant="rounded" width="90%" height={22} />
            ) : (
              PlayerDetails?.physical_stat?.gender
            )}
          </p>
          <p className="ScoutViewProfile_PhysicalStatsGender">
            Height:{" "}
            {loading == true ? (
              <Skeleton variant="rounded" width="90%" height={22} />
            ) : (
              PlayerDetails?.physical_stat?.height
            )}
            ft
          </p>
          <p className="ScoutViewProfile_PhysicalStatsGender">
            Language:{" "}
            {loading == true ? (
              <Skeleton variant="rounded" width="90%" height={22} />
            ) : (
              PlayerDetails?.physical_stat?.language
            )}
          </p>
          <p className="ScoutViewProfile_PhysicalStatsGender">
            Weight:{" "}
            {loading == true ? (
              <Skeleton variant="rounded" width="90%" height={22} />
            ) : (
              PlayerDetails?.physical_stat?.weight
            )}
            kg
          </p>
          <p className="ScoutViewProfile_PhysicalStatsGender">
            Religion: Christian
          </p>
          <p className="ScoutViewProfile_PhysicalStatsGender">
            Stronger foot:{" "}
            {loading == true ? (
              <Skeleton variant="rounded" width="90%" height={22} />
            ) : (
              PlayerDetails?.physical_stat?.strong_foot
            )}
          </p>
        </div>
      </div>

      <p className="ScoutViewProfile_PhysicalStatsText">
        Images <BsDot style={{ fontSize: "25px" }} />{" "}
        {/* {PlayerDetails?.images.length}{" "} */}
      </p>

      <div className="ScoutViewProfile_ImageSection">
        {PlayerDetails?.images?.map((each, index) => (
          <div key={index} className="ScoutViewProfile_ImageDiv">
            <img
              src={each?.image_url}
              //   onClick={() => handleImageClicked(each?.image_url)}
              className="ScoutViewProfile_Image"
            />

            <div className="Button_Imgdiv_ModalView">
              <button
                className="ScoutViewProfile_Image_CoverImg"
                // onClick={() => handleSetCoverImg(each?.id)}
              >
                {loadingIndex == each?.id ? (
                  <CircularProgress size={15} />
                ) : (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <AiFillStar style={{ marginRight: "5px", color: "gray" }} />
                    Set as Cover Image
                  </span>
                )}
              </button>
              <button
                className="ScoutViewProfile_Image_DeleteImg"
                // onClick={() => handleDeleteImg(each?.id)}
              >
                {deleteimgIndex == each?.id ? (
                  <CircularProgress size={15} />
                ) : (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <AiFillDelete style={{ marginRight: "5px" }} />
                    Delete
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="ScoutViewProfile_PhysicalStatsText">
        Video <BsDot style={{ fontSize: "25px" }} />{" "}
        {PlayerDetails?.videos?.length}{" "}
      </p>

      <div className="ScoutViewProfile_VideoSection">
        {PlayerDetails?.videos?.map((each, index) => (
          <div key={index} className="ScoutViewProfile_VideoDiv">
            <ReactPlayer
              width="300px"
              height="300px"
              controls
              url={each?.video_url}
            />
            <button
              //   onClick={() => handleDeleteVideo(each?.id)}
              className="ViewProfile_DeleteVideo"
            >
              {/* {deleteVideoIndex == each?.id ? (
                <CircularProgress size={15} />
              ) : (
                <span>Delete</span>
              )} */}
            </button>
          </div>
        ))}
      </div>

      {/* <ModalImgViewProfile
        showImgModal={showImgModal}
        imgModal={imgModal}
        handleCloseImageClicked={handleCloseImageClicked}
      />

      <AdvertisePlayerModal
        show={show}
        progress={progress}
        hideAdvertiseProfile={hideAdvertiseProfile}
        positionPlayed={positionPlayed}
      /> */}
    </div>
  );
};

export default Talent_PlayerDetails;
