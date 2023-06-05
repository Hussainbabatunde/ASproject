import React, { useState } from "react";

import Talent_Header from "../../Components/TalentManagersCompnente/Talent_Header";
import UseTable from "../../Components/Table/UseTable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Lottie from "lottie-react";
import empty from "../../assets/lottie/emptyState.json";
import football from "../../assets/lottie/92356-football.json";
import { Link, useNavigate } from "react-router-dom";

function Talent_manager_palyer() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const header = [
    {
      id: 1,
      name: "Deal name",
    },
    {
      id: 2,
      name: "Sender",
    },
    {
      id: 3,
      name: "Details",
    },
    {
      id: 4,
      name: "Amount",
    },
    {
      id: 5,
      name: "Payment",
    },
    {
      id: 6,
      name: "Status",
    },
    {
      id: 8,
      name: "AcceptDeclineOffer",
    },
    {
      id: 7,
      name: "",
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
  return (
    <div className="Scoutpage_contents debug">
      <Talent_Header />
      <div className="Scoutpage_DealContent">
        <div className="Scoutpage_DealContent">
          <div>
            <div className="my-2">
              <button
                className="bg-[#0F7BEF] font-bold text-base text-white rounded px-2 py-1 mr-3 cursor-pointer"
                to="/afrisport/talent-manager/add-players"
                onClick={() =>
                  navigate("/afrisport/talent-manager/add-players")
                }
              >
                Add Player
              </button>
              <button className="bg-[#0F7BEF] font-bold text-base text-white rounded px-2 py-1 mr-3 cursor-pointer">
                Create Player
              </button>
            </div>
          </div>
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
            <UseTable header={header} data={dataTable} />
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
  );
}
export default Talent_manager_palyer;
