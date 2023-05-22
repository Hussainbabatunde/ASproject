import React, { useEffect } from "react";
// import "../AdminNegotiate/AdminNegotiate.css";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { RiSearchLine } from "react-icons/ri";
// import AdminUseTable from "../../Table/AdminUseTable";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
// import imgRecipient from "../../../assets/imgRecipient.png";
// import ChatCircle from "../../../assets/ChatsCircle.png";
import { useDispatch, useSelector } from "react-redux";
import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
// import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";

const Ads = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatch = useDispatch();
  const { Admin_Get_All_Player } = useSelector(
    (state) => state.reducer.AdminUpdate_profileSlice
  );

  console.log(Admin_Get_All_Player);

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

      case: "Admin_All_Ads_View_Terminate",
    },
  ];

  const handleDelete = (data) => {
    console.log(data);
  };

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
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_NegotiateTab">
            <p className="AdminPage_NegotiateTitleText">Ads</p>
            <div className="AdminPage_TableInfo">
              <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
              <span className="AdminPage_TableInfoText">
                This is a table of recent communication on the platform
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
                  data={Admin_Get_All_Player}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
