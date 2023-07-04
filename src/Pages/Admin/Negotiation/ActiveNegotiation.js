import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import AdminCreateNegotiation from "../../../Components/Admin/AdminNegotiate/AdminCreateNegotiation";
import {
  Admin__Active_Negotiations_fun,
  Admin___Negotiations_fun,
} from "../../../Slice/Admin/Admin_NegotiationsSlice";
import { useDispatch, useSelector } from "react-redux";
import TableWithPagination from "../TableWithPagination";

const ActiveNegotiation = ({}) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const handleAllNegotiate = () => {
    setStep(1);
  };

  const handleSuspended = () => {
    setStep(2);
  };

  const handleClosed = () => {
    setStep(3);
  };

  const handleTerminated = () => {
    setStep(4);
  };

  const {
    Admin___Negotiations,
    Admin___Negotiations_isError,
    Admin___Negotiations_isSuccess,
    Admin___Negotiations_isLoading,
    Admin___Negotiations_message,
  } = useSelector((state) => state.reducer.Admin_NegotiationsSlice);

  const header = [
    {
      id: 1,
      name: "Deal name",
      case: "Neg_Deal_name",
    },
    {
      id: 2,
      name: "Scout",
      case: "Neg_Scout",
    },
    {
      id: 3,
      name: "Initial Offer",
      case: "Neg_Initial_Offer",
    },
    {
      id: 4,
      name: "Current Offer",
      case: "Neg_Current_Offer",
    },
    {
      id: 5,
      name: "Payments",
      case: "Neg_Payment",
    },
    {
      id: 6,
      name: "Active Negotiations",
      case: "Neg_All_Negotiaties",
    },
  ];

  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch(Admin___Negotiations_fun());

    return () => {};
  }, [Admin___Negotiations_isSuccess]);

  const [searchInput, setSearchInput] = useState("");

  const filteredUsersArray =
    Admin___Negotiations?.Admin__Active_Negotiations?.filter(
      (user) =>
        user?.comments?.active_offers?.firstname
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        user?.comments?.active_offers?.surname
          .toLowerCase()
          .includes(searchInput.toLowerCase())
    );
  console.log(filteredUsersArray);
  const filteredArray_suspend =
    Admin___Negotiations?.Admin__Suspended_Negotiations?.filter(
      (user) =>
        user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        user?.surname.toLowerCase().includes(searchInput.toLowerCase())
    );

  const filteredArray_close =
    Admin___Negotiations?.Admin__Close_Negotiations?.filter(
      (user) =>
        user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        user?.surname.toLowerCase().includes(searchInput.toLowerCase())
    );

  const filteredArray_Terminante =
    Admin___Negotiations?.Admin__Terminate_Negotiations?.filter(
      (user) =>
        user?.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        user?.surname.toLowerCase().includes(searchInput.toLowerCase())
    );
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_NegotiateTab">
            <div className="AdminPage_NegotiateTabTitle">
              <p
                className={`${
                  step === 1
                    ? "p-0  text-center w-120 border-b-2 border-blue-500 text-blue-500 text-lg font-semibold mr-20 cursor-pointer"
                    : "p-0 px-10 pb-2 text-center w-120 cursor-pointer border-b-2 border-gray-300 text-gray-700 text-lg font-semibold mr-20"
                }`}
                // className="AdminPAge_Negotiate_TabNegotiateActive"
                onClick={handleAllNegotiate}
              >
                All Negotiations
              </p>
              <p
                onClick={handleSuspended}
                className={`${
                  step === 2
                    ? "p-0  text-center w-120 border-b-2 border-blue-500 text-blue-500 text-lg font-semibold mr-20 cursor-pointer"
                    : "p-0 px-10 pb-2 text-center w-120 cursor-pointer border-b-2 border-gray-300 text-gray-700 text-lg font-semibold mr-20"
                }`}
              >
                Suspended
              </p>
              <p
                onClick={handleClosed}
                className={`${
                  step === 3
                    ? "p-0  text-center w-120 border-b-2 border-blue-500 text-blue-500 text-lg font-semibold mr-20 cursor-pointer"
                    : "p-0 px-10 pb-2 text-center w-120 cursor-pointer border-b-2 border-gray-300 text-gray-700 text-lg font-semibold mr-20"
                }`}
              >
                Closed{" "}
                <span className="AdminPage_NegotiateTab_TabNumber">
                  {Admin___Negotiations?.Admin__Close_Negotiations?.length}
                </span>
              </p>
              <p
                className={`${
                  step === 4
                    ? "p-0  text-center w-120 border-b-2 border-blue-500 text-blue-500 text-lg font-semibold mr-20 cursor-pointer"
                    : "p-0 px-10 pb-2 text-center w-120 cursor-pointer border-b-2 border-gray-300 text-gray-700 text-lg font-semibold mr-20"
                }`}
                onClick={handleTerminated}
              >
                Terminated
              </p>
            </div>

            {step === 1 && (
              <>
                <p className="AdminPage_NegotiateTitleText">
                  Active Negotiations
                </p>
                <div className="AdminPage_TableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of recent communication on the platform
                  </span>
                </div>
                <div className="AdminPage_TableTitleandLink">
                  {/* <button
                    className="AdminPage_NegotiateCreateButton"
                    onClick={handleShow}
                  >
                    Create Negotiate
                  </button> */}
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
                  {Admin___Negotiations?.Admin__Active_Negotiations.length ===
                  0 ? (
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
                    //   data={Admin___Negotiations?.Admin__Active_Negotiations}
                    // />

                    <TableWithPagination
                      header={header}
                      data={filteredUsersArray}
                    />
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="AdminPage_NegotiateTitleText">Suspended</p>
                <div className="AdminPage_SuspendedTableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of Suspended negotiations on the platform
                  </span>
                </div>

                <div className="AdminTable_NegotiateTable">
                  {Admin___Negotiations?.Admin__Suspended_Negotiations
                    ?.length === 0 ? (
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
                      data={filteredArray_suspend}
                    />
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="AdminPage_NegotiateTitleText">Closed</p>
                <div className="AdminPage_TableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of Closed Negotiations on the platform
                  </span>
                </div>
                <div className="AdminPage_TableTitleandLink">
                  {/* <button
                    className="AdminPage_NegotiateCreateButton"
                    onClick={handleShow}
                  >
                    Create Negotiate
                  </button> */}
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
                  {Admin___Negotiations?.Admin__Close_Negotiations?.length ===
                  0 ? (
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
                      data={filteredArray_close}
                    />
                  )}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className="AdminPage_NegotiateTitleText">Terminated</p>
                <div className="AdminPage_TerminatedTableInfo">
                  <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                  <span className="AdminPage_TableInfoText">
                    This is a table of Terminated negotiations on the platform
                  </span>
                </div>
                <div className="AdminPage_TableTitleandLink">
                  {/* <button
                    className="AdminPage_NegotiateCreateButton"
                    onClick={handleShow}
                  >
                    Create Negotiate
                  </button> */}
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
                  {Admin___Negotiations?.Admin__Terminate_Negotiations
                    ?.length === 0 ? (
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
                      data={filteredArray_Terminante}
                    />
                  )}
                </div>
              </>
            )}

            <AdminCreateNegotiation
              show={show}
              handleShow={handleShow}
              handleHide={handleHide}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveNegotiation;
