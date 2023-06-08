import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import { useDispatch, useSelector } from "react-redux";

import { Admin_FanData__fun } from "../../../Slice/Admin/Admin_FanData_Slice";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import FanSuspended from "./FanComponent/FanSuspended";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Admin_Fans = ({}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const handleAllNegotiate = () => {
    setStep(1);
  };

  const handleSuspended = () => {
    setStep(2);
  };

  const { Admin_Fan } = useSelector(
    (state) => state.reducer.Admin_FanData_Slice
  );

  console.log(Admin_Fan);

  const header = [
    {
      id: 1,
      name: "Scout",
      case: "Admin_fan_scout",
    },
    {
      id: 2,
      name: "Acitive Negotiate",
      case: "Admin_fan_Acitive_Negotiate",
    },
    {
      id: 3,
      name: "CLosed Negotiate",
      case: "Admin_fan_Closed_Negotiate",
    },

    {
      id: 4,
      name: "",

      case: "Admin_fan_Suspend_message_view",
    },
  ];

  const Suspendheader = [
    {
      id: 1,
      name: "Scout",
      case: "Admin_fan_scout_suspend",
    },

    {
      id: 2,
      name: "",
      case: "Admin_fan_Suspend_message_view_suspend_header",
    },
  ];

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch(Admin_FanData__fun());
    return () => {};
  }, []);

  const handleSuspend_Unsuspend = async (data) => {
    let API_URL = `${baseURL}admin/fans/suspend`;

    const tokengot = localStorage.getItem("token");

    try {
      // Set the loading state to true before sending the request
      console.log("Sending POST request...");
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      const response = await axios.post(
        API_URL,
        {
          user_id: data,
        },
        config
      );

      // Reset the loading state to false after receiving the response
      setLoading(false);
      console.log("POST request successful");
      console.log("Response:", response.data.message);

      toast.success(`${response.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      // Reset the loading state to false in case of an error
      setLoading(false);
      console.error("Error:", error.message);

      toast.error(`${error.message}`, {
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
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scout_email, setScout_email] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (data) => {
    console.log(data);
    setIsModalOpen(true);
    setScout_email(data);
  };

  const handleDelete = (data) => {
    handleSuspend_Unsuspend(data?.user?.id);
  };

  return (
    <>
      <ToastContainer />

      {/* {isModalOpen && (
        <Fan_message_modal
          scout_email={scout_email}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )} */}

      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            <div className="AdminPage_NegotiateTab">
              <div className="AdminPage_NegotiateTabTitle">
                <p
                  onClick={handleAllNegotiate}
                  className={`${
                    step === 1
                      ? "AdminPAge_Negotiate_TabNegotiateActive"
                      : "AdminPAge_Negotiate_TabNegotiateInactive"
                  }`}
                >
                  All Fans
                </p>
                {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleClosed}>Review <span className='AdminPage_NegotiateTab_TabNumber'>4</span></p> */}
                <p
                  className={`${
                    step === 2
                      ? "AdminPAge_Negotiate_TabNegotiateActive"
                      : "AdminPAge_Negotiate_TabNegotiateInactive"
                  }`}
                  onClick={handleSuspended}
                >
                  Suspended
                </p>
                {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p> */}
              </div>

              {step === 1 && (
                <>
                  <div className="AdminPage_TableInfo">
                    <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                    <span className="AdminPage_TableInfoText">
                      This is a table of recent communication on the platform
                    </span>
                  </div>

                  <div className="AdminTable_NegotiateTable">
                    {Admin_Fan?.AllFan_data?.length === 0 ? (
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
                        data={Admin_Fan?.AllFan_data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="AdminPage_TableInfo">
                    <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                    <span className="AdminPage_TableInfoText">
                      This is a table of recent communication on the platform
                    </span>
                  </div>
                  {/* <FanSuspended /> */}
                  <div className="AdminTable_NegotiateTable">
                    {Admin_Fan?.suspendedFan_data?.data?.length === 0 ? (
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
                      <FanSuspended />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Fans;
