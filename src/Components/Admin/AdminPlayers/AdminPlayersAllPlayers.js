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
import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
import TableWithPagination from "../../../Pages/Admin/TableWithPagination";

const AdminPlayerAllNegotiate = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatch = useDispatch();
  const { Admin_Get_All_Player } = useSelector(
    (state) => state.reducer.AdminUpdate_profileSlice
  );

  useEffect(() => {
    dispatch(Admin_Get_ALLPlayers_fun());

    return () => {};
  }, []);

  const header = [
    {
      id: 19,
      name: "Player Name",
    },
    {
      id: 2,
      name: "Position",
      case: "admin_player_Position",
    },
    {
      id: 3,
      name: "Club",
    },

    {
      id: 4,
      name: "  ",
      case: "Admin_All_player_ViewEditSuspend",
    },
  ];

  const [searchInput, setSearchInput] = useState("");

  const filteredUsersArray = Admin_Get_All_Player?.filter(
    (user) =>
      user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user?.surname.toLowerCase().includes(searchInput.toLowerCase())
  );

  const reversedUsersArray = [...filteredUsersArray].reverse();
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="AdminPage_NegotiateTab">
      <div className="AdminPage_NegotiateTabTitle">
        <p
          className="AdminPAge_Negotiate_TabNegotiateActive"
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
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleSuspended}
        >
          Suspended
        </p>
        {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p> */}
      </div>
      <p className="AdminPage_NegotiateTitleText">All Players</p>
      <div className="AdminPage_TableInfo">
        <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
        <span className="AdminPage_TableInfoText">
          This is a table of recent communication on the platform
        </span>
      </div>
      <div className="AdminPage_TableTitleandLink">
        {/* <button className="AdminPage_NegotiateSortingAlgorithm">
          Sorting Algorithm
        </button> */}
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
      <div className="AdminTable_NegotiateTable">
        {filteredUsersArray?.length === 0 ? (
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
          <TableWithPagination header={header} data={reversedUsersArray} />
        )}
      </div>
    </div>
  );
};

export default AdminPlayerAllNegotiate;
