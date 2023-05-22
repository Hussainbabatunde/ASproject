import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import { useDispatch, useSelector } from "react-redux";

import Scout_message_modal from "../../Scout/Scout_message_modal";
import { Admin_FanData__fun } from "../../../Slice/Admin/Admin_FanData_Slice";

const Admin_Fans = ({}) => {
  const dispatch = useDispatch();

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
      name: "   ",

      case: "Admin_fan_Suspend_message_view",
    },
  ];

  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  const dataTable = [
    {
      id: 1,
      dealname: "5 Season Deal",
      InitialOffer: "$12,000",
      CurrentOffer: "$15,000",
      surname: "Not paid",

      imgRecip: imgRecipient,
      scoutname: "David Dada",
      chat: ChatCircle,
      number: "8",
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

  return (
    <>
      {isModalOpen && (
        <Scout_message_modal
          scout_email={scout_email}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

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
                    {Admin_Fan?.length === 0 ? (
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
                        data={Admin_Fan}
                        handleEdit={handleEdit}
                      />
                    )}
                  </div>
                </>
              )}

              {/* 
           

              {step === 2 && (
                <>
                  <div className="AdminPage_TableInfo">
                    <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                    <span className="AdminPage_TableInfoText">
                      This is a table of recent communication on the platform
                    </span>
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
                        data={Admin_Get_All_Scouts}
                        handleEdit={handleEdit}
                      />
                    )}
                  </div>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Fans;
