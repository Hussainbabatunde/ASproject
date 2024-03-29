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
  Admin_Get_All_Suspended_Scouts_fun,
  reset__Admin_Scouts_Details_fun,
  reset__Admin_Scouts_fun,
} from "../../../Slice/Admin/Admin_Scouts_Slice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableWithPagination from "../../../Pages/Admin/TableWithPagination";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const AdminScoutsSuspended = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatch = useDispatch();

  const { Admin_Get_All_Scouts_isSuccess, Admin_Get_All_Suspended_Scouts } =
    useSelector((state) => state.reducer.Admin_Scouts_Slice);

  const [loading, setLoading] = useState(false);

  const header = [
    {
      id: 1,
      name: "Player Name",
    },
    {
      id: 2,
      name: "Active Negotiation",
      case: "Admin_scout_Acitive_Negotiate",
    },
    {
      id: 3,
      name: "Closed Negotiations",
      case: "Admin_scout_Closed_Negotiate",
    },
    {
      id: 4,
      name: "   ",
      case: "Admin_scout_view_suspend",
    },
  ];

  const dataTable = [
    {
      id: 22,
      playerName: "mayana",
      position: "striker",
      club: "chelsea",
      recentNegotiate: "league ball",
    },
  ];
  const handleSuspend_Unsuspend = async (id) => {
    let API_URL = `${baseURL}admin/player/unsuspend`;

    const tokengot = localStorage.getItem("token");

    try {
      // Set the loading state to true before sending the request
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
      // Reset the loading state to false in case of an error
      setLoading(false);

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

  useEffect(() => {
    dispatch(Admin_Get_All_Suspended_Scouts_fun());

    return () => {
      dispatch(reset__Admin_Scouts_Details_fun());
      dispatch(reset__Admin_Scouts_fun());
    };
  }, []);

  const handleEdit = (data) => {
    handleSuspend_Unsuspend(data?.User);
  };

  const [searchInput, setSearchInput] = useState("");

  const filteredUsersArray = Admin_Get_All_Suspended_Scouts?.filter(
    (user) =>
      user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user?.surname.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <>
      <ToastContainer />

      <div className="AdminPage_NegotiateTab">
        <div className="AdminPage_NegotiateTabTitle">
          <p
            className="AdminPAge_Negotiate_TabNegotiateInactive"
            onClick={handleAllNegotiate}
          >
            All Scouts
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
            This is a table of Suspended Negotiations on the platform
          </span>
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
            <TableWithPagination
              header={header}
              data={filteredUsersArray}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminScoutsSuspended;
