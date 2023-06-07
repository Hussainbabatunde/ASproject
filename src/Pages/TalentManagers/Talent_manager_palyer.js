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
import { Talent_manager_details_Get_all_player_fun } from "../../Slice/Talent_Manager/Talent_manager_slice";
import Create_players from "./Create_players";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useMutation } from "react-query";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function Talent_manager_palyer() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { logindata } = useSelector((state) => state.reducer.LoginSlice);

  const { Talent_manager_details_Get_all_player } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  console.log(Talent_manager_details_Get_all_player);
  console.log(Talent_manager_details_Get_all_player);

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
      name: "",
      case: "Admin_fan_Suspend_message_view",
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

  const ProfileImagemutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/player/remove`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };
      console.log(formData);

      let data = {
        manager_id: logindata?.data?.user?.id,
        player_id: formData?.user_id,
      };

      // console.log(data);

      return axios.post(API_URL, data, config);
    },
    {
      onSuccess: () => {
        toast.success("Removed successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError: () => {
        toast.error("Error occurred while submitting the form.", {
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
      },
    }
  );
  const handleDelete = (data) => {
    ProfileImagemutation.mutate(data);
  };

  useEffect(() => {
    dispatch(Talent_manager_details_Get_all_player_fun());

    return () => {};
  }, []);

  return (
    <>
      {isModalOpen && (
        <Create_players
          scout_email={scout_email}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      <div className="Scoutpage_contents ">
        <Talent_Header />
        <ToastContainer />

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
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="bg-[#0F7BEF] font-bold text-base text-white rounded px-2 py-1 mr-3 cursor-pointer"
                >
                  Create Player
                </button>
              </div>
            </div>
            {Talent_manager_details_Get_all_player?.exact_manager_players__api
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
              <UseTable
                header={header}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                data={
                  Talent_manager_details_Get_all_player?.exact_manager_players__api
                }
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
export default Talent_manager_palyer;
