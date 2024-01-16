import React from "react";
import Table from "react-bootstrap/Table";
import "./UseTable.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { PulseLoader } from "react-spinners";

import ChatCircle from "../../assets/ChatsCircle.png";
import { useSelector } from "react-redux";

const AdminUseTable = ({
  header,
  data,
  deletingIndex,
  handleDelete,
  handleShowEdit,
  deleteinfo,
  handleEdit,
  HandlePermision,
  handleRestpassword,
}) => {
  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

  return (
    <table className="AdminUserTable  ">
      <thead>
        <tr>
          {header?.map((item, index) => (
            <th key={index} className="UseTable_tableheader">
              {item?.name == "ViewEditSuspend" ||
              item?.name == "PlayersViewdetails" ||
              item?.name == "EditDeleteRoles" ||
              item?.name == "EditDeletePermissions" ||
              item?.name == "EditResetPasswordEnableDisable" ||
              item?.name == "ViewEditUnSuspend" ||
              item?.name == "SuspendMessageView"
                ? ""
                : item?.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((each, index) => {
          return (
            <tr key={index}>
              {header?.map((item) => {
                switch (item?.case) {
                  case "admin_player_Position":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.position?.map((item, index) => (
                          <li className="" key={index}>
                            {item?.position}
                          </li>
                        ))}
                      </td>
                    );

                  case "Admin_Transaction_Date":
                    const dateObject = new Date(
                      each?.payments?.payment?.created_at
                    );
                    const formattedDate = dateObject.toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    );
                    return (
                      <td className="useTable_tableDetails">{formattedDate}</td>
                    );
                  case "Admin_Transaction_details":
                    return (
                      <td className="useTable_tableDetails">
                        <Link
                          to={`/admin/finance/${each?.payments?.payment?.id}`}
                          className="Admin_playersEditprofile cursor-pointer"
                        >
                          Detail
                        </Link>
                      </td>
                    );
                  case "Admin_Transaction_Reference":
                    return (
                      <td className="useTable_tableDetails">
                        <a
                          href={`${each?.payments?.payment?.receipt_url}`}
                          className="Admin_playersviewprofile"
                          target="_blank"
                        >
                          View
                        </a>
                      </td>
                    );
                  case "Admin_Transaction_Customer":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.payments?.payment_by.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          <span>{` ${each?.payments?.payment_by?.firstname}  ${each?.payments?.payment_by?.surname}`}</span>
                        </p>
                      </td>
                    );

                  case "Admin_Transaction_Amount":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.payments?.payment?.amount}
                      </td>
                    );

                  case "Admin_Transaction_Purpose":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.payments?.payment?.description}
                      </td>
                    );

                  case "Settings_Name":
                    return (
                      <td className="useTable_tableDetails">{each?.name}</td>
                    );

                  case "Settings_Data":
                    return (
                      <td className="useTable_tableDetails">{each?.data}</td>
                    );

                  case "Admin_email":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.user?.email}
                      </td>
                    );

                  case "Admin_ads_Amount":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">${each?.amount}</p>
                      </td>
                    );

                  case "Admin_ads_Duration":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.start_date} -- {each?.end_date}{" "}
                        </p>
                      </td>
                    );

                  case "Admin_ads_reach":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">{each?.reach} </p>
                      </td>
                    );

                  case "Admin_All_Ads_View":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          to={`/admin/players/${each?.player_id}`}
                          className="Admin_playersviewprofile"
                        >
                          View Profile
                        </Link>

                        {each?.status === "terminated" ? (
                          ""
                        ) : (
                          <span
                            className="Admin_playersSuspendprofile cursor-pointer"
                            onClick={() => handleDelete(each)}
                          >
                            Terminate
                          </span>
                        )}
                      </td>
                    );

                  case "Admin_fan_scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.user.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          <span>{` ${each?.user?.firstname}  ${each?.user?.surname}`}</span>
                        </p>
                      </td>
                    );

                  case "Admin_talent_manager_Scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.user.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          <span>{` ${each?.user?.firstname}  ${each?.user?.surname}`}</span>
                        </p>
                      </td>
                    );

                  case "Admin_talent_manager_players":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.number_of_players}
                        </p>
                      </td>
                    );

                  case "Admin_talent_manager_SuspendMessageView":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        {each?.user?.status === "suspended" ? (
                          <span
                            onClick={() => handleDelete(each)}
                            className="Admin_playersSuspendprofile cursor-pointer"
                          >
                            UnSuspend
                          </span>
                        ) : (
                          <span
                            className="Admin_playersSuspendprofile cursor-pointer"
                            onClick={() => handleDelete(each)}
                          >
                            Suspend
                          </span>
                        )}

                        <span
                          className="Admin_playersviewprofile cursor-pointer"
                          onClick={() => handleEdit(each)}
                        >
                          Message
                        </span>
                        <Link
                          to={`/admin/talentManager/${each?.user?.id}`}
                          className="Admin_playersEditprofile cursor-pointer"
                        >
                          View
                        </Link>
                      </td>
                    );

                  case "Admin_talent_manager_Closed_Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.closed_negotiations}
                        </p>
                      </td>
                    );

                  case "Admin_fan_scout_suspend":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.user?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          <span>{` ${each?.user?.firstname}  ${each?.user?.surname}`}</span>
                        </p>
                      </td>
                    );

                  case "Admin_fan_Acitive_Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <span>{each?.active_negotiations}</span>
                        </p>
                      </td>
                    );

                  case "Admin_scout_Acitive_Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <span>{each?.active_negotiations}</span>
                        </p>
                      </td>
                    );

                  case "Admin_fan_Closed_Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <span>{each?.closed_negotiations}</span>
                        </p>
                      </td>
                    );

                  case "Admin_scout_Closed_Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <span>{each?.closed_negotiations}</span>
                        </p>
                      </td>
                    );

                  case "Admin_scout_view_suspend":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          to={`/admin/scouts/${each?.User}`}
                          className="Admin_playersviewprofile"
                        >
                          View
                        </Link>
                        {/* <Link className="Admin_playersEditprofile">Edit</Link> */}
                        <span
                          onClick={() => handleEdit(each)}
                          className="Admin_playersSuspendprofile"
                        >
                          Un-Suspend
                        </span>
                      </td>
                    );
                  case "Admin_Scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.user?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />

                          <span>{` ${each?.user?.firstname}  ${each?.user?.surname}`}</span>

                          {/* <span>{` ${each?.firstname}  ${each?.surname}`}</span> */}
                        </p>
                      </td>
                    );

                  case "All_negotiate_payment":
                    return (
                      <td className="useTable_tableDetails">{each?.number}</td>
                    );

                  case "Admin_Phone_number":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.user?.phone}
                      </td>
                    );

                  case "Scout_Suspend_Message_View":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          onClick={() => handleDelete(each)}
                          className="Admin_playersSuspendprofile cursor-pointer"
                        >
                          Suspend
                        </Link>

                        <span
                          className="Admin_playersviewprofile cursor-pointer"
                          onClick={() => handleEdit(each)}
                        >
                          Message
                        </span>

                        <Link
                          to={`/admin/scouts/${each?.user?.id}`}
                          className="Admin_playersEditprofile"
                        >
                          View
                        </Link>
                      </td>
                    );

                  case "Admin_fan_Suspend_message_view":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <span
                          onClick={() => handleDelete(each)}
                          className="Admin_playersSuspendprofile cursor-pointer"
                        >
                          Suspend
                        </span>
                        <span
                          onClick={() => handleEdit(each)}
                          className="Admin_playersviewprofile cursor-pointer"
                        >
                          Message
                        </span>
                        <Link
                          to={`/admin/fans/${each?.user?.id}`}
                          className="Admin_playersEditprofile cursor-pointer"
                        >
                          View
                        </Link>
                      </td>
                    );

                  case "Admin_fan_Suspend_message_view_suspend_header":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <span
                          onClick={() => handleDelete(each)}
                          className="Admin_playersviewprofile"
                        >
                          UnSuspend
                        </span>
                        <span
                          onClick={() => handleEdit(each)}
                          className="Admin_playersviewprofile cursor-pointer"
                        >
                          Message
                        </span>
                        <Link
                          to={`/admin/fans/${each?.User}`}
                          className="Admin_playersEditprofile"
                        >
                          View
                        </Link>
                      </td>
                    );

                  case "Admin_Role":
                    return (
                      <td className="useTable_tableDetails">{each?.role}</td>
                    );

                  case "Previlage_Admin_Name":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">{each?.name}</p>
                      </td>
                    );

                  case "Admin_All_player_View_Edit_Suspend":
                    return (
                      <td
                        className="border-2 px-1 border-[#DDDDDD] w-[300px] text-center "
                        style={{ flex: 1 }}
                      >
                        <Link
                          to={`/admin/players/${each?.id}`}
                          className="Admin_playersviewprofile"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/players/profile/${each}`}
                          className="Admin_playersEditprofile"
                        >
                          Edit
                        </Link>
                        <span
                          onClick={() => handleEdit(each)}
                          className="Admin_playersSuspendprofile"
                        >
                          Un-Suspend
                        </span>
                      </td>
                    );

                  case "Admin_All_player_ViewDetail":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          to={`/admin/players/review/${each?.id}`}
                          className="Admin_playersviewprofile"
                        >
                          View Details
                        </Link>
                      </td>
                    );

                  case "Admin_All_player_ViewEditSuspend":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          to={`/admin/players/${each?.id}`}
                          className="Admin_playersviewprofile"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/players/profile/${each?.id}`}
                          className="Admin_playersEditprofile"
                        >
                          Edit
                        </Link>
                        {/* <span
                          onClick={() => handleEdit(each)}
                          className="Admin_playersSuspendprofile"
                        >
                          Suspend
                        </span> */}
                      </td>
                    );

                  case "Admin_All_Ads_View_Terminate":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          to={`/admin/Ads/${each?.id}`}
                          className="Admin_playersviewprofile"
                        >
                          View
                        </Link>
                        <span
                          onClick={() => handleDelete(each)}
                          className="Admin_playersEditprofile"
                        >
                          Terminante
                        </span>
                      </td>
                    );

                  case "Admin_Edit_Delete_Asign":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "350px" }}
                      >
                        {logindata?.data?.user_type === "super-admin" && (
                          <>
                            <button
                              onClick={() => handleEdit(each)}
                              className="Admin_playersviewprofile"
                            >
                              <span>Edit</span>
                            </button>

                            <button
                              className="border border-[#1D217F] px-2 py-1 bg-[#F2F3FE] text-[#1D217F]-500 font-bold rounded-md mr-2"
                              onClick={() => handleRestpassword(each)}
                            >
                              <span>Reset Password</span>
                            </button>

                            <button
                              onClick={() => handleDelete(each)}
                              className="border border-[#1D217F] px-2 py-1 bg-green-50 text-[#1D217F]-500 font-bold rounded-md mr-2"
                            >
                              Disable
                            </button>
                          </>
                        )}

                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                      </td>
                    );

                  case "Settings_Edit":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "350px" }}
                      >
                        <button
                          onClick={() => handleEdit(each)}
                          className="Admin_playersviewprofile"
                        >
                          <span>Edit</span>
                        </button>

                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                      </td>
                    );

                  case "Neg_Deal_name":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.comments?.active_offers?.DealName ||
                          each?.DealName}
                      </td>
                    );

                  case "Neg_Initial_Offer":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.comments?.active_offers?.initial ||
                          each?.initial}
                      </td>
                    );

                  case "Neg_Current_Offer":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.comments?.active_offers?.Amount || each?.Amount}
                      </td>
                    );

                  case "Neg_Scout":
                    return (
                      <td className="useTable_tableDetails">
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              src={
                                each?.comments?.active_offers?.profile_pics ||
                                each?.profile_pics
                              }
                              alt=""
                              className="border-1 border-black shadow-md w-[35px] h-[35px] rounded-[50%] block"
                            />
                          </div>
                          <span className="f text-xs font-normal">
                            {`${
                              each?.comments?.active_offers?.firstname ||
                              each?.firstname
                            }  ${
                              each?.comments?.active_offers?.surname ||
                              each?.surname
                            } `}
                          </span>
                        </div>
                      </td>
                    );

                  case "Neg_Payment":
                    return (
                      <td className="useTable_tableDetails">
                        {`${
                          each?.comments?.active_offers?.Payment ||
                          each?.Payment
                        } `}
                      </td>
                    );

                  case "scout_Deal_name":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.DealName}
                      </td>
                    );

                  case "scout_ne_name":
                    return (
                      <td className="useTable_tableDetails">
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              src={each?.profile_pics}
                              alt=""
                              className="border-1 border-black shadow-md w-[35px] h-[35px] rounded-[50%] block"
                            />
                          </div>
                          <span className="f text-xs font-normal">
                            {each?.firstname} {each?.surname}
                          </span>
                        </div>
                      </td>
                    );

                  case "dash_Player_name":
                    return (
                      // <td className="useTable_tableDetails">
                      //   {`${each?.firstname} ${each?.surname}`}
                      // </td>

                      <td className="useTable_tableDetails ">
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              src={each?.profile_pics}
                              alt=""
                              className="border-1 border-black shadow-md w-[35px] h-[35px] rounded-[50%] block"
                            />
                          </div>
                          <span className="f text-xs font-normal">
                            {each?.firstname} {each?.surname}
                          </span>
                        </div>
                      </td>
                    );

                  case "scout_Initial_Offer":
                    return (
                      <td className="useTable_tableDetails">
                        <span className="f text-xs font-normal">
                          {each?.initial}
                        </span>
                      </td>
                    );

                  case "scout_Current_Offer":
                    return (
                      <td className="useTable_tableDetails">
                        <span className="f text-xs font-normal">
                          {each?.Current_Offer}
                        </span>
                      </td>
                    );

                  case "scout_ne_Payment":
                    return (
                      <td className="useTable_tableDetails">
                        {`${each?.Payment} ` || each?.payment_status}
                        {/* {each?.payment_status} */}
                      </td>
                    );

                  case "dash_ne_Payment":
                    return (
                      <td className="useTable_tableDetails">
                        {`${each?.payment_status} `}
                      </td>
                    );

                  case "scout_All_Negotiaties":
                    return (
                      <td className="useTable_tableDetails text-center ">
                        <Link
                          to="/admin/negotiations/negotiation-detail"
                          state={each}
                        >
                          <p className="AdminUse_TableComp  text-center">
                            <img
                              src={ChatCircle}
                              width="25px"
                              height="25px"
                              alt="Recipient image"
                              className="m-auto block"
                            />
                            {each?.number}
                          </p>
                        </Link>
                      </td>
                    );

                  case "Neg_All_Negotiaties":
                    return (
                      <td className="useTable_tableDetails">
                        <Link
                          to="/admin/negotiations/negotiation-detail"
                          state={each}
                        >
                          <p className="AdminUse_TableComp">
                            <img
                              src={ChatCircle}
                              width="25px"
                              height="25px"
                              alt="Recipient image"
                              className="m-auto block"
                            />
                            {each?.number}
                          </p>
                        </Link>
                      </td>
                    );

                  case "talent_Admin_deal_name":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.DealName}
                      </td>
                    );
                  case "talent_Admin_Payment":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.payment_status}
                      </td>
                    );

                  case "talent_Admin_Active":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link
                          to="/admin/talentManager/negotiation-detail"
                          state={each}
                          className="Admin_playersviewprofile"
                        >
                          View
                        </Link>
                        {/* <button className="Admin_playersEditprofile">
                          Edit
                        </button>
                        <button className="Admin_playersSuspendprofile">
                          Suspend
                        </button> */}
                      </td>
                    );

                  case "talent_Admin_Scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          <span>{` ${each?.firstname}  ${each?.surname}`}</span>
                        </p>
                      </td>
                    );

                  case "talent_Admin_Initial_Offer":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.initialOffer}
                        </p>
                      </td>
                    );

                  case "talent_Admin_Current_Offer":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.currentOffer}
                        </p>
                      </td>
                    );
                }

                switch (item?.name) {
                  case "Deal name":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.dealname}
                      </td>
                    );

                  case "Roles":
                    return (
                      <td className="useTable_tableDetails">{each?.name}</td>
                    );
                  case "Player name":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.playerName}
                      </td>
                    );
                  case "Permission name":
                    return (
                      <td className="useTable_tableDetails">{each?.name}</td>
                    );
                  case "Description":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.description}
                      </td>
                    );
                  case "S/N":
                    return (
                      <td className="useTable_tableDetails">{index + 1}</td>
                    );
                  case "Position":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.position?.map((item, index) => (
                          <p key={index}>
                            <p className="">{item?.position} </p>
                          </p>
                        ))}
                      </td>
                    );
                  case "Active Negotiation":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.activeNegotiate}
                      </td>
                    );
                  case "Closed Negotiations":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.closedNegotiate}
                      </td>
                    );
                  case "Number of Player":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.closedNegotiate}
                      </td>
                    );
                  case "Nationality":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.Nationality || each?.location}
                      </td>
                    );
                  case "Date":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.dealname}
                      </td>
                    );
                  case "Amount":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.dealname}
                      </td>
                    );
                  case "Purpose":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.dealname}
                      </td>
                    );
                  case "Transaction ID":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.dealname}
                      </td>
                    );
                  case "Images":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.images || each?.images_count} Images
                      </td>
                    );
                  case "Video":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.videos || each?.videos_count} Videos
                      </td>
                    );
                  case "View Details":
                    return (
                      <td className="useTable_tableDetails">
                        <Link
                          to={`/admin/players/${each?.id}`}
                          className="AdminPage_TableViewDetails"
                        >
                          View Details
                        </Link>
                      </td>
                    );

                  case "Admin Name":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.user?.firstname} {each?.user?.surname}
                        </p>
                      </td>
                    );
                  case "Initial Offer":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.InitialOffer}
                      </td>
                    );
                  case "Current Offer":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.CurrentOffer}
                      </td>
                    );
                  case "Phone number":
                    return (
                      <td className="useTable_tableDetails">{each?.phone}</td>
                    );
                  case "Active Negotiaties":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.chat}
                            style={{ marginRight: "10px" }}
                            width="25px"
                            height="25px"
                            alt="Recipient image"
                          />
                          {each?.number}
                        </p>
                      </td>
                    );
                  case "Payment":
                    return (
                      <td className="useTable_tableDetails">{each?.surname}</td>
                    );
                  case "Role":
                    return (
                      <td className="useTable_tableDetails">{each?.role}</td>
                    );
                  case "Email":
                    return (
                      <td className="useTable_tableDetails">{each?.email}</td>
                    );
                  case "Player Name":
                    return (
                      <td className="useTable_tableDetails ">
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              src={each?.profile_pics}
                              alt=""
                              className="border-1 border-black shadow-md w-[35px] h-[35px] rounded-[50%] block"
                            />
                          </div>
                          <span className="f text-xs font-normal">
                            {each?.firstname} {each?.surname}
                          </span>
                        </div>
                      </td>
                    );
                  case "Recent Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.Negotiation}
                      </td>
                    );
                  case "Club":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.current_club}
                      </td>
                    );

                  case "ViewEditUnSuspend":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link className="Admin_playersviewprofile">View</Link>
                        <Link className="Admin_playersEditprofile">Edit</Link>
                        <Link className="Admin_playersSuspendprofile">
                          Un-Suspend
                        </Link>
                      </td>
                    );
                  case "EditResetPasswordEnableDisable":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "350px" }}
                      >
                        <Link className="Admin_playersviewprofile">Edit</Link>
                        <Link className="Admin_playersEditprofile">
                          Reset Password
                        </Link>
                        {each?.enable == "enable" ? (
                          <Link className="Admin_playersviewprofile">
                            Enable
                          </Link>
                        ) : (
                          <Link className="Admin_playersSuspendprofile">
                            Disable
                          </Link>
                        )}
                      </td>
                    );
                  case "EditDeletePermissions":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "350px" }}
                      >
                        <Link className="Admin_playersviewprofile">Edit</Link>
                        <button
                          onClick={() => handleDelete(each?.id, index, each)}
                          className="Admin_playersSuspendprofile"
                        >
                          {deletingIndex === index ? (
                            <PulseLoader
                              color="#7F351D"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <span>Delete</span>
                          )}
                        </button>
                      </td>
                    );

                  case "EditDeleteRoles":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1, width: "350px" }}
                      >
                        {/* <Link className="Admin_playersviewprofile">Edit</Link> */}

                        <button
                          onClick={() => handleEdit(each)}
                          className="Admin_playersviewprofile"
                        >
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(each)}
                          className="Admin_playersSuspendprofile"
                        >
                          {deletingIndex === index ? (
                            <PulseLoader
                              color="#7F351D"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <span>Delete</span>
                          )}
                        </button>
                      </td>
                    );
                  case "SuspendMessageView":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link className="Admin_playersSuspendprofile">
                          Suspend
                        </Link>
                        <Link className="Admin_playersviewprofile cursor-pointer">
                          Message
                        </Link>
                        <Link className="Admin_playersEditprofile">View</Link>
                      </td>
                    );
                  case "PlayersViewdetails":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link className="Admin_playersviewprofile">
                          View Details
                        </Link>
                      </td>
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

export default AdminUseTable;
