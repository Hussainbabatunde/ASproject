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

import { CircularProgress } from "@mui/material";
import TableWithPagination from "../TableWithPagination";
import Admin_model from "./Admin_model";
import ReseAdminPassoword from "./ReseAdminPassoword";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const AdminAllAdmins = () => {
  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

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

  console.log(modal);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredData = get_All_Admin?.data;

  console.log(filteredData);

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

  console.log(logindata?.data?.user_type);

  useEffect(() => {
    // Dispatches an action to fetch all roles
    dispatch(get_All_Admin_fun());

    if (logindata?.data?.user_type === "super-admin") {
      dispatch(get_All_Role_fun());
    }

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

  const Create_mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}admin/user/delete/${data}`;

      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.delete(API_URL, config);

        console.log(response.data); // Logging the response data
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        // Success toast notification

        dispatch(get_All_Admin_fun());

        toast.success(" successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError: () => {
        // Error toast notification
        toast.error("Error occurred while submitting .", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "Forbidden403",
        });
      },
    }
  );

  const handleDelete = (data) => {
    console.log(data);
    let id = data?.user?.id;
    // dispatch(Delete__Admin_fun(id));

    Create_mutation.mutate(id);
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

  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredAdmin = filteredData?.filter((user) => {
    return (
      user?.user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user?.user?.surname.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  console.log(filteredAdmin);

  return (
    <>
      <ToastContainer />

      {logindata?.data?.user_type === "super-admin" && (
        <>
          {resteModal && (
            <ReseAdminPassoword
              formData={formData}
              setFormData={setFormData}
              modal={resteModal}
              setModal={setResteModal}
            />
          )}
        </>
      )}

      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            {logindata?.data?.user_type === "super-admin" && (
              <>
                {modal && (
                  <Admin_model
                    Create__Admin_isSuccess={Create__Admin_isSuccess}
                    setFormData={setFormData}
                    formData={formData}
                    setModal={setModal}
                  />
                )}
              </>
              // <>{modal && <AdminUser__modal />}</>
            )}

            {logindata?.data?.user_type === "super-admin" && (
              <button
                className="Adminpage_CreateAdmins "
                onClick={() => setModal(true)}
              >
                Create Admin
              </button>
            )}

            <div className="AdminPage_TableTitleandLink">
              <p className="AdminPage_NegotiateTitleText">Admins</p>

              <div className="AdminDashboard_Search">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="AdminDashboard_SearchInput"
                  placeholder="Search name"
                />
                <RiSearchLine className="AdminDashboard_SearchIcon" />
              </div>
            </div>

            <div className="AdminTable_NegotiateTable">
              {filteredAdmin?.length === 0 ? (
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
                <TableWithPagination
                  header={header}
                  data={filteredAdmin}
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
