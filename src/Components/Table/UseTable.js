import React, { useState } from "react";
import "./UseTable.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPlayerOfferDetailsApi,
  PlayerAcceptOfferDetailsApi,
  PlayerDealsApi,
  PlayerDeleteOfferDetailsApi,
} from "../../Slice/Player/PlayerDeal/PlayerDealSlice";
import { CircularProgress } from "@mui/material";
import { PulseLoader } from "react-spinners";
import {
  PlayerAcceptRequestDetailsApi,
  PlayerDeleteRequestDetailsApi,
  PlayerFanDealsApi,
} from "../../Slice/Player/PlayerDeal/PlayerFanDealSlice";

const UseTable = ({
  header,
  data,
  handleShowEdit,
  handleDelete,
  handleEdit,
}) => {
  const [acceptIndex, setAcceptIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteRequestIndex, setDeleteRequestIndex] = useState(null);
  const [acceptRequestIndex, setAcceptRequestIndex] = useState(null);
  const sentData = {};
  const dispatch = useDispatch();
  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );
  const handleAcceptOffer = async (id) => {
    setAcceptIndex(id);
    sentData.offer_id = id;
    sentData.user_id = userId;
    await dispatch(PlayerAcceptOfferDetailsApi(sentData));
    await dispatch(PlayerDealsApi());
    setAcceptIndex(null);
  };

  const handleAcceptRequest = async (id) => {
    setAcceptRequestIndex(id);
    sentData.request_id = id;
    sentData.player_id = userId;
    await dispatch(PlayerAcceptRequestDetailsApi(sentData));
    await dispatch(PlayerFanDealsApi());
    setAcceptRequestIndex(null);
  };

  const handleDeleteOffer = async (id) => {
    setDeleteIndex(id);
    sentData.request_id = id;
    sentData.player_id = userId;
    await dispatch(PlayerDeleteOfferDetailsApi(sentData));
    await dispatch(PlayerDealsApi());
    setDeleteIndex(null);
  };

  const handleDeleteRequest = async (id) => {
    setDeleteRequestIndex(id);
    sentData.request_id = id;
    sentData.player_id = userId;
    await dispatch(PlayerDeleteRequestDetailsApi(sentData));
    await dispatch(PlayerFanDealsApi());
    setDeleteRequestIndex(null);
  };

  return (
    <table className="AdminUserTable">
      <thead>
        <tr>
          {header?.map((item, index) => (
            <th
              key={index}
              colSpan={item?.name == "Actions" && 2}
              className="UseTable_tableheader"
            >
              {item?.name == "AcceptDeclineOffer" ||
              item?.name == "FanAcceptDeclineOffer"
                ? "Actions"
                : item?.name}
            </th>
          ))}
          {/* <th className="UseTable_tableheader">First Name</th>
          <th className="UseTable_tableheader">Last Name</th>
          <th className="UseTable_tableheader">Username</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((each, index) => {
          return (
            <tr key={index}>
              {header?.map((item) => {
                switch (item?.case) {
                  case "Talent_AcceptDeclineOffer":
                    return (
                      <td className="useTable_ViewEditSuspendDetails">
                        <div className="flex">
                          {each?.requests?.request?.status === "pending" && (
                            <>
                              <button className="AcceptedPlayerUseTable">
                                Accepted
                              </button>
                              <button className="RejectedPlayerUseTable">
                                Rejected
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    );

                  case "Talent_deal_Details":
                    return (
                      <td className="useTable_tableDetails">
                        <Link
                          to={`/afrisport/talent-manager/deal_detail`}
                          style={{ color: "white" }}
                          className="useTable_tableDetailsLink"
                          state={{ data: each?.requests?.request }}
                        >
                          Details
                        </Link>
                      </td>
                    );

                  case "talent_players_name":
                    return (
                      <td className="useTable_tableDetails">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={each?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.firstname}
                          {each?.surname}
                        </div>
                      </td>
                    );
                  case "talent_player_Position":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.position}
                      </td>
                    );

                  case "talent_player_Club":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.current_club}
                      </td>
                    );

                  case "talent_player_status":
                    return (
                      <td className="useTable_tableDetails">{each?.status}</td>
                    );

                  case "talent_player_Add":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <span
                          className="Admin_playersviewprofile cursor-pointer"
                          onClick={() => handleEdit(each)}
                        >
                          Add
                        </span>
                      </td>
                    );

                  case "Admin_fan_Suspend_message_view":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          state={{
                            each,
                          }}
                          to={`/afrisport/talent-manager/player`}
                          className="Admin_playersEditprofile cursor-pointer"
                        >
                          View
                        </Link>

                        <Link
                          to="/afrisport/talent-manager/edit-player"
                          state={{
                            each,
                          }}
                          className="Admin_playersviewprofile cursor-pointer"
                        >
                          Edit
                        </Link>

                        <span
                          onClick={() => handleDelete(each)}
                          className="border border-solid border-[#7F351D] px-5 py-2 bg-white text-[#7F351D] font-bold rounded-md mr-4"
                        >
                          Remove
                        </span>
                      </td>
                    );

                  case "talent_player_Negotiate":
                    return <td className="useTable_tableDetails">NONE</td>;
                }

                switch (item?.name) {
                  case "Deal name":
                    console.log(each);
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.DealName ||
                          each?.request?.requests?.RequestName ||
                          each?.request?.deal?.fanRequest ||
                          each?.requests?.request?.name}
                      </td>
                    );
                  case "Recipient":
                    return (
                      <td className="useTable_tableDetails">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={
                              each?.offer?.player?.profile_pics ||
                              each?.request?.player?.profile_pics
                            }
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.offer?.player?.firstname ||
                            each?.request?.player?.firstname}{" "}
                          {each?.offer?.player?.surname ||
                            each?.request?.player?.surname}
                        </div>
                      </td>
                    );
                  case "Sender":
                    return (
                      <td className="useTable_tableDetails">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={
                              each?.offer?.sender?.profile_pics ||
                              each?.request?.requests?.profile_pics ||
                              each?.requests?.sender?.profile_pics
                            }
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.offer?.sender?.firstname ||
                            each?.request?.requests?.firstname ||
                            each?.requests?.sender?.firstname}{" "}
                          {each?.offer?.sender?.surname ||
                            each?.request?.requests?.surname ||
                            each?.requests?.sender?.surname}
                        </div>
                      </td>
                    );
                  case "Details":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.about ||
                          each?.offer?.deal?.detail ||
                          each?.request?.requests?.detail ||
                          each?.request?.deal?.detail ||
                          each?.detail ||
                          each?.requests?.request?.detail}
                      </td>
                    );
                  case "Amount":
                    return (
                      <td className="useTable_tableDetails">
                        ${" "}
                        {each?.offer?.deal?.value ||
                          each?.request?.requests?.recipient_earnings ||
                          each?.request?.deal?.value}
                      </td>
                    );
                  case "Request Type":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.request?.requests?.type}
                      </td>
                    );
                  case "Payment":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.surname}
                      </td>
                    );
                  case "Status":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.offerStatus ||
                          each?.offer?.deal?.status ||
                          each?.request?.requests?.status ||
                          each?.request?.deal?.requestStatus ||
                          each?.status ||
                          each?.requests?.request?.status}
                      </td>
                    );

                  case "AcceptDeclineOffer":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "200px" }}
                      >
                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.offer?.deal?.offerStatus == "accepted" ? (
                          <button className="AcceptedPlayerUseTable">
                            Accepted
                          </button>
                        ) : each?.offer?.deal?.offerStatus == "rejected" ? (
                          <button className="RejectedPlayerUseTable">
                            Rejected
                          </button>
                        ) : (
                          <>
                            <button
                              className="Admin_playersviewprofile"
                              onClick={() =>
                                handleAcceptOffer(each?.offer?.deal?.offerId)
                              }
                            >
                              {acceptIndex == each?.offer?.deal?.offerId ? (
                                <PulseLoader
                                  color="#1D7F33"
                                  size={13}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : (
                                <span>Accept</span>
                              )}
                            </button>
                            ) : each?.offer?.deal?.offerStatus == "rejected" ? (
                            <button className="RejectedPlayerUseTable">
                              Rejected
                            </button>
                          </>
                        )}
                      </td>
                    );
                  case "FanAcceptDeclineOffer":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "200px" }}
                      >
                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.request?.requests?.status == "accepted" ? (
                          <button className="AcceptedPlayerUseTable">
                            Accepted
                          </button>
                        ) : each?.request?.requests?.status == "rejected" ? (
                          <button className="RejectedPlayerUseTable">
                            Rejected
                          </button>
                        ) : (
                          <>
                            <button
                              className="Admin_playersviewprofile"
                              onClick={() =>
                                handleAcceptRequest(
                                  each?.request?.requests?.requestId
                                )
                              }
                            >
                              {acceptRequestIndex ==
                              each?.request?.requests?.requestId ? (
                                <PulseLoader
                                  color="#1D7F33"
                                  size={13}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : (
                                <span>Accept</span>
                              )}
                            </button>
                            <button
                              className="Admin_playersSuspendprofile"
                              onClick={() =>
                                handleDeleteRequest(
                                  each?.request?.requests?.requestId
                                )
                              }
                            >
                              {deleteRequestIndex ==
                              each?.request?.requests?.requestId ? (
                                <PulseLoader
                                  color="#7F351D"
                                  size={13}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : (
                                <span>Decline</span>
                              )}
                            </button>
                          </>
                        )}
                      </td>
                    );
                  case "":
                    return (
                      <>
                        <td className="useTable_tableDetails">
                          <Link
                            to={`/afrisport/player/dealsmade/${each?.offer?.deal?.offerId}`}
                            style={{ color: "white" }}
                            className="useTable_tableDetailsLink"
                          >
                            Details
                          </Link>
                        </td>
                      </>
                    );
                  case "Scout Deals":
                    return (
                      <>
                        <td className="useTable_tableDetails">
                          <Link
                            to={`/afrisport/scout/dealsmade/${each?.offer?.deal?.offerId}`}
                            style={{ color: "white" }}
                            className="useTable_tableDetailsLink"
                          >
                            Details
                          </Link>
                        </td>
                      </>
                    );
                  case "Fan Deals":
                    return (
                      <>
                        <td className="useTable_tableDetails">
                          <Link
                            to={`/afrisport/fan/dealsmade/${each?.request?.deal?.requestId}`}
                            state={{ each }}
                            style={{ color: "white" }}
                            className="useTable_tableDetailsLink"
                          >
                            Details
                          </Link>
                        </td>
                      </>
                    );
                  case "Fan Deal Detail":
                    return (
                      <>
                        <td className="useTable_tableDetails">
                          <Link
                            to={`/afrisport/player/fandealsmade/${each?.request?.requests?.requestId}`}
                            state={{ each }}
                            style={{ color: "white" }}
                            className="useTable_tableDetailsLink"
                          >
                            Details
                          </Link>
                        </td>
                      </>
                    );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UseTable;
