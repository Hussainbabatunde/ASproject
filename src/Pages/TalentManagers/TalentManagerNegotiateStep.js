import React, { useEffect, useState } from "react";

import Lottie from "lottie-react";

import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import { Admin_talent_get_negotiations_fun } from "../../../Slice/Admin/AdminTalentMangerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TalentManagerNegotiateStep() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [step, setStep] = useState(1);
  const { Admin_talent_manager_single, Admin_talent_manager_negotiation } =
    useSelector((state) => state.reducer.AdminTalentMangerSlice);

  useEffect(() => {
    dispatch(Admin_talent_get_negotiations_fun(id));

    return () => {};
  }, []);

  console.log(Admin_talent_manager_negotiation);
  console.log(
    Admin_talent_manager_negotiation?.Admin__Talent__Active_Negotiations
  );

  console.log(
    Admin_talent_manager_negotiation?.Admin__Talent__Active_Negotiations?.data
      ?.data
  );

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
          className={`${
            step === 1
              ? "AdminPAge_Negotiate_TabNegotiateActive"
              : "AdminPAge_Negotiate_TabNegotiateInactive"
          }`}
          onClick={handleAllNegotiate}
        >
          All Negotiations
        </p>
        <p
          onClick={handleSuspended}
          className={`${
            step === 2
              ? "AdminPAge_Negotiate_TabNegotiateActive"
              : "AdminPAge_Negotiate_TabNegotiateInactive"
          }`}
        >
          Negotiate
        </p>

        <p
          onClick={handleClosed}
          className={`${
            step === 3
              ? "AdminPAge_Negotiate_TabNegotiateActive"
              : "AdminPAge_Negotiate_TabNegotiateInactive"
          }`}
        >
          Closed <span className="AdminPage_NegotiateTab_TabNumber">10k</span>
        </p>
      </div>

      {step === 1 && (
        <div className="AdminTable_NegotiateTable">
          {Admin_talent_manager_negotiation?.Admin__Talent__Active_Negotiations
            ?.data?.data?.length === 0 ? (
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
              data={
                Admin_talent_manager_negotiation
                  ?.Admin__Talent__Active_Negotiations?.data?.data
              }
            />
          )}
        </div>
      )}

      {step === 2 && (
        <div className="AdminTable_NegotiateTable">
          {Admin_talent_manager_negotiation?.Admin__Talent__Active_Negotiations
            ?.data?.data?.length === 0 ? (
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
              data={
                Admin_talent_manager_negotiation
                  ?.Admin__Talent__Active_Negotiations?.data?.data
              }
            />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="AdminTable_NegotiateTable">
          {Admin_talent_manager_negotiation?.Admin__Talent__Active_Negotiations
            ?.data?.data?.length === 0 ? (
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
              data={
                Admin_talent_manager_negotiation
                  ?.Admin__Talent__Active_Negotiations?.data?.data
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TalentManagerNegotiateStep;
