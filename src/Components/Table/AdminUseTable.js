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
}) => {
  return (
    <table className="AdminUserTable">
      <thead>
        <tr>
          {header?.map((item, index) => (
            <>
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
            </>
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
                        {each?.nationality}
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
                        <Link className="AdminPage_TableViewDetails">
                          View Details
                        </Link>
                      </td>
                    );
                  case "Scout":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          <img
                            src={each?.imgRecip}
                            className="useTable_ImageRecipient"
                            alt="Recipient image"
                          />
                          {each?.scoutname}
                        </p>
                      </td>
                    );
                  case "Admin Name":
                    return (
                      <td className="useTable_tableDetails">
                        <p className="AdminUse_TableComp">
                          {each?.firstname} {each?.surname}
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
                      <td className="useTable_tableDetails">
                        {each?.playerName}
                      </td>
                    );
                  case "Recent Negotiate":
                    return (
                      <td className="useTable_tableDetails">
                        {each?.recentNegotiate}
                      </td>
                    );
                  case "Club":
                    return (
                      <td className="useTable_tableDetails">{each?.club}</td>
                    );
                  case "ViewEditSuspend":
                    return (
                      <td
                        className="useTable_ViewEditSuspendDetails"
                        style={{ flex: 1 }}
                      >
                        <Link className="Admin_playersviewprofile">View</Link>
                        <Link className="Admin_playersEditprofile">Edit</Link>
                        <Link className="Admin_playersSuspendprofile">
                          Suspend
                        </Link>
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
                          onClick={() => handleDelete(each?.id, index)}
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
                          onClick={() => handleEdit(each?.id, index)}
                          className="Admin_playersviewprofile"
                        >
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(each?.id, index)}
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
