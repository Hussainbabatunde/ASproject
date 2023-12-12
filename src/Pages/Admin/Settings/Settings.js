import React, { useEffect, useState } from "react";
import "../AdminUser/AdminAdmins.css";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import {
  get_All_Admin_fun,
  reset_Create__Admin_options,
} from "../../../Slice/Admin/AdminAllAdmins/AdminUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { get_All_Role_fun } from "../../../Slice/Admin/AdminAllAdmins/RoleSlice";

import TableWithPagination from "../TableWithPagination";
import ReseAdminPassoword from "./ReseAdminPassoword";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { Settings_fun } from "../../../Slice/Admin/SettingsSlice";
import SettingsModel from "./SettingsModel";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Settings = () => {
  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

  const dispatch = useDispatch();

  const {
    get_All_Admin,

    Create__Admin_isSuccess,
  } = useSelector((state) => state?.reducer?.AdminUserSlice);

  const { GetRole, Role_isSuccess, createRole_isSuccess } = useSelector(
    (state) => state?.reducer?.RoleSlice
  );

  const { Settings } = useSelector((state) => state?.reducer?.SettingsSlice);

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
      name: "Settings Name",
      case: "Settings_Name",
    },
    {
      id: 2,
      name: "Settings Data",
      case: "Settings_Data",
    },

    {
      id: 5,
      name: "   ",
      case: "Settings_Edit",

      // name: "EditResetPasswordEnableDisable",
    },
  ];

  const settingsinfo = [
    { id: 1, name: "Percentage" },
    { id: 2, name: "Market Fee" },
    { id: 3, name: "Sorting" },
    { id: 4, name: "Weekly Advert-Fee" },
    { id: 5, name: "Monthly  Advert-Fee" },
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

  console.log({
    Settings,
  });

  const orderedSettings = [
    {
      id: 1,
      name: Settings?.percentage?.message,
      data: Settings?.percentage?.data,
    },

    { id: 2, name: Settings?.market?.message, data: Settings?.market?.data },
    { id: 3, name: "Sorting", data: Settings?.sorting.data },

    { id: 4, name: Settings?.advert?.message, data: Settings?.advert.data },
    { id: 5, name: "Monthly Advert-Fee", data: Settings?.advert_monthly },
  ];

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
    password: "",
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

        return response;
      } catch (error) {
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
    let id = data?.user?.id;
    // dispatch(Delete__Admin_fun(id));

    Create_mutation.mutate(id);
  };

  const handleEdit = (item) => {
    // setFormData({
    //   fullname: `${item.user.firstname} ${item.user.surname}  `,
    //   phone: item.user.phone,
    //   email: item.user.email,
    //   id: item.user.id,
    //   role: item.role,
    // });

    setFormData(item);

    setModal(true);
  };

  const [resteModal, setResteModal] = useState(false);

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

  useEffect(() => {
    dispatch(Settings_fun());

    return () => {};
  }, [dispatch]);

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
            {/* {logindata?.data?.user_type === "super-admin" && ( */}
            <>
              {modal && (
                <SettingsModel
                  Create__Admin_isSuccess={Create__Admin_isSuccess}
                  setFormData={setFormData}
                  formData={formData}
                  setModal={setModal}
                />
              )}
            </>
            {/* )} */}

            <div className="AdminPage_TableTitleandLink">
              <p className="AdminPage_NegotiateTitleText">Admins Settings</p>

              {/* <div className="AdminDashboard_Search">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="AdminDashboard_SearchInput"
                  placeholder="Search name"
                />
                <RiSearchLine className="AdminDashboard_SearchIcon" />
              </div> */}
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
                  data={orderedSettings}
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

export default Settings;
