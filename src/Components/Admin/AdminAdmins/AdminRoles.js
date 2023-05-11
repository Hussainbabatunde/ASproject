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
  Create_All_Role_fun,
  Delete_All_Role_fun,
  get_All_Role_fun,
  reset_role_Create_options,
  reset_role_options,
} from "../../../Slice/Admin/AdminAllAdmins/RoleSlice";

import cancle_icon from "../../../assets/cancel_icon.png";
// import CloseIcon from "@mui/icons-material/Close";

const AdminRoles = () => {
  const dispatch = useDispatch();

  let major_id;

  const { GetRole, Role_isSuccess, createRole_isSuccess } = useSelector(
    (state) => state?.reducer?.RoleSlice
  );

  const [filteredData, setFilteredData] = useState(GetRole?.data);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = GetRole?.data.filter((row) =>
      row.name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
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
    dispatch(reset_role_Create_options());

    return () => {};
  }, [createRole_isSuccess, dispatch]);
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

  const handleDelete = (data) => {
    dispatch(Delete_All_Role_fun(data));
  };
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    id: null,

    name: "",
    description: "",
  });
  const handleEdit = (data) => {
    // dispatch(Delete_All_Role_fun(data));

    const filteredArray = GetRole?.data.filter((obj) => obj.id === data);

    setFormData(filteredArray[0]);

    setModal(true);
  };

  const Close_form = () => {
    setModal(false);

    setFormData({
      id: null,
      name: "",
      description: "",
    });
  };

  const Role_modal = () => {
    const [role_data, setRole_data] = useState({
      id: formData.id,
      name: formData.name,
      description: formData.description,
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRole_data((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let data = role_data;
      setFormData(data);
      dispatch(Create_All_Role_fun(data));
    };

    return (
      <div className="modal">
        <div className="form">
          <div className=" d-flex">
            <p className="">Create Admin </p>

            {/* <CloseIcon /> */}
            <div className="" onClick={Close_form}>
              <img src={cancle_icon} alt="" />
            </div>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor=""> Name</label>

                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={role_data.name}
                  placeholder="Name"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor=""> Description</label>

                <input
                  className="form-input"
                  type="text"
                  name="description"
                  value={role_data.description}
                  placeholder="This is default admin privilege and as no privilege"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="form-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            {modal && <Role_modal />}

            <button
              className="Adminpage_CreateAdmins"
              onClick={() => setModal(true)}
            >
              Create Role
            </button>

            <div className="AdminPage_TableTitleandLink">
              <p className="AdminPage_NegotiateTitleText">Admins</p>
              <div className="AdminDashboard_Search">
                <input
                  type="text"
                  placeholder="Search name"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="AdminDashboard_SearchInput"
                />
                <RiSearchLine className="AdminDashboard_SearchIcon" />
              </div>
            </div>

            <div className="AdminTable_NegotiateTable">
              {filteredData.length === 0 ? (
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
                  data={filteredData}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoles;
