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
  reset__Admin_Scouts_Slice,
} from "../../../Slice/Admin/Admin_Scouts_Slice";
import Scout_message_modal from "../../../Pages/Scout/Scout_message_modal";
import { Admin_dashboard_approved_player_fun } from "../../../Slice/Admin/AdminDashboardSlice";

const AdminScoutsAllScouts = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const { Admin_Get_All_Scouts } = useSelector(
    (state) => state.reducer.Admin_Scouts_Slice
  );

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
      dispatch(reset__Admin_Scouts_Slice());
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
    setIsModalOpen(true);
    setScout_email(data);
  };

  const handleDelete = (data) => {
    console.log(data);
  };

  return (
    <>
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
          {Admin_Get_All_Scouts.length === 0 ? (
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
              data={Admin_Get_All_Scouts}
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
