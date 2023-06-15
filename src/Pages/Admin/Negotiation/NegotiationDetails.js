import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { BsPinAngleFill, BsShareFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

import imgRecipient from "../../../assets/imgRecipient.png";
import {
  Admin___Negotiations_comment_fun,
  Admin___Negotiations_detail_fun,
} from "../../../Slice/Admin/Admin_NegotiationsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function NegotiationDetails() {
  const { Admin___Negotiations_detail, Admin___Negotiations_comment } =
    useSelector((state) => state.reducer.Admin_NegotiationsSlice);

  const dispatch = useDispatch();
  let { state } = useLocation();
  // const {each} = Offer_data.state
  console.log(state);

  let offer_id = state?.comments?.active_offers?.OfferId || state?.OfferId;
  let from_id = state?.comments?.active_offers?.from || state?.from;

  useEffect(() => {
    dispatch(Admin___Negotiations_detail_fun({ offer_id, from_id }));
    dispatch(Admin___Negotiations_comment_fun(offer_id));

    return () => {};
  }, []);

  let negotiation_data = Admin___Negotiations_detail[0];

  let comment_message = Admin___Negotiations_comment?.data[1];

  function calculateMonthDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const startDay = start.getDate();

    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    const endDay = end.getDate();

    let months = (endYear - startYear) * 12 + (endMonth - startMonth);
    let days = endDay - startDay;

    if (days < 0) {
      months--;
      const tempDate = new Date(endYear, endMonth, 0);
      days = tempDate.getDate() - startDay + endDay;
    }

    return { months, days };
  }

  function formatExpirationDate(endDate) {
    const end = new Date(endDate);

    const day = end.getDate();
    const month = end.getMonth() + 1; // Adding 1 since months are zero-based
    const year = end.getFullYear();

    return `${day} - ${month} - ${year}`;
  }

  const duration = calculateMonthDuration(
    negotiation_data?.to_start,
    negotiation_data?.to_end
  );

  const formattedExpirationDate = formatExpirationDate(
    negotiation_data?.to_end
  );

  function calculateRelativeTime(createdDate) {
    const currentDate = new Date();
    const date = new Date(createdDate);

    const timeDifference = currentDate.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      return "Today";
    } else if (daysDifference === 1) {
      return "Yesterday";
    } else {
      return `${daysDifference} days ago`;
    }
  }

  const Suspend_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let item = {
        offer_id: offer_id,
      };

      console.log(item);

      let API_URL = `${baseURL}admin/negotiations/suspend-offer`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
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
        // dispatch(Talent_manager_Interaction_fun({ player, request, sender }));

        // Success toast notification
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
        // Error toast notification
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

  const Terminante_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let item = {
        offer_id: offer_id,
      };

      console.log(item);

      let API_URL = `${baseURL}admin/negotiations/terminate-offer`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
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
        // dispatch(Talent_manager_Interaction_fun({ player, request, sender }));

        // Success toast notification
        toast.success("Terminanted successfully!", {
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
    <>
      <ToastContainer />
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="">
            <div className="PlayersViewDeals_Container">
              <div className="PlayersDealsMade_Page">
                <div className="flex justify-between items-center">
                  <div className="ScoutViewProfile_navigationprogress">
                    <Link
                      to="/admin/negotiations"
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
                    <button
                      className="bg-[#FEFDF2] border-[#7F351D] px-3 py-1 border rounded"
                      onClick={() => Suspend_Mutation.mutate()}
                    >
                      {Suspend_Mutation?.isLoading ? (
                        <PulseLoader
                          color="black"
                          size={13}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Suspend"
                      )}
                    </button>
                    <button
                      className="bg-[#FEF2F2] border-[#7F1D1D] px-3 py-1 border rounded"
                      onClick={() => Terminante_Mutation.mutate()}
                    >
                      {Suspend_Mutation?.isLoading ? (
                        <PulseLoader
                          color="black"
                          size={13}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Terminante"
                      )}
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
                          src={negotiation_data?.profile_pics}
                          className="useTable_ImageRecipient"
                        />
                        <span className="PlayerViewdetails_sendername">
                          {`${negotiation_data?.firstname} -
                              ${negotiation_data?.surname}`}
                        </span>
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Duration:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {duration.months}{" "}
                        {duration.months === 1 ? "month" : "months"} and{" "}
                        {duration.days} {duration.days === 1 ? "day" : "days"}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Expiring:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        {formattedExpirationDate}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Amount:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        ${negotiation_data?.value}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Name:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        {negotiation_data?.name}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Status:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        <span className="PlayerViewdetails_response_styling">
                          {negotiation_data?.status}
                        </span>
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Description:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {negotiation_data?.detail}
                      </p>
                    </div>
                  </div>
                  <div className="PlayerViewDeals_InfoSection_LowerSegment">
                    {comment_message?.map((item) => {
                      return (
                        <div className="PlayerViewDeals_CommentImgName ">
                          <div>
                            {item?.comments?.sent_by ==
                              item?.comments?.others?.id && (
                              <img
                                src={item?.comments?.others?.profile_pics}
                                className="useTable_ImageRecipient"
                              />
                            )}

                            {item?.comments?.sent_by ==
                              item?.comments?.player?.id && (
                              <img
                                src={item?.comments?.player?.profile_pics}
                                className="useTable_ImageRecipient"
                              />
                            )}

                            {item?.comments?.sent_by ==
                              item?.comments?.manager_id && (
                              <img
                                src={item?.comments?.manager?.profile_pics}
                                className="useTable_ImageRecipient"
                              />
                            )}
                          </div>

                          <div className="PlayerViewDeals_CommentNameandDetails">
                            {item?.comments?.sent_by ==
                              item?.comments?.others?.id && (
                              <p className="PlayerViewdetails_sendername">
                                {`${item?.comments?.others?.firstname} 
                            ${item?.comments?.others?.surname}`}
                                <span className="PlayerViewDeals_DateDetails">
                                  {calculateRelativeTime(
                                    item?.comments?.created_at
                                  )}
                                </span>
                              </p>
                            )}

                            {item?.comments?.sent_by ==
                              item?.comments?.player?.id && (
                              <p className="PlayerViewdetails_sendername">
                                {`${item?.comments?.player?.firstname} 
                            ${item?.comments?.player?.surname}`}
                                <span className="PlayerViewDeals_DateDetails">
                                  {calculateRelativeTime(
                                    item?.comments?.created_at
                                  )}
                                </span>
                              </p>
                            )}

                            {item?.comments?.sent_by ==
                              item?.comments?.manager_id && (
                              <p className="PlayerViewdetails_sendername">
                                {`${item?.comments?.manager?.firstname} 
                            ${item?.comments?.manager?.surname}`}
                                <span className="PlayerViewDeals_DateDetails">
                                  {calculateRelativeTime(
                                    item?.comments?.created_at
                                  )}
                                </span>
                              </p>
                            )}

                            <div>
                              {item?.comments?.sent_by ==
                                item?.comments?.others?.id && (
                                <p className="PlayerViewDeals_CommentDetails">
                                  {item?.comments?.comment}
                                </p>
                              )}

                              {item?.comments?.sent_by ==
                                item?.comments?.player?.id && (
                                <p className="PlayerViewDeals_CommentDetails">
                                  {item?.comments?.comment}
                                </p>
                              )}

                              {item?.comments?.sent_by ==
                                item?.comments?.manager_id && (
                                <p className="PlayerViewDeals_CommentDetails">
                                  {item?.comments?.comment}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

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

export default NegotiationDetails;
