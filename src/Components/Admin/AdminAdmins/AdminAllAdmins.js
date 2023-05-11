import React, { useEffect, useState } from "react";
import "./AdminAdmins.css";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import AdminUseTable from "../../Table/AdminUseTable";
import {
  Create__Admin_fun,
  Delete__Admin_fun,
  get_All_Admin_fun,
  reset_Create__Admin_options,
} from "../../../Slice/Admin/AdminAllAdmins/AdminUserSlice";
import { useDispatch, useSelector } from "react-redux";
import cancle_icon from "../../../assets/cancel_icon.png";
import { ToastContainer } from "react-toastify";

const AdminAllAdmins = () => {
  const dispatch = useDispatch();

  const {
    get_All_Admin,

    Create__Admin,
    Create__Admin_isError,
    Create__Admin_isSuccess,
    Create__Admin_isLoading,
    Create__Admin_message,
  } = useSelector((state) => state?.reducer?.AdminUserSlice);

  const [modal, setModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Use computed property to get filtered data
  const filteredData = get_All_Admin?.data.filter((row) =>
    row.firstname.toLowerCase().includes(searchQuery)
  );

  const header = [
    {
      id: 1,
      name: "Admin Name",
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
      id: 5,
      name: "EditDeleteRoles",

      // name: "EditResetPasswordEnableDisable",
    },
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

  useEffect(() => {
    // Dispatches an action to fetch all roles
    dispatch(get_All_Admin_fun());

    dispatch(reset_Create__Admin_options());
    // dispatch(reset_role_Create_options());
    // setFilteredData(GetRole?.data);

    // The return function is optional and is used for cleanup
    return () => {
      // No cleanup necessary in this case, so an empty function is returned
    };
  }, [Create__Admin_isSuccess]);

  const [formData, setFormData] = useState({
    id: null,

    firstname: "",
    surname: "",
    phone: "",
    email: "",
  });

  const Close_form = () => {
    setModal(false);

    setFormData({
      firstname: "",
      surname: "",
      phone: "",
      email: "",
    });
  };

  const handleDelete = (data) => {
    dispatch(Delete__Admin_fun(data));
  };

  const Role_modal = () => {
    const [role_data, setRole_data] = useState({
      id: formData.id,
      firstname: formData.firstname,
      surname: formData.surname,
      phone: formData.phone,
      email: formData.email,
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRole_data((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let data = role_data;
      setFormData(data);
      dispatch(Create__Admin_fun(data));

      console.log(data);
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
                <label htmlFor=""> firstname</label>

                <input
                  className="form-input"
                  type="text"
                  name="firstname"
                  value={role_data.firstname}
                  placeholder="firstname"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor=""> Surname</label>

                <input
                  className="form-input"
                  type="text"
                  name="surname"
                  value={role_data.surname}
                  placeholder="surname"
                  onChange={handleInputChange}
                />
              </div>{" "}
              <div>
                <label htmlFor=""> Phone</label>

                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  value={role_data.phone}
                  placeholder="Phone"
                  onChange={handleInputChange}
                />
              </div>{" "}
              <div>
                <label htmlFor=""> Email</label>

                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={role_data.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>{" "}
            </div>
            {!Create__Admin_isLoading && (
              <button className="form-submit" type="submit">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />

      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            {modal && <Role_modal />}

            <button
              className="Adminpage_CreateAdmins"
              onClick={() => setModal(true)}
            >
              Create Admin
            </button>

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
                <AdminUseTable
                  header={header}
                  data={filteredData}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllAdmins;
