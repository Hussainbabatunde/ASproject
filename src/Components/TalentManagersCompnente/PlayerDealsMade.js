import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { FaDownload } from "react-icons/fa";
import imgRecipient from "../../assets/imgRecipient.png";
import { useDispatch, useSelector } from "react-redux";
import {
  DealCommentsApi,
  GetPlayerOfferDetailsApi,
  GetPlayerOfferDownloadApi,
  MakeCommentApi,
  PlayerDealsDetailsApi,
} from "../../Slice/Player/PlayerDeal/PlayerDealSlice";
import { PulseLoader } from "react-spinners";
import { CircularProgress, Skeleton } from "@mui/material";
import moment from "moment";
import {
  Talent_manager_deal_details_fun,
  reset_Talent_manager_Deals,
} from "../../Slice/Talent_Manager/Talent_manager_slice";

const PlayerDealsMade = () => {
  const { state } = useLocation();

  const { Talent_manager_deal_details } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Talent_manager_deal_details_fun(state));

    return () => {
      dispatch(reset_Talent_manager_Deals());
    };
  }, []);

  let info = Talent_manager_deal_details?.data?.offers;

  console.log(info);

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

  const duration = calculateDuration(info?.to_start, info?.to_end);

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
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

  const gottenDetails = useSelector(
    (state) => state.reducer?.GetAllPlayerDealSlice?.getOfferDetailsData
  );
  const senderId = useSelector(
    (state) =>
      state.reducer?.GetAllPlayerDealSlice?.getOfferDetailsData?.data?.offers
        ?.from
  );
  console.log("gotten deatils ", gottenDetails);
  const expireData = gottenDetails?.data?.offers?.expiration.slice(0, 11);
  const senderInfo = useSelector(
    (state) => state.reducer?.GetAllPlayerDealSlice?.detailsDealData?.data
  );
  const CommentsGotten = useSelector(
    (state) => state.reducer?.GetAllPlayerDealSlice?.commentsOfferData
  );

  useEffect(() => {
    const offerDetails = async () => {
      setLoading(true);
      await dispatch(GetPlayerOfferDetailsApi({ id, userId }));
      setLoading(false);
    };
    offerDetails();
  }, []);

  useEffect(() => {
    const fetchSender = async () => {
      setSenderLoad(true);
      await dispatch(PlayerDealsDetailsApi(senderId));
      setSenderLoad(false);
    };
    fetchSender();
  }, [senderId]);

  useEffect(() => {
    const offerDetails = async () => {
      setLoading(true);
      await dispatch(DealCommentsApi({ id, userId, senderId }));
      setLoading(false);
    };
    offerDetails();
  }, [senderId]);

  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const handleDownload = async () => {
    setDownloadPage(true);
    await dispatch(GetPlayerOfferDownloadApi(id, userId));
    setDownloadPage(false);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const sentData = {};
    sentData.comment = comment;
    sentData.others = gottenDetails?.data?.offers?.from;
    sentData.player = userId;
    sentData.offer_id = gottenDetails?.data?.offers?.id;
    setCommentLoad(true);
    await dispatch(MakeCommentApi(sentData));
    await dispatch(DealCommentsApi({ id, userId, senderId }));
    setComment("");
    setCommentLoad(false);
    // console.log('comment ', comment)
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
                Details (Not Paid)
              </p>
              <div className="PlayerViewdetails_DownloadButtons">
                <button
                  className="PlayerViewdetails_DownloadPdf"
                  onClick={handleDownload}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaDownload
                    style={{ color: "#3D413D", marginRight: "7px" }}
                  />
                  {downloadPage ? (
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
                    src={senderInfo?.profile_pics}
                    className="useTable_ImageRecipient"
                  />
                )}
                {senderload ? (
                  <Skeleton variant="rounded" width={105} height={22} />
                ) : (
                  <span className="PlayerViewdetails_sendername">
                    {" "}
                    {senderInfo?.firstname} {senderInfo?.surname}
                  </span>
                )}
              </p>
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Duration:</label>
              {loading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse"> {duration}</p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Expiring:</label>
              {loading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">{expireData}</p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">Amount:</label>
              {loading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">
                  {" "}
                  ${gottenDetails?.data?.offers?.recipient_earnings}
                </p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">
                Negotiate Name:
              </label>
              {loading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">
                  {gottenDetails?.data?.offers?.name}
                </p>
              )}
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">
                Negotiate Status:
              </label>
              <p className="PlayerViewdetails_labelresponse">
                {loading ? (
                  <Skeleton variant="rounded" width={105} height={22} />
                ) : (
                  <span className="PlayerViewdetails_response_styling">
                    {gottenDetails?.data?.offers?.status}
                  </span>
                )}
              </p>
            </div>
            <div className="PlayerViewdetails_LabelAndAnswer">
              <label className="PlayerViewdetails_LabelText">
                Negotiate Description:
              </label>
              {loading ? (
                <Skeleton variant="rounded" width={105} height={22} />
              ) : (
                <p className="PlayerViewdetails_labelresponse">
                  {gottenDetails?.data?.offers?.detail}
                </p>
              )}
            </div>
          </div>
          <div className="PlayerViewDeals_InfoSection_LowerSegment">
            {CommentsGotten?.data.map((each, index) => (
              <div key={index} className="PlayerViewDeals_CommentImgName">
                {loading ? (
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
                  {loading ? (
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
                  {loading ? (
                    <Skeleton variant="rounded" width={105} height={22} />
                  ) : (
                    <p className="PlayerViewDeals_CommentDetails">
                      {" "}
                      {each?.comments?.comment}{" "}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {/* <div className='PlayerViewDeals_CommentImgName'>
                  <img src={imgRecipient}  className='useTable_ImageRecipient' />
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                    <p className='PlayerViewdetails_sendername'>Ms Lucas Howe <span className='PlayerViewDeals_DateDetails'>3 days ago</span></p>
                    <p className='PlayerViewDeals_CommentDetails'> Hi, i am the talent manager for the player.</p>
                  </div>
                  </div> */}
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
