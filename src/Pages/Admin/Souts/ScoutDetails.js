import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Get_Players_Profile_detailsfun,
  reset_Profile_post_request,
} from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GrFormNext } from "react-icons/gr";
import { BsShareFill } from "react-icons/bs";
import { Skeleton } from "@mui/material";
import { TbCurrencyNaira } from "react-icons/tb";

import {
  Admin_Get_ScoutsDetails_fun,
  Single_Scout_Negotiations_Detail_fun,
  reset__Admin_Scouts_Details_fun,
  reset__Admin_Scouts_fun,
} from "../../../Slice/Admin/Admin_Scouts_Slice";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import ScoutsNegotiateStep from "../../../Components/Admin/AdminScouts/ScoutsNegotiateStep";
import Scout_message_modal from "./Scout_message_modal";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function ScoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const akaka = useSelector((state) => state.reducer?.LoginSlice?.logindata);
  const { Admin_Get_ScoutsDetails, Single_Scout_Negotiations_Detail } =
    useSelector((state) => state.reducer.Admin_Scouts_Slice);

  let user_Data = Admin_Get_ScoutsDetails?.data;

  let PlayerDetails = user_Data;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Admin_Get_ScoutsDetails_fun(id));
    dispatch(reset__Admin_Scouts_fun());
    dispatch(Single_Scout_Negotiations_Detail_fun(id));

    return () => {
      dispatch(reset__Admin_Scouts_fun());
      dispatch(reset__Admin_Scouts_Details_fun());
    };
  }, []);

  const [loading, setLoading] = useState(false);

  const handleSuspend_Unsuspend = async (data, id) => {
    let API_URL;
    if (data === "UnSuspend") {
      API_URL = `${baseURL}admin/player/unsuspend`;
    }
    if (data === "suspend") {
      API_URL = `${baseURL}admin/player/suspend`;
    }

    const tokengot = localStorage.getItem("token");

    try {
      // Set the loading state to true before sending the request
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      const response = await axios.post(
        API_URL,
        {
          user_id: id,
        },
        config
      );

      // Reset the loading state to false after receiving the response
      setLoading(false);

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
      // Reset the loading state to false in case of an error
      setLoading(false);

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
      return error;
    }
  };

  const VerifiedStatus = useSelector(
    (state) => state.reducer?.PlayerProfileSlice?.VerificationStatusData?.data
  );
  let progress =
    VerifiedStatus?.bio +
    VerifiedStatus?.price +
    VerifiedStatus?.physical_stat +
    VerifiedStatus?.images +
    VerifiedStatus?.videos;

  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.message?.id
  );

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer />

      {isModalOpen && (
        <Scout_message_modal
          scout_email={user_Data?.email}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div>
            <div className="ScoutViewProfile_navigation">
              <div className="ScoutViewProfile_navigationprogress">
                <Link
                  to={`/admin/scouts`}
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
                <span
                  style={{
                    color: "rgba(150, 150, 150, 1)",
                    marginLeft: "10px",
                  }}
                >
                  Share
                </span>
              </Link>
            </div>
            <div className="  mt-1 border border-[#D0D4D9]  flex justify-between px-5 py-5 rounded-xl items-center">
              {/* <div className="bg-white  "> */}
              <div className="flex gap-2 font-normal items-center">
                <img
                  src={user_Data?.profile_pics}
                  alt=""
                  className="w-[116px] h-[116px] rounded-[100%] shadow-lg block"
                />

                <div>
                  <p className=" f text-3xl font-normal">
                    {user_Data?.firstname} {user_Data?.surname}
                  </p>

                  <span className=" font-normal text-sm py-2 px-5">
                    {/* {user_Data?.bio?.position.toUpperCase()} */}
                    Scout
                  </span>
                </div>
              </div>

              <div className="flex">
                <div>
                  {user_Data?.status === "suspended" && (
                    <button
                      className="Admin_playersSuspendprofile"
                      onClick={() =>
                        handleSuspend_Unsuspend("UnSuspend", user_Data?.id)
                      }
                    >
                      Un-Suspend
                    </button>
                  )}

                  {user_Data?.status === "active" && (
                    <button
                      className="Admin_playersSuspendprofile"
                      onClick={() =>
                        handleSuspend_Unsuspend("suspend", user_Data?.id)
                      }
                    >
                      Suspend
                    </button>
                  )}
                </div>
                <div>
                  <button
                    className="Admin_playersviewprofile"
                    onClick={() => setIsModalOpen(true)}
                  >
                    message
                  </button>
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className=" bg-white  mt-1 border border-[#D0D4D9] px-8 py-4 rounded-xl">
              <p className="ScoutViewProfile_AboutTopicText">About</p>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">
                  <FiMail />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    <span className="block"> Email</span>
                    <span> {user_Data?.email}</span>
                  </p>
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
                  <FiPhoneCall />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    <span className="block"> Phone</span>
                    <span> {user_Data?.phone}</span>
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText"></p>
                </div>
              </div>
            </div>

            <div className="ScoutViewProfile_PhysicalStatsText">
              <div className="flex flex-wrap gap-3"></div>
            </div>
          </div>

          <ScoutsNegotiateStep />
        </div>
      </div>
    </>
  );
}

export default ScoutDetails;
