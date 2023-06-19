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
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Get_All_Scouts_fun,
  reset__Admin_Scouts_fun,
} from "../../../Slice/Admin/Admin_Scouts_Slice";

import { Admin_dashboard_approved_player_fun } from "../../../Slice/Admin/AdminDashboardSlice";
import Scout_message_modal from "../../../Pages/Admin/Souts/Scout_message_modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableWithPagination from "../../../Pages/Admin/TableWithPagination";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const AdminScoutsAllScouts = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const { Admin_Get_All_Scouts } = useSelector(
    (state) => state.reducer.Admin_Scouts_Slice
  );

  console.log(Admin_Get_All_Scouts);

  const dispatch = useDispatch();

  const header = [
    {
      id: 1,
      name: "Scout",
      case: "Admin_Scout",
    },
    {
      id: 2,
      name: "Active Negotiate",
      case: "Admin_scout_Acitive_Negotiate",
    },
    {
      id: 3,
      name: "Closed Negotiate",
      case: "Admin_scout_Closed_Negotiate",
    },
    {
      id: 4,
      name: "   ",
      case: "Scout_Suspend_Message_View",
    },
  ];

  useEffect(() => {
    dispatch(Admin_Get_All_Scouts_fun());

    return () => {
      dispatch(reset__Admin_Scouts_fun());
    };
  }, []);

  const dataTable = [
    {
      id: 1,
      imgRecip: imgRecipient,
      scoutname: "Jerry Oloti",
      activeNegotiate: "20",
      closedNegotiate: "5",
      recentNegotiate: "league ball",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scout_email, setScout_email] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (data) => {
    console.log(data);
    setScout_email(data);
    setIsModalOpen(true);
  };

  const [loading, setLoading] = useState(false);

  const handleSuspend_Unsuspend = async (id) => {
    let API_URL = `${baseURL}admin/scout/suspend`;

    const tokengot = localStorage.getItem("token");

    try {
      // Set the loading state to true before sending the request
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
          user_id: id,
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

  const handleDelete = (data) => {
    console.log(data?.user?.id);

    handleSuspend_Unsuspend(data?.user?.id);
  };

  const [searchInput, setSearchInput] = useState("");

  const filteredUsersArray = Admin_Get_All_Scouts?.filter(
    (user) =>
      user?.user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user?.user?.surname.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <ToastContainer />

      {isModalOpen && (
        <Scout_message_modal
          scout_email={scout_email}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      <div className="AdminPage_NegotiateTab">
        <div className="AdminPage_NegotiateTabTitle">
          <p
            className="AdminPAge_Negotiate_TabNegotiateActive"
            onClick={handleAllNegotiate}
          >
            All Scouts
          </p>
          {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleClosed}>Review <span className='AdminPage_NegotiateTab_TabNumber'>4</span></p> */}
          <p
            className="AdminPAge_Negotiate_TabNegotiateInactive"
            onClick={handleSuspended}
          >
            Suspended
          </p>
          {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p> */}
        </div>

        <div className="AdminPage_TableTitleandLink">
          <p className="AdminPage_NegotiateTitleText">All Scouts</p>
          <div className="AdminDashboard_Search">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              className="AdminDashboard_SearchInput"
              placeholder="Search name"
            />
            <RiSearchLine className="AdminDashboard_SearchIcon" />
          </div>
        </div>
        <div className="AdminPage_TableInfo">
          <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
          <span className="AdminPage_TableInfoText">
            This is a table of recent communication on the platform
          </span>
        </div>
        <div className="AdminTable_NegotiateTable">
          {Admin_Get_All_Scouts?.length === 0 ? (
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
            <TableWithPagination
              header={header}
              data={filteredUsersArray}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminScoutsAllScouts;
