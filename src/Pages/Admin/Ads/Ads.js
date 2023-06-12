import React, { useEffect } from "react";

import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";

import { useDispatch, useSelector } from "react-redux";
import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import { Admin_Ads_fun } from "../../../Slice/Admin/Admin_AdsSlice";
// import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";

const Ads = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatch = useDispatch();
  const { Admin_Ads } = useSelector((state) => state.reducer.Admin_AdsSlice);

  console.log(Admin_Ads);

  useEffect(() => {
    dispatch(Admin_Get_ALLPlayers_fun());

    return () => {};
  }, []);

  const header = [
    {
      id: 1,
      name: "Player Name",
    },
    {
      id: 2,
      name: "Amount",
      case: "Admin_ads_Amount",
    },
    {
      id: 3,
      name: "Duration",
      case: "Admin_ads_Duration",
    },
    {
      id: 4,
      name: "Reach",
      case: "Admin_ads_reach",
    },
    {
      id: 5,
      name: "  ",

      case: "Admin_All_Ads_View",
    },
  ];

  const handleDelete = (data) => {
    console.log(data);
  };

  useEffect(() => {
    dispatch(Admin_Ads_fun());
    return () => {};
  }, []);

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
              {Admin_Ads?.length === 0 ? (
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
                  data={Admin_Ads}
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
