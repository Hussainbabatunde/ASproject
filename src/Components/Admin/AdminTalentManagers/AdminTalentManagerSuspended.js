import React, { useEffect } from "react";
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
import { Admin_talent_manager_fun } from "../../../Slice/Admin/AdminTalentMangerSlice";

const AdminTalentManagerSuspended = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatach = useDispatch();

  const { Admin_talent_manager } = useSelector(
    (state) => state.reducer.AdminTalentMangerSlice
  );

  console.log(
    Admin_talent_manager?.Admin__TalentManger__Suspended_Negotiations
  );

  useEffect(() => {
    dispatach(Admin_talent_manager_fun());

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
      name: "ViewEditUnSuspend",
    },
  ];

  const dataTable = [
    {
      id: 1,
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
          className="AdminPAge_Negotiate_TalentManagerNegotiateInactive"
          onClick={handleAllNegotiate}
        >
          All Talent Manager
        </p>
        {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleClosed}>Review <span className='AdminPage_NegotiateTab_TabNumber'>4</span></p> */}
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
        {Admin_talent_manager?.Admin__TalentManger__Suspended_Negotiations?.data
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
              Admin_talent_manager?.Admin__TalentManger__Suspended_Negotiations
                ?.data
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminTalentManagerSuspended;
