import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { BsPinAngleFill, BsShareFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

import imgRecipient from "../../../assets/imgRecipient.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Details_Of_Scout_Negotiations_Detail_fun,
  reset_Details_Of_Scout_Negotiations_Detail_fun,
  reset__Admin_Scouts_fun,
} from "../../../Slice/Admin/Admin_Scouts_Slice";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function ScoutNegotiationDetails() {
  const navigate = useNavigate();
  let { state } = useLocation();

  const { Details_Of_Scout_Negotiations_Detail } = useSelector(
    (state) => state.reducer.Admin_Scouts_Slice
  );

  console.log(Details_Of_Scout_Negotiations_Detail);

  let detail_Data;
  if (
    Details_Of_Scout_Negotiations_Detail &&
    Details_Of_Scout_Negotiations_Detail.length > 0
  ) {
    detail_Data = Details_Of_Scout_Negotiations_Detail[0];
  } else {
    console.log("Response is null or empty");
  }

  console.log(detail_Data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Details_Of_Scout_Negotiations_Detail_fun(state));
    return () => {
      dispatch(reset_Details_Of_Scout_Negotiations_Detail_fun());
      dispatch(reset__Admin_Scouts_fun());
    };
  }, []);

  const Suspend_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API
      let API_URL;
      const tokengot = localStorage.getItem("token");

      if (data === "suspend") {
        API_URL = `${baseURL}admin/scout/suspend`;
      }

      if (data === "UnSuspend") {
        API_URL = `${baseURL}admin/scout/unsuspend`;
      }

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          "Content-type": "application/json",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      let item = {
        user_id: detail_Data?.OfferId,
      };

      try {
        const response = await axios.post(API_URL, item, config);
        console.log(response.data); // Logging the response data

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        // Success toast notification
        toast.success(" successfully!", {
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
        // Error toast notification
        toast.error("Error occurred while submitting .", {
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

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="">
            <div className="PlayersViewDeals_Container">
              <div className="PlayersDealsMade_Page">
                <div className="flex justify-between items-center">
                  <div className="ScoutViewProfile_navigationprogress">
                    <span
                      className="ScoutViewProfile_navigationback"
                      onClick={() => navigate(-1)}
                    >
                      Deals
                    </span>
                    <GrFormNext style={{ fontSize: "16px" }} />
                    <p className="ScoutViewProfile_navigationprofile">
                      Details
                    </p>
                  </div>

                  <h1>
                    {/* {detail_Data?.status === "accepted" && ( */}
                    {/* <div className="flex gap-2">
                      <button className="bg-[#F2F3FE] border-[#1D217F] px-3 py-1 border rounded">
                        Update
                      </button>
                      <button
                        onClick={() => {
                          Suspend_Mutation.mutate("Suspend");
                        }}
                        className="bg-[#FEFDF2] border-[#7F351D] px-3 py-1 border rounded"
                      >
                        Suspend
                      </button>

                      <button
                        onClick={() => {
                          Suspend_Mutation.mutate("UnSuspend");
                        }}
                        className="bg-[#FEFDF2] border-[#7F351D] px-3 py-1 border rounded"
                      >
                        Un-Suspend
                      </button>
                      <button className="bg-[#FEF2F2] border-[#7F1D1D] px-3 py-1 border rounded">
                        Terminante
                      </button>
                    </div> */}
                    {/* )} */}
                  </h1>
                </div>
                <div className="PlayerViewDeals_InfoSection">
                  <div className="PlayerViewDeals_InfoSection_UpperSegment">
                    <div className="PlayerViewdetails_TopicSec">
                      <p className="PlayerViewdetails_DetailsText">
                        Details
                        {detail_Data?.payment_state === "0"
                          ? " (Not Paid)"
                          : "  ( Paid)"}
                      </p>
                      <div className="PlayerViewdetails_DownloadButtons">
                        <button className="PlayerViewdetails_DownloadPdf flex items-center">
                          <FaDownload
                            style={{ color: "#3D413D", marginRight: "7px" }}
                          />
                          <span> Download</span>
                        </button>

                        <button className="flex gap-2 bg-[#DBDBDB] px-3 py-1 rounded items-center">
                          <BsPinAngleFill />

                          <span> Pin </span>
                        </button>
                      </div>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Sent By:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        <img
                          src={imgRecipient}
                          className="useTable_ImageRecipient"
                        />
                        <span className="PlayerViewdetails_sendername">
                          Nicole Frami
                        </span>
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Duration:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        6 months
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Expiring:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        23 - 8 - 2023
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Amount:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        $ {detail_Data?.value}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Name:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        Join Europe Football
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Status:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        <span className="PlayerViewdetails_response_styling">
                          {detail_Data?.status}
                        </span>
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Description:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        This is to describe the negotiation
                        hjdskjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                      </p>
                    </div>
                  </div>
                  <div className="PlayerViewDeals_InfoSection_LowerSegment">
                    <div className="PlayerViewDeals_CommentImgName">
                      <img
                        src={imgRecipient}
                        className="useTable_ImageRecipient"
                      />
                      <div className="PlayerViewDeals_CommentNameandDetails">
                        <p className="PlayerViewdetails_sendername">
                          Ms Lucas Howe{" "}
                          <span className="PlayerViewDeals_DateDetails">
                            3 days ago
                          </span>
                        </p>
                        <p className="PlayerViewDeals_CommentDetails">
                          {" "}
                          Hi, i am the talent manager for the player.
                        </p>
                      </div>
                    </div>
                    <div className="PlayerViewDeals_CommentImgName">
                      <img
                        src={imgRecipient}
                        className="useTable_ImageRecipient"
                      />
                      <div className="PlayerViewDeals_CommentNameandDetails">
                        <p className="PlayerViewdetails_sendername">
                          Ms Lucas Howe{" "}
                          <span className="PlayerViewDeals_DateDetails">
                            3 days ago
                          </span>
                        </p>
                        <p className="PlayerViewDeals_CommentDetails">
                          {" "}
                          Hi, i am the talent manager for the player.
                        </p>
                      </div>
                    </div>
                    <div className="PlayerViewDeals_CommentSectionDiv">
                      <div className="PlayerViewDeals_CommentSectionInnerDiv">
                        <textarea
                          placeholder="Make a comment"
                          style={{ flex: 1, border: "none", minHeight: "50px" }}
                        />
                        <button className="PlayerViewDeals_CommentButton">
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoutNegotiationDetails;
