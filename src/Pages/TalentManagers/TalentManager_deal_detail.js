import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GrFormNext } from "react-icons/gr";
import { BsPinAngleFill, BsShareFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

import imgRecipient from "../../assets/imgRecipient.png";
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import { useMutation } from "react-query";
import axios from "axios";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

function TalentManager_deal_detail() {
  const Profilevidoemutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/player/profile-picture`;
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

  return (
    <div className="Scoutpage_contents ">
      <Talent_Header />

      <div className="Scoutpage_DealContent">
        <>
          <ToastContainer />
          <div className="AdminPage_Dashboard">
            <div className="">
              <div className="PlayersViewDeals_Container">
                <div className="PlayersDealsMade_Page">
                  <div className="flex justify-between items-center">
                    <div className="ScoutViewProfile_navigationprogress">
                      <Link
                        to="/afrisport/player/deal"
                        className="ScoutViewProfile_navigationback"
                      >
                        Deals
                      </Link>
                      <GrFormNext style={{ fontSize: "16px" }} />
                      <p className="ScoutViewProfile_navigationprofile">
                        Details
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {" "}
                      <button className="bg-[#F2F3FE] border-[#1D217F] px-3 py-1 border rounded">
                        Update
                      </button>
                      <button className="bg-[#FEFDF2] border-[#7F351D] px-3 py-1 border rounded">
                        Suspend
                      </button>
                      <button className="bg-[#FEF2F2] border-[#7F1D1D] px-3 py-1 border rounded">
                        Terminante
                      </button>
                    </div>
                  </div>
                  <div className="PlayerViewDeals_InfoSection">
                    <div className="PlayerViewDeals_InfoSection_UpperSegment">
                      <div className="PlayerViewdetails_TopicSec">
                        <p className="PlayerViewdetails_DetailsText">
                          Details (Not Paid)
                        </p>
                        <div className="PlayerViewdetails_DownloadButtons">
                          <button className="PlayerViewdetails_DownloadPdf flex items-center">
                            <FaDownload
                              style={{ color: "#3D413D", marginRight: "7px" }}
                            />{" "}
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
                            {" "}
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
                          $100,000
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
                            Accepted
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
                            style={{
                              flex: 1,
                              border: "none",
                              minHeight: "50px",
                            }}
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
        </>
      </div>
    </div>
  );
}

export default TalentManager_deal_detail;
