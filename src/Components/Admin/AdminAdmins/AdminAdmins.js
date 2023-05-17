import React from "react";
import "./AdminAdmins.css";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import AdminUseTable from "../../Table/AdminUseTable";

const AdminAdmins = () => {
  const header = [
    {
      id: 1,
      name: "Admin name",
    },
    {
      id: 2,
      name: "Email",
    },
    {
      id: 3,
      name: "Phone number",
    },
    {
      id: 4,
      name: "Role",
    },
    // {
    //   id: 5,
    //   name: "EditResetPasswordEnableDisable",
    // },
  ];

  const dataTable = [
    {
      id: 1,
      imgRecip: imgRecipient,
      scoutname: "Jerry Oloti",
      email: "tunde@mail.com",
      phoneNumber: "12345678",
      role: "manager",
      enable: "enable",
    },
    {
      id: 2,
      imgRecip: imgRecipient,
      scoutname: "Jerry Oloti",
      email: "tunde@mail.com",
      phoneNumber: "12345678",
      role: "manager",
      enable: "Disable",
    },
  ];

  const handleEdit = () => {};
  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <button className="Adminpage_CreateAdmins">Create Admin</button>

          <div className="AdminPage_TableTitleandLink">
            <p className="AdminPage_NegotiateTitleText">Admins</p>
            <div className="AdminDashboard_Search">
              <input
                type="text"
                placeholder="Search name"
                className="AdminDashboard_SearchInput"
              />
              <RiSearchLine className="AdminDashboard_SearchIcon" />
            </div>
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
              // <AdminUseTable
              //   header={header}
              //   data={dataTable}
              //   handleEdit={handleEdit}
              // />

              <>sam</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdmins;
