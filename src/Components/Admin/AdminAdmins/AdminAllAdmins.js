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
  Update_permission___Admin_fun,
  get_All_Admin_fun,
  reset_Create__Admin_options,
} from "../../../Slice/Admin/AdminAllAdmins/AdminUserSlice";
import { useDispatch, useSelector } from "react-redux";
import cancle_icon from "../../../assets/cancel_icon.png";
import { ToastContainer } from "react-toastify";
import { get_All_Role_fun } from "../../../Slice/Admin/AdminAllAdmins/RoleSlice";

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

  const { GetRole, Role_isSuccess, createRole_isSuccess } = useSelector(
    (state) => state?.reducer?.RoleSlice
  );

  const [modal, setModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredData = get_All_Admin?.data;

  const header = [
    {
      id: 1,
      name: "Admin Name",
      case: "Admin_Name",
    },
    {
      id: 2,
      name: "Admin Email",
      case: "Admin_email",
    },
    {
      id: 3,
      name: "Telephone ",
      case: "Admin_Phone_number",
    },

    {
      id: 4,
      name: "Admin Role",
      case: "Admin_Role",
    },

    {
      id: 5,
      name: "   ",
      case: "Admin_Edit_Delete_Asign",

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

    dispatch(get_All_Role_fun());

    // dispatch(reset_role_Create_options());
    // setFilteredData(GetRole?.data);

    // The return function is optional and is used for cleanup
    return () => {
      // No cleanup necessary in this case, so an empty function is returned
    };
  }, [Create__Admin_isSuccess]);

  const [formData, setFormData] = useState({
    role: "",
    fullname: "",
    email: "",
    phone: "",
    id: null,
  });

  const Close_form = () => {
    setModal(false);

    setModal_permission(false);

    setFormData({
      role: "",
      fullname: "",
      email: "",
      phone: "",
      id: null,
    });

    dispatch(reset_Create__Admin_options());
  };

  const handleDelete = (data) => {
    console.log(data);
    let id = data?.user?.id;

    dispatch(Delete__Admin_fun(id));
  };

  const handleEdit = (item, asign) => {
    setFormData({
      fullname: `${item.user.firstname} ${item.user.surname}  `,
      phone: item.user.phone,
      email: item.user.email,
      id: item.user.id,
      role: item.role,
    });

    setModal(true);
  };

  const [modal_permission, setModal_permission] = useState(false);
  const [permission_item, setPermission_item] = useState(null);

  const HandlePermision = (item) => {
    console.log(item);

    console.log("as");

    setModal_permission(true);
    setPermission_item(item);
  };

  const Role_modal = () => {
    const [userAdmin, setUserAdmin] = useState({
      role: formData.role,
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      id: formData.id,
    });

    useEffect(() => {
      if (Create__Admin_isSuccess) {
        setFormData({
          role: "",
          fullname: "",
          email: "",
          phone: "",
          id: null,
        });

        setModal(false);
      }

      return () => {};
    }, [Create__Admin_isSuccess]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserAdmin((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
      setFormData({
        role: userAdmin.role,
        fullname: userAdmin.fullname,
        email: userAdmin.email,
        phone: userAdmin.phone,
        id: userAdmin.id,
      });
      dispatch(Create__Admin_fun(userAdmin));
    };

    return (
      <div className="modal">
        <div className="form">
          <div className=" d-flex">
            <p className="">Create Admin </p>

            <div className="" onClick={Close_form}>
              <img src={cancle_icon} alt="" />
            </div>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor=""> Fullname</label>
                <input
                  className="form-input"
                  type="text"
                  name="fullname"
                  value={userAdmin.fullname}
                  placeholder="fullname"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="" className="block">
                  Email
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="email"
                  value={userAdmin.email}
                  placeholder="email"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="" className="block">
                  Phone
                </label>
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  value={userAdmin.phone}
                  placeholder="phone"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="" className="block">
                  Role
                </label>

                {formData?.id ? (
                  <>
                    <input className="form-input" value={userAdmin.role} />
                  </>
                ) : (
                  <select
                    name="role"
                    value={userAdmin.role}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <>
                      <option value="">Select a grade</option>
                      {GetRole?.data.map((item) => (
                        <option
                          key={item.id}
                          value={item.name}
                          className=" w-24"
                        >
                          {item.name}
                        </option>
                      ))}
                    </>
                  </select>
                )}
              </div>
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

  const Permision_modal = () => {
    const [userAdmin, setUserAdmin] = useState({
      role: formData.role,
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      id: formData.id,
    });

    // useEffect(() => {
    //   if (Create__Admin_isSuccess) {
    //     setFormData({
    //       role: "",
    //       fullname: "",
    //       email: "",
    //       phone: "",
    //       id: null,
    //     });

    //     setModal(false);
    //   }

    //   return () => {};
    // }, [Create__Admin_isSuccess]);

    const [role, setRole] = useState(permission_item?.role.id);
    const handleSubmit = (e) => {
      e.preventDefault();

      // setFormData({
      //   role: userAdmin.role,
      //   fullname: userAdmin.fullname,
      //   email: userAdmin.email,
      //   phone: userAdmin.phone,
      //   id: userAdmin.id,
      // });
      let data = {
        user: parseInt(permission_item?.user?.id),
        role: parseInt(role),
      };

      setPermission_item(data);
      dispatch(Update_permission___Admin_fun(data));
    };

    return (
      <div className="modal">
        <div className="form">
          <div className=" d-flex">
            <p className="">Reassign Permission </p>

            <div className="" onClick={Close_form}>
              <img src={cancle_icon} alt="" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-5">
            <div>
              <div>
                <label htmlFor="" className="block">
                  Role
                </label>

                <select
                  name="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="form-input"
                >
                  <>
                    <option value="">Select a grade</option>
                    {GetRole?.data.map((item) => (
                      <option key={item.id} value={item.id} className=" w-24">
                        {item.name}
                      </option>
                    ))}
                  </>
                </select>
              </div>
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

            {modal_permission && <Permision_modal />}

            <button
              className="Adminpage_CreateAdmins "
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

              <h1></h1>
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
                  handleEdit={handleEdit}
                  HandlePermision={HandlePermision}
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
