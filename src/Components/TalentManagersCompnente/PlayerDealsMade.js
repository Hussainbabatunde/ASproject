import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { FaDownload } from "react-icons/fa";
import imgRecipient from "../../assets/imgRecipient.png";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { CircularProgress, Skeleton } from "@mui/material";
import moment from "moment";
import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import {
  Talent_manager_Interaction_fun,
  Talent_manager_deal_details_fun,
  reset_Talent_manager_Deals,
} from "../../Slice/Talent_Manager/Talent_manager_slice";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const MyComponent = ({ player }) => {
  let player_id = player?.id;

  const {
    Talent_manager_deal_details,
    Talent_manager_Deals_isLoading,
    Talent_manager_Interaction,
    Talent_manager_Interaction_isLoading,
    Talent_manager_details,
  } = useSelector((state) => state?.reducer?.Talent_manager_slice);

  let managerId = Talent_manager_details?.data?.id;

  const [filteredData, setFilteredData] = useState([]);

  const exampleDate = "2021-06-09T11:42:26.000000Z";

  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="">
      {Talent_manager_Interaction?.map((comment, index) => {
        return (
          <div key={index} className="">
            {managerId == comment?.comments?.sent_by ? (
              <div className=" flex justify-end  mb-5">
                <div className="flex gap-1   w-[50%]">
                  <div>
                    <img
                      src={Talent_manager_details?.data?.profile_pics}
                      className="useTable_ImageRecipient"
                    />
                  </div>
                  <div>
                    <div className="flex gap-1">
                      <p className="PlayerViewdetails_sendername">
                        <span>{Talent_manager_details?.data?.firstname}</span>
                        <span>{Talent_manager_details?.data?.surname}</span>
                      </p>

                      <div>
                        <p>{formatDate(comment?.comments?.created_at)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="break-words max-w-sm">
                        {comment?.comments?.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {player_id == comment?.comments?.sent_by ? (
                  <div className=" flex justify-start mb-5  ">
                    <div className="flex gap-1   w-[50%]">
                      <div>
                        <img
                          src={player?.profile_pics}
                          className="useTable_ImageRecipient"
                        />
                      </div>
                      <div>
                        <div className="flex gap-1">
                          <p className="PlayerViewdetails_sendername">
                            <span>{player?.firstname}</span>
                            <span>{player?.surname}</span>
                          </p>

                          <div>
                            <p>{formatDate(comment?.comments?.created_at)}</p>
                          </div>
                        </div>

                        <div>
                          <p className="break-words max-w-sm">
                            {comment?.comments?.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" flex justify-start  mb-5 ">
                    <div className="flex gap-1   ">
                      <div>
                        <img
                          src={comment?.comments?.others?.profile_pics}
                          className="useTable_ImageRecipient"
                        />
                      </div>
                      <div>
                        <div className="flex gap-1">
                          <p className="PlayerViewdetails_sendername">
                            <span>{comment?.comments?.others?.firstname}</span>
                            <span>{comment?.comments?.others?.surname}</span>
                          </p>

                          <div>
                            <p>{formatDate(comment?.comments?.created_at)}</p>
                          </div>
                        </div>

                        <div>
                          <p className="break-words max-w-sm">
                            <span>{comment?.comments?.comment}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const PlayerDealsMade = () => {
  const { state } = useLocation();
  let player = state?.data?.player;
  let request = state?.data?.request;
  let sender = state?.data?.sender;

  console.log(request);

  const {
    Talent_manager_deal_details,
    Talent_manager_Deals_isLoading,
    Talent_manager_Interaction,
    Talent_manager_Interaction_isLoading,
  } = useSelector((state) => state?.reducer?.Talent_manager_slice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Talent_manager_deal_details_fun(request));

    return () => {
      dispatch(reset_Talent_manager_Deals());
    };
  }, []);

  useEffect(() => {
    dispatch(Talent_manager_Interaction_fun({ player, request, sender }));

    return () => {};
  }, []);

  let info = Talent_manager_deal_details?.data?.offers;

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();

    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const endDay = endDate.getDate();

    const yearDiff = endYear - startYear;
    const monthDiff = endMonth - startMonth;
    const dayDiff = endDay - startDay;

    const totalMonths = yearDiff * 12 + monthDiff;
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    return `${totalMonths} months, ${totalDays} days`;
  };

  console.log(Talent_manager_Interaction);
  console.log(Talent_manager_Interaction);

  const duration = calculateDuration(info?.to_start, info?.to_end);

  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );
  const userType = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user_type
  );
  const [downloadPage, setDownloadPage] = useState(false);
  const [comment, setComment] = useState("");
  const [commentload, setCommentLoad] = useState(false);
  const [senderload, setSenderLoad] = useState(false);
  // console.log('id ', id)
  // console.log('user id', userId)

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const Download_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      console.log(request);
      let id = request?.id;
      let from_person = request?.from;

      let API_URL = `${baseURL}talent-manager/offer/download/${id}/${from_person}`;

      const tokengot = localStorage.getItem("token");

      console.log(API_URL);

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
        console.error(error);
        throw new Error(error.message);
      }
    },
    {
      onSuccess: () => {
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

  const Comment_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/offer/comments`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.post(API_URL, data, config);
        console.log(response.data); // Logging the response data

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        dispatch(Talent_manager_Interaction_fun({ player, request, sender }));

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

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const sentData = {};

    sentData.offer_id = request?.id;
    sentData.others = sender?.id;
    sentData.player = player?.id;
    sentData.comment = comment;

    Comment_Mutation.mutate(sentData);
  };

  const Download_pdf = async () => {
    try {
      let API_URL = `${baseURL}talent-manager/offer/download/31/60`;

      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokengot}`,
        },
        responseType: "blob", // Set the response type to 'blob'
      };

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
      console.error(error);
      throw new Error(error.message);
    }
  };

  return (
    <div className="PlayersViewDeals_Container">
      <div className="PlayersDealsMade_Page">
        <div className="ScoutViewProfile_navigationprogress">
          <Link
            to="/afrisport/talent-manager/deal"
            className="ScoutViewProfile_navigationback"
          >
            Deals
          </Link>
          <GrFormNext style={{ fontSize: "16px" }} />
          <p className="ScoutViewProfile_navigationprofile">Details</p>
        </div>
        <div className="PlayerViewDeals_InfoSection">
          <div className="PlayerViewDeals_InfoSection_UpperSegment">
            <div className="PlayerViewdetails_TopicSec">
              <p className="PlayerViewdetails_DetailsText">
                Details
                {info?.payment_status === "paid" ? "(Paid)" : "(Not Paid)"}
              </p>
              <div className="PlayerViewdetails_DownloadButtons">
                <button
                  className="PlayerViewdetails_DownloadPdf"
                  onClick={() => Download_Mutation.mutate()}
                  // onClick={Download_pdf}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaDownload
                    style={{ color: "#3D413D", marginRight: "7px" }}
                  />
                  {Download_Mutation?.isLoading ? (
                    <PulseLoader
                      color="black"
                      size={13}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <span>Download</span>
                  )}
                </button>
              </div>
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Sent By:</label>
              <p className="PlayerViewdetails_labelresponse">
                {senderload ? (
                  <Skeleton variant="circular" width={35} height={32} />
                ) : (
                  <img
                    src={sender?.profile_pics}
                    className="useTable_ImageRecipient"
                  />
                )}
                {Talent_manager_Deals_isLoading ? (
                  <Skeleton variant="rounded" width={105} height={22} />
                ) : (
                  <span className="PlayerViewdetails_sendername">
                    {" "}
                    {sender?.firstname} {sender?.surname}
                  </span>
                )}
              </p>
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Duration:</label>
              {Talent_manager_Deals_isLoading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse"> {duration}</p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Expiring:</label>
              {Talent_manager_Deals_isLoading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">
                  {info?.to_end}
                </p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Amount:</label>
              {Talent_manager_Deals_isLoading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">
                  $ {info?.value}{" "}
                </p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">
                Negotiate Name:
              </label>
              {Talent_manager_Deals_isLoading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">{info?.name}</p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">
                Negotiate Status:
              </label>
              <p className="PlayerViewdetails_labelresponse">
                {Talent_manager_Deals_isLoading ? (
                  <Skeleton variant="rounded" width={105} height={22} />
                ) : (
                  <span className="PlayerViewdetails_response_styling">
                    {info?.status}
                  </span>
                )}
              </p>
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">
                Negotiate Description:
              </label>
              {Talent_manager_Deals_isLoading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">
                  {info?.detail}
                </p>
              )}
            </div>
          </div>
          <div className="PlayerViewDeals_InfoSection_LowerSegment">
            {/* {CommentsGotten?.data.map((each, index) => (
              <div key={index} className="PlayerViewDeals_CommentImgName">
                {Talent_manager_Deals_isLoading ? (
                  <Skeleton variant="circular" width={35} height={32} />
                ) : (
                  <img
                    src={
                      each?.comments?.sent_by == each?.comments?.player?.id
                        ? each?.comments?.player?.profile_pics
                        : each?.comments?.others?.profile_pics
                    }
                    className="useTable_ImageRecipient"
                  />
                )}
                <div className="PlayerViewDeals_CommentNameandDetails">
                  {Talent_manager_Deals_isLoading ? (
                    <Skeleton variant="rounded" width={105} height={22} />
                  ) : (
                    <p className="PlayerViewdetails_sendername">
                      {each?.comments?.sent_by == each?.comments?.player?.id
                        ? each?.comments?.player?.firstname
                        : each?.comments?.others?.firstname}{" "}
                      {each?.comments?.sent_by == each?.comments?.player?.id
                        ? each?.comments?.player?.surname
                        : each?.comments?.others?.surname}
                      <span className="PlayerViewDeals_DateDetails">
                        {" "}
                        {moment(each?.comments?.created_at).format(
                          "DD-MM-YYYY hh:mma"
                        )}{" "}
                      </span>
                    </p>
                  )}
                  {Talent_manager_Deals_isLoading ? (
                    <Skeleton variant="rounded" width={105} height={22} />
                  ) : (
                    <p className="PlayerViewDeals_CommentDetails">
                      {" "}
                      {each?.comments?.comment}{" "}
                    </p>
                  )}
                </div>
              </div>
            ))} */}

            <MyComponent player={player} />

            <div className="PlayerViewDeals_CommentSectionDiv">
              <form
                onSubmit={handleSubmitComment}
                className="PlayerViewDeals_CommentSectionInnerDiv"
              >
                <textarea
                  onChange={handleComment}
                  value={comment}
                  placeholder="Make a comment"
                  style={{ flex: 1, border: "none", minHeight: "50px" }}
                />
                <button type="submit" className="PlayerViewDeals_CommentButton">
                  {commentload ? (
                    <CircularProgress size={15} />
                  ) : (
                    <span>Comment</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDealsMade;
