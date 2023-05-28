import React, { useEffect, useState } from "react";
import "./AdminAdmins.css";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
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
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import AdminUser_message_modal, {
  ReseAdminPassoword,
} from "./AdminUser_message_modal";
import { CircularProgress } from "@mui/material";

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

  const [resteModal, setResteModal] = useState(false);

  const handleRestpassword = (item) => {
    console.log(item);

    setResteModal(true);

    setFormData({
      fullname: `${item.user.firstname} ${item.user.surname}  `,
      phone: item.user.phone,
      email: item.user.email,
      id: item.user.id,
      role: item.role,
    });
  };

  const [modal_permission, setModal_permission] = useState(false);
  const [permission_item, setPermission_item] = useState(null);

  const AdminUser__modal = () => {
    const [userAdmin, setUserAdmin] = useState({
      role: formData.role,
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      id: formData.id,
    });

    console.log(userAdmin);

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
      <>
        {" "}
        <div className="fixed z-50 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen  px-4 ">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
            </div>
            <div className="bg-white   rounded-lg overflow-hidden w-[60%] lg:w-[40%]  shadow-xl transform transition-all ">
              <div className="border-b bord   ">
                <div className=" flex justify-between    px-7 py-3 items-center ">
                  <div>
                    <h3 className="text-[20px] font-semibold ">Create Admin</h3>
                  </div>

                  <div>
                    <button
                      className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                      onClick={() => setModal(false)}
                    >
                      X
                    </button>
                  </div>
                </div>

                <div>
                  <div className="modal-content bg-white rounded-lg shadow-lg">
                    <form className="" onSubmit={handleSubmit}>
                      <div className="p-4">
                        <div className="mb-4">
                          <label htmlFor="" className="block mb-2">
                            Fullname
                          </label>
                          <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="fullname"
                            value={userAdmin.fullname}
                            placeholder="fullname"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="" className="block mb-2">
                            Email
                          </label>
                          <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="email"
                            value={userAdmin.email}
                            placeholder="email"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="" className="block mb-2">
                            Phone
                          </label>
                          <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="tel"
                            name="phone"
                            value={userAdmin.phone}
                            placeholder="phone"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="" className="block mb-2">
                            Role
                          </label>

                          {formData?.id ? (
                            <>
                              <input
                                className="w-full p-2 border border-gray-300 rounded"
                                value={userAdmin.role}
                              />
                            </>
                          ) : (
                            <select
                              name="role"
                              value={userAdmin.role}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded"
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
                      {/* {!Create__Admin_isLoading && (
                        <button className="form-submit" type="submit">
                          Submit
                        </button>
                      )} */}

                      <div className="text-center ">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                        >
                          {Create__Admin_isLoading ? (
                            <CircularProgress style={{ color: "white" }} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <ToastContainer />

      {resteModal && (
        <ReseAdminPassoword
          formData={formData}
          setFormData={setFormData}
          modal={resteModal}
          setModal={setResteModal}
        />
      )}

      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            {/* {modal && <AdminUser__modal />} */}

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
                  handleRestpassword={handleRestpassword}
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
