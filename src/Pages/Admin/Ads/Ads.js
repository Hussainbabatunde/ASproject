import React, { useEffect } from "react";

import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";

import { useDispatch, useSelector } from "react-redux";
import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import AdminUseTable from "../../../Components/Table/AdminUseTable";
import { Admin_Ads_fun } from "../../../Slice/Admin/Admin_AdsSlice";
// import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import football from "../../../assets/lottie/92356-football.json";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 210,
  p: 4,
};

const Ads = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const dispatch = useDispatch();
  const { Admin_Ads } = useSelector((state) => state.reducer.Admin_AdsSlice);

  console.log(Admin_Ads);

  const header = [
    {
      id: 1,
      name: "Player Name",
    },
    {
      id: 2,
      name: "Amount",
      case: "Admin_ads_Amount",
    },
    {
      id: 3,
      name: "Duration",
      case: "Admin_ads_Duration",
    },
    {
      id: 4,
      name: "Reach",
      case: "Admin_ads_reach",
    },
    {
      id: 5,
      name: "  ",
      case: "Admin_All_Ads_View",
    },
  ];

  const Terminanted_Mutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}admin/advert/terminate`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      try {
        const response = await axios.post(API_URL, data, config);
        console.log(response.data); // Logging the response data

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        // Success toast notification
        dispatch(Admin_Ads_fun());

        toast.success("Terminated successfully!", {
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
        toast.error("Error occurred while Terminating .", {
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

  console.log(Terminanted_Mutation.isLoading);

  const handleDelete = (data) => {
    let terminat_info = {
      id: data?.id,
      player_id: data?.player_id,
    };

    Terminanted_Mutation.mutate(terminat_info);
  };

  useEffect(() => {
    dispatch(Admin_Ads_fun());
    return () => {};
  }, []);

  const dataTable = [
    {
      id: 1,
      playerName: "mayana",
      position: "striker",
      club: "chelsea",
      recentNegotiate: "league ball",
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div className="AdminPage_DashboardTAbleCat">
            <div className="AdminPage_NegotiateTab">
              <p className="AdminPage_NegotiateTitleText">Ads</p>
              <div className="AdminPage_TableInfo">
                <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
                <span className="AdminPage_TableInfoText">
                  This is a table of recent communication on the platform
                </span>
              </div>

              <div className="AdminTable_NegotiateTable">
                {Admin_Ads?.length === 0 ? (
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
                    data={Admin_Ads}
                    handleDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={Terminanted_Mutation.isLoading}
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

export default Ads;
