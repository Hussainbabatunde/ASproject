import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

const Scout_message_modal = ({ scout_email, isOpen, onClose }) => {
  console.log(scout_email);
  const [message_data, setMessage_data] = useState({
    title: "",
    message: "",
    email: scout_email?.email,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChangemessage_data = (e) => {
    const { name, value } = e.target;
    setMessage_data((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    console.log(message_data);
    const handleSuspend_Unsuspend = async (data, id) => {
      let API_URL = `${baseURL}admin/player/message`;

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

          message_data,
          config
        );

        // Reset the loading state to false after receiving the response
        setLoading(false);
        console.log("POST request successful");
        console.log("Response:", response.data);

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

    handleSuspend_Unsuspend();
  };

  return (
    <>
      <ToastContainer />

      <div className="fixed z-50 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen  px-4 ">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
          </div>
          <div className="bg-white   rounded-lg overflow-hidden w-[60%] lg:w-[40%]  shadow-xl transform transition-all ">
            <div className="border-b bord   ">
              <div className=" flex justify-between    px-7 py-3 items-center ">
                <div>
                  <h3 className="text-[20px] font-semibold ">title</h3>
                </div>

                <div>
                  <button
                    className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                    onClick={onClose}
                  >
                    X
                  </button>
                </div>
              </div>

              <div>
                <div className="modal-content bg-white rounded-lg shadow-lg">
                  <form onSubmit={handleSubmit}>
                    <div className="p-4">
                      <div className="mb-4">
                        <label htmlFor="title" className="block mb-2">
                          Title:
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={message_data.title}
                          onChange={handleInputChangemessage_data}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="message" className="block mb-2">
                          Message:
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={message_data.message}
                          onChange={handleInputChangemessage_data}
                          className="w-full p-2 border border-gray-300 rounded"
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="text-center ">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                        >
                          {loading ? (
                            <CircularProgress style={{ color: "white" }} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="r relative top-1">
      <div className="modal-overlay" onClick={onClose}>
        hjshasjh
      </div>
      <div className="modal-content bg-white rounded-lg shadow-lg w-[50%]">
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Submit Form</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Scout_message_modal;
