import React, { useState } from "react";

import Lottie from "lottie-react";
import AdminUseTable from "../../Table/AdminUseTable";

import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";

function ScoutsNegotiateStep() {
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
          className="AdminPAge_Negotiate_TabNegotiateActive"
          onClick={handleAllNegotiate}
        >
          All Negotiate
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleSuspended}
        >
          Suspended
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleClosed}
        >
          Closed <span className="AdminPage_NegotiateTab_TabNumber">10k</span>
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleTerminated}
        >
          Terminated
        </p>
      </div>

      {step === 1 && (
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
            <AdminUseTable header={header} data={dataTable} />
          )}
        </div>
      )}

      {step === 2 && (
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
            <AdminUseTable header={header} data={dataTable} />
          )}
        </div>
      )}

      {step === 3 && (
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
            <AdminUseTable header={header} data={dataTable} />
          )}
        </div>
      )}

      {step === 4 && (
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
            <AdminUseTable header={header} data={dataTable} />
          )}
        </div>
      )}
    </div>
  );
}

export default ScoutsNegotiateStep;