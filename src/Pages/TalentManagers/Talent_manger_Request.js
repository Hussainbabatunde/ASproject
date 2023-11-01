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

import UseTable from "../../Components/Table/UseTable";
import { UserLogout } from "../../Components/Player/UserLogOut";
import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import {
  Talent_manager_Deals_fun,
  Talent_manager_requested_players_fun,
  reset_Talent_manager_Deals,
} from "../../Slice/Talent_Manager/Talent_manager_slice";

const Talent_manger_Request = () => {
  const { Talent_manager_requested_players } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  console.log({ Talent_manager_requested_players });

  const dispatch = useDispatch();

  const data = [
    { id: 1, pathTo: "/afrisport/scout/profile", pathName: "Profile" },
    { id: 2, pathTo: "/afrisport/scout/deal", pathName: "Deals" },
  ];

  console.log(Talent_manager_requested_players);

  const header = [
    {
      id: 1,
      name: "Player Names",
      case: "talent_players_name",
    },
    {
      id: 2,
      name: "Position",
      case: "talent_player_Position_Request",
    },
    {
      id: 3,
      name: "Club",
      case: "talent_player_Club_Request",
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
    dispatch(Talent_manager_requested_players_fun());
    return () => {
      dispatch(reset_Talent_manager_Deals());
    };
  }, []);

  return (
    <>
      <div className="Scoutpage_maxWidthContainer">
        <div className="Scoutpage_contents ">
          <Talent_Header />

          <div className="Scoutpage_DealContent">
            {Talent_manager_requested_players?.data?.length === 0 ? (
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
              <UseTable
                header={header}
                data={Talent_manager_requested_players?.data}
              />
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
      </div>
    </>
  );
};

export default Talent_manger_Request;
