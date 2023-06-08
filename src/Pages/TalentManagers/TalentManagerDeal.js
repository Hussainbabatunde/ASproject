import React, { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import imgRecipient from "../../assets/imgRecipient.png";
import Lottie from "lottie-react";
import empty from "../../assets/lottie/emptyState.json";
import { LogoutAuth } from "../../Slice/auth/Login";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import football from "../../assets/lottie/92356-football.json";
import { useDispatch, useSelector } from "react-redux";
import { PlayerDealsApi } from "../../Slice/Player/PlayerDeal/PlayerDealSlice";
import { reset as resetPlayerProfileSlice } from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import { reset as resetGetAllPlayerDealSlice } from "../../Slice/Player/PlayerDeal/PlayerDealSlice";

import { ScoutDealsApi } from "../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice";
import ScoutHeader from "../../Components/Header/ScoutHeader";
import UseTable from "../../Components/Table/UseTable";
import { UserLogout } from "../../Components/Player/UserLogOut";
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import {
  Talent_manager_Deals_fun,
  reset_Talent_manager_Deals,
} from "../../Slice/Talent_Manager/Talent_manager_slice";

const TalentManagerDeal = () => {
  const { Talent_manager_Deals } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  const dispatch = useDispatch();

  const data = [
    { id: 1, pathTo: "/afrisport/scout/profile", pathName: "Profile" },
    { id: 2, pathTo: "/afrisport/scout/deal", pathName: "Deals" },
  ];

  const header = [
    {
      id: 1,
      name: "Deal name",
      case: "talent_Deal_name",
    },
    {
      id: 2,
      name: "Sender",
      case: "talent_DealSender",
    },
    {
      id: 3,
      name: "Details",
      case: "talent_DealDetails",
    },
    {
      id: 4,
      name: "Amount",
      case: "talent_DealAmount",
    },
    {
      id: 5,
      name: "Payment",
      case: "talent_DealPayment",
    },
    {
      id: 6,
      name: "Status",
      case: "talent_DealStatus",
    },
    {
      id: 8,
      name: "AcceptDeclineOffer",
      case: "Talent_AcceptDeclineOffer",
    },
    {
      id: 7,
      name: "",
      case: "Talent_deal_Details",
    },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 210,
    p: 4,
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(Talent_manager_Deals_fun());
    return () => {
      dispatch(reset_Talent_manager_Deals());
    };
  }, []);

  return (
    <>
      <div className="Scoutpage_contents ">
        <Talent_Header />

        <div className="Scoutpage_DealContent">
          {Talent_manager_Deals?.data?.length === 0 ? (
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
            <UseTable header={header} data={Talent_manager_Deals?.data} />
          )}
        </div>
        <Modal
          open={show}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Lottie
              style={{ width: "200px", height: "200px" }}
              animationData={football}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default TalentManagerDeal;
