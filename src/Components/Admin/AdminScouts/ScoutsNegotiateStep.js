import React, { useEffect, useState } from "react";

import Lottie from "lottie-react";
import AdminUseTable from "../../Table/AdminUseTable";

import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import { useDispatch, useSelector } from "react-redux";
import { Single_Scout_Negotiations_Detail_fun } from "../../../Slice/Admin/Admin_Scouts_Slice";
import { useParams } from "react-router-dom";

function ScoutsNegotiateStep() {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    dispatch(Single_Scout_Negotiations_Detail_fun(id));

    return () => {};
  }, []);

  const { Admin_Get_ScoutsDetails, Single_Scout_Negotiations_Detail } =
    useSelector((state) => state.reducer.Admin_Scouts_Slice);
  const [step, setStep] = useState(1);

  console.log(Single_Scout_Negotiations_Detail);

  let active_negotiations_data =
    Single_Scout_Negotiations_Detail?.active_negotiations_data?.data;
  let close_negotiations_data =
    Single_Scout_Negotiations_Detail?.close_negotiations_data?.data;

  let suspended_negotiations_data =
    Single_Scout_Negotiations_Detail?.suspended_negotiations_data?.data;

  let terminated_negotiations_data =
    Single_Scout_Negotiations_Detail?.terminated_negotiations_data?.data;

  console.log(suspended_negotiations_data);
  console.log(terminated_negotiations_data);
  // console.log(close_negotiations_data);

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

  const header = [
    {
      id: 1,
      name: "Deal name",
    },
    {
      id: 2,
      name: "Scout",
    },
    {
      id: 3,
      name: "Initial Offer",
    },
    {
      id: 4,
      name: "Current Offer",
    },
    {
      id: 5,
      name: "Payment",
    },
    {
      id: 6,
      name: "Active Negotiaties",
    },
  ];

  const dataTable = [
    {
      id: 1,
      dealname: "5 Season Deal",
      imgRecip: imgRecipient,
      scoutname: "David Dada",
      InitialOffer: "$12,000",
      CurrentOffer: "$15,000",
      surname: "Not paid",
      chat: ChatCircle,
      number: "8",
    },
  ];

  return (
    <div className="AdminPage_NegotiateTab bg-white px-5 py-5">
      <div className="AdminPage_NegotiateTabTitle">
        <p
          onClick={handleAllNegotiate}
          className={`${
            step === 1
              ? "AdminPAge_Negotiate_TabNegotiateActive"
              : "AdminPAge_Negotiate_TabNegotiateInactive"
          }`}
        >
          All Negotiate
        </p>
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
        <p
          className={`${
            step === 3
              ? "AdminPAge_Negotiate_TabNegotiateActive"
              : "AdminPAge_Negotiate_TabNegotiateInactive"
          }`}
          onClick={handleClosed}
        >
          Closed <span className="AdminPage_NegotiateTab_TabNumber">10k</span>
        </p>
        <p
          className={`${
            step === 4
              ? "AdminPAge_Negotiate_TabNegotiateActive"
              : "AdminPAge_Negotiate_TabNegotiateInactive"
          }`}
          onClick={handleTerminated}
        >
          Terminated
        </p>
      </div>

      {step === 1 && (
        <div className="AdminTable_NegotiateTable">
          {active_negotiations_data?.length === 0 ? (
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
            <AdminUseTable header={header} data={active_negotiations_data} />
          )}
        </div>
      )}

      {step === 2 && (
        <div className="AdminTable_NegotiateTable">
          {suspended_negotiations_data?.length === 0 ? (
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
            <AdminUseTable header={header} data={suspended_negotiations_data} />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="AdminTable_NegotiateTable">
          {close_negotiations_data?.length === 0 ? (
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
            <AdminUseTable header={header} data={close_negotiations_data} />
          )}
        </div>
      )}

      {step === 4 && (
        <div className="AdminTable_NegotiateTable">
          {terminated_negotiations_data?.length === 0 ? (
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
              data={terminated_negotiations_data}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ScoutsNegotiateStep;
