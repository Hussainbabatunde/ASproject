import React, { useEffect, useState } from "react";
import "../AdminNegotiate/AdminNegotiate.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import AdminUseTable from "../../Table/AdminUseTable";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import {
  Admin_Get_ALLPlayers_fun,
  Admin_Get_All_Suspended_Player_fun,
} from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

let baseURL = process.env.REACT_APP_AFRISPORTURL;
const tokengot = localStorage.getItem("token");

const AdminPlayersSuspended = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const { Admin_Get_All_Suspended_Player } = useSelector(
    (state) => state.reducer.AdminUpdate_profileSlice
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  console.log(Admin_Get_All_Suspended_Player);

  useEffect(() => {
    dispatch(Admin_Get_All_Suspended_Player_fun());
    return () => {};
  }, []);
  const header = [
    {
      id: 1,
      name: "Player Name",
    },
    {
      id: 2,
      name: "Position",
    },
    {
      id: 3,
      name: "Club",
    },
    {
      id: 4,
      name: "Recent Negotiate",
    },
    {
      id: 5,
      name: "  ",
      case: "Admin_All_player_View_Edit_Suspend",
    },
  ];

  // const handleEdit = (data) => {
  //   console.log(data);
  // };

  const handleEdit = async (data) => {
    console.log(data);

    try {
      // Set the loading state to true before sending the request

      let API_URL = `${baseURL}admin/player/unsuspend`;

      console.log("Sending POST request...");
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      const response = await axios.post(
        API_URL,
        {
          user_id: data?.id,
        },
        config
      );

      // Reset the loading state to false after receiving the response
      setLoading(false);
      console.log("POST request successful");
      console.log("Response:", response.data.message);

      toast.success(`${response.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      // Reset the loading state to false in case of an error
      setLoading(false);
      console.error("Error:", error.message);

      toast.error(`${error.message}`, {
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
    }
  };

  const dataTable = [
    {
      id: 19,
      playerName: "mayana",
      position: "striker",
      club: "chelsea",
      recentNegotiate: "league ball",
    },
  ];
  return (
    <div className="AdminPage_NegotiateTab">
      <div className="AdminPage_NegotiateTabTitle">
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleAllNegotiate}
        >
          All Players
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleClosed}
        >
          Review <span className="AdminPage_NegotiateTab_TabNumber">4</span>
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateActive"
          onClick={handleSuspended}
        >
          Suspended
        </p>
        {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p> */}
      </div>

      <div className="AdminPage_TableTitleandLink">
        <p className="AdminPage_NegotiateTitleText">Suspended</p>
        <div className="AdminDashboard_Search">
          <input
            type="text"
            placeholder="Search name"
            className="AdminDashboard_SearchInput"
          />
          <RiSearchLine className="AdminDashboard_SearchIcon" />
        </div>
      </div>
      <div className="AdminPage_SuspendedTableInfo">
        <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
        <span className="AdminPage_TableInfoText">
          This is a table of Suspended Negotiates on the platform
        </span>
      </div>
      <div className="AdminTable_NegotiateTable">
        {dataTable?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Lottie
              style={{ width: "200px", height: "200px" }}
              animationData={empty}
            />
          </div>
        ) : (
          <AdminUseTable
            header={header}
            data={Admin_Get_All_Suspended_Player?.data}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPlayersSuspended;
