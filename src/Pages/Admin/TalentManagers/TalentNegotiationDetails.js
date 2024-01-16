import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { BsPinAngleFill, BsShareFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

import imgRecipient from "../../../assets/imgRecipient.png";
import {
  Admin__Talent_Negotiations_comment_fun,
  Admin__Talentmanager__Negotiations_detail_fun,
  Admin___Negotiations_comment_fun,
  Admin___Negotiations_detail_fun,
} from "../../../Slice/Admin/Admin_NegotiationsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { CircularProgress, Skeleton } from "@mui/material";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function TalentNegotiationDetails() {
  const {
    Admin___Negotiations_detail,
    Admin___Negotiations_comment,
    Admin_TalentManager___Negotiations_detail,
  } = useSelector((state) => state.reducer.Admin_NegotiationsSlice);

  const { data } = useSelector((state) => state.reducer?.LoginSlice?.logindata);

  const dispatch = useDispatch();
  let { state } = useLocation();
  // const {each} = Offer_data.state

  let offer_id = state?.OfferId;

  let from_id =
    state?.comments?.active_offers?.from ||
    state?.from ||
    state?.User ||
    state?.UserId;

  useEffect(() => {
    dispatch(Admin__Talentmanager__Negotiations_detail_fun(offer_id));
    // dispatch(
    //   Admin__Talent_Negotiations_comment_fun({
    //     offer_id: state?.OfferId,
    //     player: state?.to,
    //     others: state?.from,
    //   })
    // );

    dispatch(Admin___Negotiations_comment_fun(offer_id));

    return () => {};
  }, [dispatch, offer_id]);

  let comment_message = Admin___Negotiations_comment?.data[1];
  let comment_messag = Admin___Negotiations_comment?.data[1];

  let negotiation_data = Admin_TalentManager___Negotiations_detail[0];

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

  const Download_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}admin/negotiations/offer/download/${offer_id}/${from_id}`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokengot}`,
        },
        responseType: "blob", // Set the response type to 'blob'
      };

      try {
        const response = await axios.get(API_URL, config);

        // Create a download link
        const downloadLink = document.createElement("a");
        const objectUrl = URL.createObjectURL(response.data);

        downloadLink.href = objectUrl;
        downloadLink.download = "file.pdf";
        downloadLink.click();

        URL.revokeObjectURL(objectUrl);

        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    {
      onSuccess: () => {
        // Success toast notification
        toast.success("Downloded successfully!", {
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
  const Suspend_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      let API_URL;
      // Use formData to send the image data to the API
      if (data === "unsuspend") {
        API_URL = `${baseURL}admin/negotiations/unsuspend-offer`;
      }

      if (data === "suspend") {
        API_URL = `${baseURL}admin/negotiations/suspend-offer`;
      }

      let item = {
        offer_id: offer_id,
      };

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

        return response;
      } catch (error) {
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

        return response;
      } catch (error) {
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

  const PIn_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API
      let item = {
        offer_id: offer_id,
      };

      let API_URL = `${baseURL}admin/negotiations/${data}`;

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
        return response;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        // dispatch(Talent_manager_Interaction_fun({ player, request, sender }));

        // Success toast notification

        dispatch(Admin___Negotiations_detail_fun({ offer_id, from_id }));
        dispatch(Admin___Negotiations_comment_fun(offer_id));
        toast.success(` successfully!`, {
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
        toast.error(`Error occurred .`, {
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

  const [admincomment, setAdmincomment] = useState("");

  const Commet_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      let API_URL = `${baseURL}admin/talent-manager/offer/comments`;

      const tokengot = localStorage.getItem("token");

      let item = {
        offer_id: Admin_TalentManager___Negotiations_detail[0]?.OfferId,
        player: Admin_TalentManager___Negotiations_detail[0]?.to,
        others: Admin_TalentManager___Negotiations_detail[0]?.from,
        comment: admincomment,
      };

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.post(API_URL, item, config);
        return response;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        dispatch(Admin___Negotiations_comment_fun(offer_id));

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
      onError: (error) => {
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

  const handleChange = (e) => {
    setAdmincomment(e.target.value);

    //   {
    //     "offer_id": 22,
    //     "player": 21,
    //     "others": 22,
    //     "comment": "3 man talks"
    // }
  };

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard ">
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
                      Deal
                    </Link>
                    <GrFormNext style={{ fontSize: "16px" }} />
                    <p className="ScoutViewProfile_navigationprofile">
                      Details
                    </p>
                  </div>

                  <>
                    {negotiation_data?.payment_status === "not paid" && (
                      <div className="flex gap-2">
                        {negotiation_data?.status === "suspended" ? (
                          <button
                            className="bg-[#FEFDF2] border-[#7F351D] px-3 py-1 border rounded"
                            onClick={() => Suspend_Mutation.mutate("unsuspend")}
                          >
                            {Suspend_Mutation?.isLoading ? (
                              <PulseLoader
                                color="black"
                                size={13}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              "Unsuspend "
                            )}
                          </button>
                        ) : (
                          <button
                            className="bg-[#FEFDF2] border-[#7F351D] px-3 py-1 border rounded"
                            onClick={() => Suspend_Mutation.mutate("suspend")}
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
                        )}

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
                    )}
                  </>
                </div>
                <div className="PlayerViewDeals_InfoSection">
                  <div className="PlayerViewDeals_InfoSection_UpperSegment">
                    <div className="PlayerViewdetails_TopicSec">
                      <p className="PlayerViewdetails_DetailsText">
                        Details{" "}
                        {negotiation_data?.payment_status === "paid"
                          ? " (Paid)"
                          : " (Not Paid) "}
                      </p>
                      <div className="PlayerViewdetails_DownloadButtons">
                        <button
                          className="PlayerViewdetails_DownloadPdf flex items-center"
                          onClick={() => Download_Mutation.mutate()}
                        >
                          {Download_Mutation?.isLoading ? (
                            <PulseLoader
                              color="black"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <>
                              {" "}
                              <FaDownload
                                style={{ color: "#3D413D", marginRight: "7px" }}
                              />{" "}
                              <span> Downloads</span>
                            </>
                          )}
                        </button>

                        {negotiation_data?.display == 1 ? (
                          <button
                            className="flex gap-2 bg-[#DBDBDB] px-3 py-1 rounded items-center"
                            onClick={() => PIn_Mutation.mutate("unpin-offer")}
                          >
                            <BsPinAngleFill />

                            <span> UnPin </span>
                            <span> </span>
                          </button>
                        ) : (
                          <button
                            className="flex gap-2 bg-[#DBDBDB] px-3 py-1 rounded items-center"
                            onClick={() => PIn_Mutation.mutate("pin-offer")}
                          >
                            <BsPinAngleFill />

                            <span> Pin </span>
                            <span> </span>
                          </button>
                        )}
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
                          alt=""
                        />
                        <span className="PlayerViewdetails_sendername">
                          {`${negotiation_data?.firstname} -
                              ${negotiation_data?.surname}`}
                        </span>
                      </p>
                    </div>

                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Amount:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        ${negotiation_data?.currentOffer}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Name:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
                        {" "}
                        {negotiation_data?.DealName}
                      </p>
                    </div>
                    <div className="PlayerViewdetails_LabelAndAnswer">
                      <label className="PlayerViewdetails_LabelText">
                        Negotiate Status:
                      </label>
                      <p className="PlayerViewdetails_labelresponse">
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
                    <ChatApp comment_message={comment_message} />

                    <div className="PlayerViewDeals_CommentSectionDiv">
                      <div className="PlayerViewDeals_CommentSectionInnerDiv">
                        <textarea
                          placeholder="Make a comment"
                          style={{ flex: 1, border: "none", minHeight: "50px" }}
                          value={admincomment}
                          onChange={handleChange}
                        />

                        {Commet_Mutation?.isLoading ? (
                          <button className="PlayerViewDeals_CommentButton">
                            <CircularProgress size={15} />
                          </button>
                        ) : (
                          <button
                            className="PlayerViewDeals_CommentButton"
                            onClick={() => Commet_Mutation.mutate()}
                          >
                            Comment
                          </button>
                        )}
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

export default TalentNegotiationDetails;

const ChatComponent = ({ messages, data_comment }) => {
  const { data } = useSelector((state) => state.reducer?.LoginSlice?.logindata);
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

  return (
    <div className="max-w-md mx-auto">
      {data_comment.map((message, index) => (
        <>
          <div
            key={index}
            className={`${
              Number(message?.comments?.sent_by) !==
                Number(message?.comments?.others?.id) &&
              Number(message?.comments?.sent_by) !==
                Number(message?.comments?.player?.id) &&
              Number(message?.comments?.sent_by) !==
                Number(message?.comments?.manager_id)
                ? "bg-gray-300 text-black ml-auto"
                : "bg-green-500 text-white mr-auto"
            } p-4 my-2 rounded-md max-w-xs`}
          >
            <div className="flex">
              <div>
                {Number(message?.comments?.sent_by) !==
                  Number(message?.comments?.others?.id) &&
                Number(message?.comments?.sent_by) !==
                  Number(message?.comments?.player?.id) &&
                Number(message?.comments?.sent_by) !==
                  Number(message?.comments?.manager_id) ? (
                  <img
                    src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
                    className="useTable_ImageRecipient"
                    alt=""
                  />
                ) : (
                  <>
                    {Number(message?.comments?.sent_by) ===
                      Number(message?.comments?.others?.id) && (
                      <>
                        <img
                          src={message?.comments?.others?.profile_pics}
                          className="useTable_ImageRecipient"
                          alt=""
                        />
                      </>
                    )}

                    {Number(message?.comments?.sent_by) ===
                      Number(message?.comments?.player?.id) && (
                      <>
                        <img
                          src={message?.comments?.player?.profile_pics}
                          className="useTable_ImageRecipient"
                          alt=""
                        />
                      </>
                    )}

                    {Number(message?.comments?.sent_by) ===
                      Number(message?.comments?.manager?.id) && (
                      <>
                        <img
                          src={message?.comments?.manager?.profile_pics}
                          className="useTable_ImageRecipient"
                          alt=""
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <div>
                {Number(message?.comments?.sent_by) !==
                  Number(message?.comments?.others?.id) &&
                Number(message?.comments?.sent_by) !==
                  Number(message?.comments?.player?.id) &&
                Number(message?.comments?.sent_by) !==
                  Number(message?.comments?.manager_id) ? (
                  <div>
                    <p>
                      {data?.user_type}

                      <span className="PlayerViewDeals_DateDetails">
                        {calculateRelativeTime(message?.comments?.created_at)}
                      </span>
                    </p>
                    {message?.comments?.comment}
                  </div>
                ) : (
                  <>
                    <div className="PlayerViewDeals_CommentNameandDetails">
                      {Number(message?.comments?.sent_by) ===
                        Number(message?.comments?.others?.id) && (
                        <p className="PlayerViewdetails_sendername">
                          {`${message?.comments?.others?.firstname}
                            ${message?.comments?.others?.surname}`}
                          <span className="PlayerViewDeals_DateDetails">
                            {calculateRelativeTime(
                              message?.comments?.created_at
                            )}
                            :<>Scout</>
                          </span>
                        </p>
                      )}

                      {Number(message?.comments?.sent_by) ===
                        Number(message?.comments?.player?.id) && (
                        <p className="PlayerViewdetails_sendername">
                          {`${message?.comments?.player?.firstname}
                            ${message?.comments?.player?.surname}`}
                          <span className="PlayerViewDeals_DateDetails">
                            {calculateRelativeTime(
                              message?.comments?.created_at
                            )}{" "}
                            :<>Player </>
                          </span>
                        </p>
                      )}

                      {Number(message?.comments?.sent_by) ===
                        Number(message?.comments?.manager?.id) && (
                        <p className="PlayerViewdetails_sendername">
                          {`${message?.comments?.manager?.firstname}
                            ${message?.comments?.manager?.surname}`}
                          <span className="PlayerViewDeals_DateDetails">
                            {calculateRelativeTime(
                              message?.comments?.created_at
                            )}
                            :<>Talent Manger</>
                          </span>
                        </p>
                      )}

                      <div>
                        {Number(message?.comments?.sent_by) ===
                          Number(message?.comments?.others?.id) && (
                          <p className="PlayerViewDeals_CommentDetails">
                            {message?.comments?.comment}
                          </p>
                        )}

                        {Number(message?.comments?.sent_by) ===
                          Number(message?.comments?.player?.id) && (
                          <p className="PlayerViewDeals_CommentDetails">
                            {message?.comments?.comment}
                          </p>
                        )}

                        {Number(message?.comments?.sent_by) ===
                          Number(message?.comments?.manager_id) && (
                          <p className="PlayerViewDeals_CommentDetails">
                            {message?.comments?.comment}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* <div>{message?.comments?.comment}</div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

const ChatApp = ({ comment_message }) => {
  const messages = [
    { text: "Hello!", sender: "user" },
    { text: "Hi there!", sender: "admin" },
    { text: "How can I help you?", sender: "admin" },
    // Add more messages as needed
  ];

  return (
    <div>
      <h1 className=" t text-center">Chat Conversation</h1>
      <ChatComponent messages={messages} data_comment={comment_message} />
    </div>
  );
};
