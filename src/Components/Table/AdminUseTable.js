import React from "react";
import Table from "react-bootstrap/Table";
import "./UseTable.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { PulseLoader } from "react-spinners";

const AdminUseTable = ({
  header,
  data,
  deletingIndex,
  handleDelete,
  handleShowEdit,
  deleteinfo,
  handleEdit,
  HandlePermision,
}) => {
  return (
    <table className="AdminUserTable">
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
                  case "Admin_email":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.user?.email}
                      </td>
                    );

                  case "Admin_fan_scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.user[0].profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          <span>{` ${each?.user[0]?.firstname}  ${each?.user[0]?.surname}`}</span>
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
                          to={`/admin/scouts/${each?.id}`}
                          className="Admin_playersviewprofile"
                        >
                          View
                        </Link>
                        {/* <Link className="Admin_playersEditprofile">Edit</Link> */}
                        <Link className="Admin_playersSuspendprofile">
                          Un-Suspend
                        </Link>
                      </td>
                    );
                  case "Admin_Scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.user[0]?.profile_pics}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />

                          <span>{` ${each?.user[0]?.firstname}  ${each?.user[0]?.surname}`}</span>

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
                          className="Admin_playersSuspendprofile"
                        >
                          Suspend
                        </Link>
                        <span
                          onClick={() => handleEdit(each)}
                          className="useTable_ViewEditSuspendDetails"
                        >
                          Message
                        </span>
                        <Link
                          to={`/admin/scouts/${each?.user[0]?.id}`}
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
                          onClick={() => handleEdit(each)}
                          className="Admin_playersviewprofile"
                        >
                          Suspend
                        </span>
                        <span
                          onClick={() => handleEdit(each)}
                          className="Admin_playersviewprofile"
                        >
                          Message
                        </span>
                        <Link
                          to={`/admin/fans/${each?.user[0]?.id}`}
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

                        <button
                          onClick={() => HandlePermision(each)}
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
                            <span>Permision</span>
                          )}
                        </button>
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
                        {each?.position}
                      </td>
                    );
                  case "Active Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.activeNegotiate}
                      </td>
                    );
                  case "Closed Negotiate":
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
                        {each?.Nationality}
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
                        {each?.images} Images
                      </td>
                    );
                  case "Video":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.videos} Videos
                      </td>
                    );
                  case "View Details":
                    return (
                      <td className="useTable_tableDetails">
                        <Link
                          to={`/admin/players/19`}
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
                        <Link className="Admin_playersviewprofile">
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
