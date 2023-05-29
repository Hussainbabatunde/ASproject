import React, { useEffect, useState } from "react";
import "./AdminTalentManagers.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import AdminUseTable from "../../Table/AdminUseTable";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import { useDispatch, useSelector } from "react-redux";
import { Admin_talent_manager_fun } from "../../../Slice/Admin/AdminTalentMangerSlice";
import Talent_manger_message_modal from "../../../Pages/Admin/TalentManagers/Talent_manger_message_modal";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const AdminTalentManagerAllManagers = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatach = useDispatch();

  const [loading, setLoading] = useState(false);

  const { Admin_talent_manager } = useSelector(
    (state) => state.reducer.AdminTalentMangerSlice
  );

  const header = [
    {
      id: 1,
      name: "Scout",
      case: "Admin_talent_manager_Scout",
    },
    {
      id: 2,
      name: "Number of Player",
      case: "Admin_talent_manager_players",
    },
    {
      id: 3,
      name: "Closed Negotiate",
      case: "Admin_talent_manager_Closed_Negotiate",
    },
    {
      id: 4,
      name: "    ",
      case: "Admin_talent_manager_SuspendMessageView",
    },
  ];

  const dataTable = [
    {
      id: 1,
      imgRecip: imgRecipient,
      scoutname: "Jerry Oloti",
      activeNegotiate: "20",
      closedNegotiate: "15",
      recentNegotiate: "league ball",
    },
  ];

  useEffect(() => {
    dispatach(Admin_talent_manager_fun());

    return () => {};
  }, []);

  const handleSuspend_Unsuspend = async (data) => {
    console.log(data);
    let API_URL = `${baseURL}admin/talent-manager/suspend`;

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
          user_id: data,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scout_email, setScout_email] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (data) => {
    console.log(data?.user?.email);
    setIsModalOpen(true);
    setScout_email(data?.user?.email);
  };

  const handleDelete = (data) => {
    handleSuspend_Unsuspend(data?.user?.id);
  };

  return (
    <>
      <ToastContainer />

      {isModalOpen && (
        <Talent_manger_message_modal
          scout_email={scout_email}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      <div className="AdminPage_NegotiateTab">
        <div className="AdminPage_NegotiateTabTitle">
          <p
            className="AdminPAge_Negotiate_TalentManagerNegotiateActive"
            onClick={handleAllNegotiate}
          >
            All Talent Managers
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
          <p className="AdminPage_NegotiateTitleText">Talent Managers</p>
          <div className="AdminDashboard_Search">
            <input
              type="text"
              placeholder="Search name"
              className="AdminDashboard_SearchInput"
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
          {Admin_talent_manager?.Admin__TalentManger__Active_Negotiations
            ?.length === 0 ? (
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
              data={
                Admin_talent_manager?.Admin__TalentManger__Active_Negotiations
              }
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminTalentManagerAllManagers;
