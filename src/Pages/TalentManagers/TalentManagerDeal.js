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
import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { RiSearchLine } from "react-icons/ri";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const TalentManagerDeal = () => {
  const { Talent_manager_Deals } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  const userType = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata
  );

  const dispatch = useDispatch();

  const header = [
    {
      id: 1,
      name: "Deal name",
      case: "talent_Deal_name",
    },

    {
      id: 2,
      name: "Player",
      case: "talent_DealPlayer",
    },
    {
      id: 3,
      name: "Sender",
      case: "talent_DealSender",
    },
    {
      id: 4,
      name: "Details",
      case: "talent_DealDetails",
    },
    {
      id: 5,
      name: "Amount",
      case: "talent_DealAmount",
    },
    {
      id: 6,
      name: "Payment",
      case: "talent_DealPayment",
    },
    {
      id: 7,
      name: "Status",
      case: "talent_DealStatus",
    },
    {
      id: 8,
      name: "AcceptDeclineOffer",
      case: "Talent_AcceptDeclineOffer",
    },
    {
      id: 9,
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

  const Accepted_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/offer/accept`;
      const tokengot = localStorage.getItem("token");
      // let request = data?.requests?.request?.id;
      // let sender = data?.requests?.sender?.id;

      console.log({ yy: data });
      let data_item = {
        offer_id: data?.offer?.deal?.offerId,
        user_id: data?.offer?.deal?.id,
      };
      console.log({ zz: data_item });

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.post(API_URL, data_item, config);
        console.log(response.data); // Logging the response data
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        dispatch(Talent_manager_Deals_fun());

        // Success toast notification
        toast.success(" Accepted successfully!", {
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
        // Error toast notification
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

  const handleEdit = (each) => {
    Accepted_Mutation.mutate(each);
  };

  const Reject_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/offer/decline`;
      const tokengot = localStorage.getItem("token");
      console.log(data);
      // let request = data?.requests?.request?.id;
      // let sender = data?.requests?.sender?.id;

      let data_item = {
        offer_id: data?.offer?.deal?.offerId,
        user_id: data?.offer?.deal?.id,
      };
      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.post(API_URL, data_item, config);
        console.log(response.data); // Logging the response data

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        dispatch(Talent_manager_Deals_fun());

        // Success toast notification
        toast.success(" Rejected successfully!", {
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
        // Error toast notification
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

  const handleDelete = (each) => {
    Reject_Mutation.mutate(each);
  };

  const [searchInput, setSearchInput] = useState("");
  console.log({ ww: Talent_manager_Deals });

  const filteredUsersArray = Talent_manager_Deals?.filter(
    (user) =>
      user?.requests?.sender?.firstname
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      user?.requests?.sender?.surname
        .toLowerCase()
        .includes(searchInput.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  console.log({ filteredUsersArray });

  return (
    <>
      <ToastContainer />

      <div className="Scoutpage_maxWidthContainer">
        <div className="Scoutpage_contents ">
          <Talent_Header />
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
              <UseTable
                header={header}
                data={Talent_manager_Deals}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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

export default TalentManagerDeal;
