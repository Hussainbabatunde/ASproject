import React, { useEffect } from "react";
import "./AdminDashBoard.css";
import { RiSearchLine } from "react-icons/ri";
import people from "../../assets/UsersThree.png";
import document from "../../assets/document.png";
import volume from "../../assets/volume.png";
import vector from "../../assets/Vector.png";
import AdminHeader from "../../Components/Header/AdminHeader";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import UseTable from "../../Components/Table/UseTable";
import Lottie from "lottie-react";
import empty from "../../assets/lottie/emptyState.json";
import imgRecipient from "../../assets/imgRecipient.png";
import ChatCircle from "../../assets/ChatsCircle.png";
import AdminUseTable from "../../Components/Table/AdminUseTable";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Active_Negotiations_fun,
  Admin_Header_Summary_fun,
  Admin_dashboard_active_negotiations_fun,
  Admin_dashboard_approved_player_fun,
  Players_Under_Review_fun,
  reset__dashbord,
} from "../../Slice/Admin/AdminDashboardSlice";
import { BsDisplay } from "react-icons/bs";
import { Transaction_list_fun } from "../../Slice/Admin/TransactionSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { Transaction_total_amount, Transaction_list } = useSelector(
    (state) => state.reducer.TransactionSlice
  );

  console.log(Transaction_list);

  let data = [1, 2, 3, 4];

  useEffect(() => {
    dispatch(Admin_Header_Summary_fun());
    dispatch(Admin_dashboard_approved_player_fun());
    dispatch(Admin_dashboard_active_negotiations_fun());
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(Transaction_list_fun());

    return () => {};
  }, []);

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

  console.log(last5Object_Transaction_list);

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
    },
    {
      id: 2,
      name: "Position",
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

  const dataTable = [
    {
      id: 1,
      dealname: "5 Season Deal",
      imgRecip: imgRecipient,
      scoutname: "David Dada",
      InitialOffer: "$12,000",
      CurrentOffer: "$15,000",
      surname: "Not paid",
      chat: ChatCircle,
      number: "8",
    },
  ];

  let dashBoard = [
    {
      id: 1,
      name: "Review Players",
      case: Admin_Header_Summary?.data?.players_under_reviewed,
      icon: people,
      color: "#1B5285",
    },
    {
      id: 2,
      name: "Active Negotiation",
      case: Admin_Header_Summary?.data?.players_under_reviewed,
      icon: document,
      color: "#1B8550",
    },
    {
      id: 3,
      name: "Active Ads",
      case: Admin_Header_Summary?.data?.players_under_reviewed,
      icon: volume,
      color: "#1B5285",
    },

    {
      id: 4,
      name: "Closed Negotiation",
      case: Admin_Header_Summary?.data?.closed_negotiation,
      icon: vector,
      color: "#1B8550",
    },
  ];

  return (
    <div className="">
      {/* <AdminHeader /> */}
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
        <div className="flex  flex-wrap  justify-between">
          <div
            className={`lg:py-1 lg:px-1 bg-[#1B5285] rounded-lg flex justify-center gap-2 items-center  xl:w-[260px]  2xl:w-[285px]`}
          >
            <div>
              <img src={people} />
            </div>
            <div className="text-center">
              <p className=" text-lg text-white">Review Players</p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.players_under_reviewed}
              </p>
            </div>
          </div>

          <div
            className={`lg:py-1 lg:px-1 bg-[#1B8550] rounded-lg flex justify-center gap-2 items-center  xl:w-[260px]  2xl:w-[285px]`}
          >
            <div>
              <img src={document} />
            </div>
            <div className="text-center">
              <p className=" text-lg text-white">Active Negotiation</p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.players_under_reviewed}
              </p>
            </div>
          </div>

          <div
            className={`lg:py-1 lg:px-1 bg-[#1B5285] rounded-lg flex justify-center gap-2 items-center  xl:w-[260px]  2xl:w-[285px]`}
          >
            <div>
              <img src={volume} />
            </div>
            <div className="text-center">
              <p className=" text-lg text-white">Active Ads</p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.players_under_reviewed}
              </p>
            </div>
          </div>

          <div
            className={`lg:py-1 lg:px-1 bg-[#1B8550] rounded-lg flex justify-center gap-2 items-center  xl:w-[260px]  2xl:w-[285px]`}
          >
            <div>
              <img src={vector} />
            </div>
            <div className="text-center">
              <p className=" text-lg text-white">Closed Negotiation</p>
              <p className=" text-lg text-white">
                {Admin_Header_Summary?.data?.closed_negotiation}
              </p>
            </div>
          </div>
        </div>
        {/* this is for test */}

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
          {console.log(last5Object_Admin_dashboard_active_negotiations)}
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
            <AdminUseTable
              header={header}
              data={last5Object_Admin_dashboard_active_negotiations}
            />
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
            <AdminUseTable
              header={Playerheader}
              data={last5Object_Admin_dashboard_approved_player}
            />
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
            <AdminUseTable
              header={Transactionheader}
              data={last5Object_Transaction_list}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
