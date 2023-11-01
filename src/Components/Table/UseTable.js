import React, { useState } from "react";
import "./UseTable.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
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
import {
  PlayerAcceptManagerDetailsApi,
  PlayerDeleteManagerDetailsApi,
  PlayerManagerDealsApi,
} from "../../Slice/Player/PlayerManager/PlayerManagerSlice";

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
  const [deleteManagerRequestIndex, setDeleteManagerRequestIndex] =
    useState(null);
  const [acceptManagerRequestIndex, setAcceptManagerRequestIndex] =
    useState(null);
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

  const handleManagerAcceptRequest = async (id, index) => {
    setAcceptManagerRequestIndex(index);
    sentData.manager_id = id;
    sentData.player_id = userId;
    await dispatch(PlayerAcceptManagerDetailsApi(sentData));
    await dispatch(PlayerManagerDealsApi());
    setAcceptManagerRequestIndex(null);
  };

  const handleDeleteOffer = async (id) => {
    setDeleteIndex(id);
    sentData.offer_id = id;
    sentData.user_id = userId;
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

  const handleManagerDeleteRequest = async (id, index) => {
    setDeleteManagerRequestIndex(index);
    sentData.manager_id = id;
    sentData.player_id = userId;
    await dispatch(PlayerDeleteManagerDetailsApi(sentData));
    await dispatch(PlayerManagerDealsApi());
    setDeleteManagerRequestIndex(null);
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
              item?.name == "FanAcceptDeclineOffer" ||
              item?.name == "ManagerAcceptDeclineOffer"
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
                  case "talent_DealStatus":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.request?.status}
                      </td>
                    );
                  case "talent_DealPayment":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.request?.payment_status}
                      </td>
                    );
                  case "talent_DealAmount":
                    return (
                      <td className="useTable_tableDetails">
                        ${each?.requests?.request?.value}
                      </td>
                    );
                  case "talent_DealDetails":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.request?.detail}
                      </td>
                    );

                  case "talent_DealSender":
                    return (
                      <td className="useTable_tableDetails">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={
                              each?.requests?.sender?.profile_pics ||
                              each?.requests?.player?.profile_pics
                            }
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.requests?.sender?.firstname ||
                            each?.requests?.player?.firstname}
                          {each?.requests?.sender?.surname ||
                            each?.requests?.player?.surname}
                        </div>
                      </td>
                    );

                  case "talent_DealPlayer":
                    return (
                      <td className="useTable_tableDetails">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={each?.requests?.player?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.requests?.player?.firstname}
                          {each?.requests?.player?.surname}
                        </div>
                      </td>
                    );

                  case "talent_Deal_name":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.request?.name}
                      </td>
                    );
                  case "Talent_AcceptDeclineOffer":
                    return (
                      <td className="useTable_ViewEditSuspendDetails">
                        <div className="flex">
                          {each?.requests?.request?.status === "pending" && (
                            <>
                              <button
                                className="AcceptedPlayerUseTable"
                                onClick={() => handleEdit(each)}
                              >
                                Accepted
                              </button>
                              <button
                                className="RejectedPlayerUseTable"
                                onClick={() => handleDelete(each)}
                              >
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
                          state={{ data: each?.requests }}
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
                            src={
                              each?.requests?.player?.profile_pics ||
                              each?.profile_pics
                            }
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.requests?.player?.firstname || each?.firstname}

                          {each?.requests?.player?.surname || each?.surname}
                        </div>
                      </td>
                    );

                  case "talent_player_Position":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.player?.position || (
                          <>
                            {each?.position?.map((item) => {
                              return <span>{item?.position} </span>;
                            })}
                          </>
                        )}
                      </td>
                    );

                  case "talent_player_Position_Request":
                    return (
                      <td className="useTable_tableDetails">
                        <>
                          {each?.requests?.request?.position?.map((item) => {
                            return <span>{item?.position} </span>;
                          })}
                        </>
                      </td>
                    );

                  case "talent_player_Club":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.player?.current_club ||
                          each?.current_club}
                      </td>
                    );

                  case "talent_player_Club_Request":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.request?.current_club}
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
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.DealName ||
                          each?.request?.requests?.RequestName ||
                          each?.request?.deal?.fanRequest ||
                          each?.DealName}
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
                              each?.request?.deal?.profile_pics
                            }
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.offer?.sender?.firstname ||
                            each?.request?.requests?.firstname ||
                            each?.request?.deal?.firstname}{" "}
                          {each?.offer?.sender?.surname ||
                            each?.request?.requests?.surname ||
                            each?.request?.deal?.surname}
                        </div>
                      </td>
                    );

                  case "Sent by":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.payment_type == "advert"
                          ? each?.description
                          : ""}
                      </td>
                    );

                  case "Date sent":
                    return (
                      <td className="useTable_tableDetails">
                        {format(new Date(each?.created_at), "dd MMMM yyyy")}
                      </td>
                    );

                  case "Description":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.payment_type == "advert"
                          ? each?.payment_type
                          : each?.description}
                      </td>
                    );

                  case "Payment type":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.payment_type}
                      </td>
                    );

                  case "Amount sent":
                    return (
                      <td className="useTable_tableDetails">${each?.amount}</td>
                    );

                  case "Manager":
                    return (
                      <td className="useTable_tableDetails">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={each?.requests?.manager?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.requests?.manager?.firstname}{" "}
                          {each?.requests?.manager?.surname}
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
                          each?.detail}
                      </td>
                    );
                  case "Phone number":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.manager?.phone}
                      </td>
                    );
                  case "Email":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.manager?.email}
                      </td>
                    );
                  case "Amount":
                    return (
                      <td className="useTable_tableDetails">
                        ${" "}
                        {each?.offer?.deal?.value ||
                          each?.request?.requests?.recipient_earnings ||
                          each?.request?.deal?.value ||
                          each?.value}
                      </td>
                    );
                  case "Request Type":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.request?.requests?.type ||
                          each?.request?.deal?.fanRequest}
                      </td>
                    );
                  case "Payment":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.payment_status == "paid" ||
                        each?.request?.deal?.payment_status == "paid" ||
                        each?.payment_status == "paid"
                          ? "Paid"
                          : "Not Paid"}
                      </td>
                    );
                  case "Status":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.offer?.deal?.offerStatus ||
                          each?.offer?.deal?.status ||
                          each?.request?.requests?.status ||
                          each?.request?.deal?.requestStatus}
                      </td>
                    );
                  case "Request Status":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.requests?.request?.manager_request}
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
                        ) : each?.offer?.deal?.offerStatus == "expired" ? (
                          <button className="RejectedPlayerUseTable">
                            Expired
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
                            <button
                              className="Admin_playersSuspendprofile"
                              onClick={() =>
                                handleDeleteOffer(each?.offer?.deal?.offerId)
                              }
                            >
                              {deleteIndex == each?.offer?.deal?.offerId ? (
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
                  case "FanAcceptDeclineOffer":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "200px" }}
                      >
                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.request?.deal?.requestStatus == "accepted" ? (
                          <button className="AcceptedPlayerUseTable">
                            Accepted
                          </button>
                        ) : each?.request?.deal?.requestStatus == "rejected" ? (
                          <button className="RejectedPlayerUseTable">
                            Rejected
                          </button>
                        ) : each?.request?.deal?.requestStatus == "expired" ? (
                          <button className="RejectedPlayerUseTable">
                            Expired
                          </button>
                        ) : (
                          <>
                            <button
                              className="Admin_playersviewprofile"
                              onClick={() =>
                                handleAcceptRequest(
                                  each?.request?.deal?.requestId
                                )
                              }
                            >
                              {acceptRequestIndex ==
                              each?.request?.deal?.requestId ? (
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
                                  each?.request?.deal?.requestId
                                )
                              }
                            >
                              {deleteRequestIndex ==
                              each?.request?.deal?.requestId ? (
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
                  case "ManagerAcceptDeclineOffer":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "200px" }}
                      >
                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.requests?.request?.status == "accepted" ? (
                          <button className="AcceptedPlayerUseTable">
                            Accepted
                          </button>
                        ) : each?.requests?.request?.status == "rejected" ? (
                          <button className="RejectedPlayerUseTable">
                            Rejected
                          </button>
                        ) : each?.offer?.deal?.offerStatus == "expired" ? (
                          <button className="RejectedPlayerUseTable">
                            Expired
                          </button>
                        ) : (
                          <>
                            <button
                              className="Admin_playersviewprofile"
                              onClick={() =>
                                handleManagerAcceptRequest(
                                  each?.requests?.request?.manager_id,
                                  index
                                )
                              }
                            >
                              {acceptRequestIndex == index ? (
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
                                handleManagerDeleteRequest(
                                  each?.requests?.request?.manager_id,
                                  index
                                )
                              }
                            >
                              {deleteRequestIndex == index ? (
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
                            to={`/afrisport/player/fandealsmade/${each?.request?.deal?.requestId}`}
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
