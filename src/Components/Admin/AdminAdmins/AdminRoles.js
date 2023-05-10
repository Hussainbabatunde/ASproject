import React, { useEffect, useState } from "react";
import "./AdminAdmins.css";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import AdminUseTable from "../../Table/AdminUseTable";
import { useDispatch, useSelector } from "react-redux";
import {
  get_All_Role_fun,
  reset_role_options,
} from "../../../Slice/Admin/AdminAllAdmins/RoleSlice";

const AdminRoles = () => {
  const dispatch = useDispatch();

  const { GetRole } = useSelector((state) => state?.reducer?.RoleSlice);

  // console.log(userId);
  // console.log(userId);

  const header = [
    {
      id: 1,
      name: "Roles",
    },
    {
      id: 2,
      name: "Description",
    },

    {
      id: 3,
      name: "EditDeleteRoles",
    },
  ];

  useEffect(() => {
    dispatch(get_All_Role_fun());
    dispatch(reset_role_options());

    return () => {};
  }, []);
  // Role_isSuccess
  const dataTable = [
    {
      id: 1,
      imgRecip: imgRecipient,
      scoutname: "Oloti",
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

  const Role_modal = () => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      // onClose();
    };
    return (
      <div className="modal">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Enter your details</h2>
          <div>
            <div>
              <label htmlFor=""> Name</label>

              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor=""> Description</label>

              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button className="form-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            <Role_modal />

            <button className="Adminpage_CreateAdmins">Create Role</button>

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
              {GetRole?.data?.length === 0 ? (
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
                <AdminUseTable header={header} data={GetRole?.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoles;
