import React, { useEffect, useState } from "react";

import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import UseTable from "../../Components/Table/UseTable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Lottie from "lottie-react";
import empty from "../../assets/lottie/emptyState.json";
import football from "../../assets/lottie/92356-football.json";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Talent_manager_Add_player_fun,
  Talent_manager_details_Get_all_player_fun,
  reset_Get_all_players,
  reset_Talent_manager_details,
} from "../../Slice/Talent_Manager/Talent_manager_slice";
import { ToastContainer } from "react-toastify";

function Talent_Add_Player() {
  const { Talent_manager_details_Get_all_player } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Talent_manager_details_Get_all_player_fun());

    return () => {
      dispatch(reset_Get_all_players());
      dispatch(reset_Talent_manager_details());
    };
  }, []);

  const header = [
    {
      id: 1,
      name: "Player Name",
      case: "talent_players_name",
    },
    {
      id: 2,
      name: "Position",
      case: "talent_player_Position",
    },
    {
      id: 3,
      name: "Club",
      case: "talent_player_Club",
    },
    {
      id: 4,
      name: "Recent Negotiate",
      case: "talent_player_Negotiate",
    },

    {
      id: 5,
      name: "Status",

      case: "talent_player_status",
    },

    {
      id: 6,
      name: "",

      case: "talent_player_Add",
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

  const dataTable = [
    {
      id: 1,
      scoutname: "Jerry Oloti",
      email: "tunde@mail.com",
      phoneNumber: "12345678",
      role: "manager",
      enable: "enable",
    },
    {
      id: 2,
      scoutname: "Jerry Oloti",
      email: "tunde@mail.com",
      phoneNumber: "12345678",
      role: "manager",
      enable: "Disable",
    },
  ];

  const handleEdit = (data) => {
    console.log(data);
    dispatch(Talent_manager_Add_player_fun(data));
  };
  return (
    <>
      <ToastContainer />

      <div className="Scoutpage_contents debug">
        <Talent_Header />
        <div className="Scoutpage_DealContent">
          <div className="Scoutpage_DealContent">
            <div>
              <p>Player List</p>

              <input type="text" />
            </div>
            {Talent_manager_details_Get_all_player?.data?.data?.length === 0 ? (
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
                handleEdit={handleEdit}
                header={header}
                data={Talent_manager_details_Get_all_player?.data?.data}
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
}
export default Talent_Add_Player;
