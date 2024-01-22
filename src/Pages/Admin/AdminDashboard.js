import React, { useEffect } from "react";
import "./AdminDashBoard.css";
import { RiSearchLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { PiNotePencilFill, PiHandshakeBold } from "react-icons/pi";
import { BiSolidVolumeLow } from "react-icons/bi";

// import people from "../../assets/UsersThree.png";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import empty from "../../assets/lottie/emptyState.json";
import AdminUseTable from "../../Components/Table/AdminUseTable";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Header_Summary_fun,
  Admin_dashboard_active_negotiations_fun,
  Admin_dashboard_approved_player_fun,
} from "../../Slice/Admin/AdminDashboardSlice";
import { Transaction_list_fun } from "../../Slice/Admin/TransactionSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { Transaction_list } = useSelector(
    (state) => state.reducer.TransactionSlice
  );

  useEffect(() => {
    dispatch(Admin_Header_Summary_fun());
    dispatch(Admin_dashboard_approved_player_fun());
    dispatch(Admin_dashboard_active_negotiations_fun());
    dispatch(Transaction_list_fun());

    return () => {};
  }, [dispatch]);

  const {
    Admin_Header_Summary,
    Admin_dashboard_approved_player,
    Admin_dashboard_active_negotiations,
  } = useSelector((state) => state.reducer.AdminDashboardSlice);

  const last5Object_Admin_dashboard_approved_player =
    Admin_dashboard_approved_player?.plus.slice(-5);

  const last5Object_Admin_dashboard_active_negotiations =
    Admin_dashboard_active_negotiations?.plus.slice(-5);

  const last5Object_Transaction_list = Transaction_list?.slice(-5);
  console.log({
    last5Object_Transaction_list,
  });

  const header = [
    {
      id: 1,
      name: "Deal name",
      case: "scout_Deal_name",
    },
    {
      id: 2,
      name: "Scout",
      case: "scout_ne_name",
    },
    {
      id: 3,
      name: "Initial Offer",
      case: "scout_Initial_Offer",
    },
    {
      id: 4,
      name: "Current Offer",
      case: "scout_Current_Offer",
    },
    {
      id: 5,
      name: "Payments",
      case: "dash_ne_Payment",
    },
    {
      id: 6,
      name: "Active Negotiation",
      case: "scout_All_Negotiaties",
    },
  ];

  const Playerheader = [
    {
      id: 1,
      name: "Player Name",
      case: "dash_Player_name",
    },
    {
      id: 2,
      name: "Position",
      case: "admin_player_Position",
    },
    {
      id: 3,
      name: "Nationality",
    },
    {
      id: 4,
      name: "Images",
    },
    {
      id: 5,
      name: "Video",
    },
    {
      id: 6,
      name: "View Details",
    },
  ];

  const Transactionheader = [
    {
      id: 1,
      name: "Date",
      case: "Admin_Transaction_Date",
    },
    {
      id: 2,
      name: "Amount",
      case: "Admin_Transaction_Amount",
    },
    {
      id: 3,
      name: "Customer",
      case: "Admin_Transaction_Customer",
    },

    ,
    {
      id: 4,
      name: "Purpose",
      case: "Admin_Transaction_Purpose",
    },

    {
      id: 5,
      name: "Reference",
      case: "Admin_Transaction_Reference",
    },

    {
      id: 6,
      name: " ",
      case: "Admin_Transaction_details",
    },
  ];

  return (
    <div>
      <div className="AdminDashBoard_title">
        <p className="AdminDashboard_Dashboardtext">DashBoard</p>
        <div className="AdminDashboard_Search">
          <input
            type="text"
            placeholder="Search Content.."
            className="AdminDashboard_SearchInput"
          />
          <RiSearchLine className="AdminDashboard_SearchIcon" />
        </div>
      </div>

      <div className="AdminPage_Dashboard">
        <div class="grid grid-cols-2  lg:grid-cols-4 gap-4 ">
          <div className="bg-[#1B5285] rounded-lg flex items-center justify-center gap-5 lg:py-2">
            <div>
              <BsPeopleFill className="text-4xl  text-gray-500" />
            </div>
            <div className=" text-center">
              <p className=" text-[12px] font-light text-white">
                Review Players
              </p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.players_under_reviewed}
              </p>
            </div>
          </div>

          <div className="bg-[#1B8550] rounded-lg flex items-center justify-center gap-5 lg:py-2">
            <div>
              <PiNotePencilFill className="text-4xl  text-gray-500" />
            </div>
            <div className=" text-center">
              <p className=" text-[12px] font-light text-white">
                Active Negotiation
              </p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.players_under_reviewed}
              </p>
            </div>
          </div>

          <div className="bg-[#1B5285] rounded-lg flex items-center justify-center gap-5 lg:py-2">
            <div>
              <BiSolidVolumeLow className="text-4xl  text-gray-500" />
            </div>
            <div className=" text-center">
              <p className=" text-[12px] font-light text-white">Active Ads</p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.players_under_reviewed}
              </p>
            </div>
          </div>

          <div className="bg-[#1B8550] rounded-lg flex items-center justify-center gap-5 lg:py-2">
            <div>
              <PiHandshakeBold className="text-4xl  text-gray-500" />
            </div>
            <div className=" text-center">
              <p className=" text-[12px] font-light text-white">
                Closed Negotiation
              </p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.closed_negotiation}
              </p>
            </div>
          </div>
        </div>

        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_TableTitleandLink">
            <p className="AdminDashboard_Dashboardtext">Active Negotiation</p>
            <Link
              to="/admin/negotiations"
              className="AdminDashBoard_LinkViewall"
            >
              View All
            </Link>
          </div>
          <div className="AdminPage_TableInfo">
            <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
            <span className="AdminPage_TableInfoText">
              This is a table of recent Active negotiation on this platform
            </span>
          </div>
          {last5Object_Admin_dashboard_active_negotiations?.length === 0 ? (
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
            <div className="max-w-full overflow-x-auto ">
              <AdminUseTable
                header={header}
                data={last5Object_Admin_dashboard_active_negotiations}
              />
            </div>
          )}
        </div>

        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_TableTitleandLink">
            <p className="AdminDashboard_Dashboardtext">Approve Players</p>
            <Link to="/admin/players" className="AdminDashBoard_LinkViewall">
              View All
            </Link>
          </div>
          <div className="AdminPage_TableInfo">
            <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
            <span className="AdminPage_TableInfoText">
              This is a table of pending players application waiting for
              approval on the platform
            </span>
          </div>

          {last5Object_Admin_dashboard_approved_player?.length === 0 ? (
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
            <div className="max-w-full overflow-x-auto ">
              <AdminUseTable
                header={Playerheader}
                data={last5Object_Admin_dashboard_approved_player}
              />
            </div>
          )}
        </div>

        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_TableTitleandLink">
            <p className="AdminDashboard_Dashboardtext">Transaction</p>
            <Link to="/admin/finance" className="AdminDashBoard_LinkViewall">
              View All
            </Link>
          </div>
          <div className="AdminPage_TableInfo">
            <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
            <span className="AdminPage_TableInfoText">
              Recent transaction made on the platform
            </span>
          </div>
          {last5Object_Transaction_list?.length === 0 ? (
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
            <div className="max-w-full overflow-x-auto ">
              <AdminUseTable
                header={Transactionheader}
                data={Transaction_list?.slice(-5)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
