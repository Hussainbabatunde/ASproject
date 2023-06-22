import React, { useEffect, useState } from "react";
import AdminUseTable from "../../../../Components/Table/AdminUseTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import empty from "../../../../assets/lottie/emptyState.json";

import { Admin_FanData__fun } from "../../../../Slice/Admin/Admin_FanData_Slice";
import TableWithPagination from "../../TableWithPagination";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

function FanSuspended() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const handleAllNegotiate = () => {
    setStep(1);
  };

  const handleSuspended = () => {
    setStep(2);
  };

  const { Admin_Fan } = useSelector(
    (state) => state.reducer.Admin_FanData_Slice
  );

  const Suspendheader = [
    {
      id: 1,
      name: "Scout",
      case: "Admin_fan_scout_suspend",
    },

    {
      id: 2,
      name: "",
      case: "Admin_fan_Suspend_message_view_suspend_header",
    },
  ];

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch(Admin_FanData__fun());
    return () => {};
  }, []);

  const handleSuspend_Unsuspend = async (data) => {
    let API_URL = `${baseURL}admin/fans/unsuspend`;

    console.log(API_URL);

    const tokengot = localStorage.getItem("token");

    try {
      // Set the loading state to true before sending the request
      console.log("Sending POST request...");
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      const response = await axios.post(
        API_URL,
        {
          user_id: data,
        },
        config
      );

      // Reset the loading state to false after receiving the response
      setLoading(false);
      console.log("POST request successful");
      console.log("Response:", response.data.message);

      toast.success(`${response.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      // Reset the loading state to false in case of an error
      setLoading(false);
      console.error("Error:", error.message);

      toast.error(`${error.message}`, {
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
    }
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
    setIsModalOpen(true);
    setScout_email(data);
  };

  const handleDelete = (data) => {
    let main_id = data?.user?.id;
    handleSuspend_Unsuspend(main_id);
  };
  return (
    <>
      <TableWithPagination
        header={Suspendheader}
        data={Admin_Fan?.suspendedFan_data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default FanSuspended;
