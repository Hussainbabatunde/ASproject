import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import imgPlaceholder from "../../assets/AdminImg.png";
// import './AdminPermissionModal.css'
import Select from "react-select";
import { CircularProgress } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./MakeARequest.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OfferPlayApi } from "../../Slice/Player/PlayerView/PlayerViewSlice";
import { ToastContainer } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  p: 4,
  bgcolor: "white",
  borderRadius: "20px",
};

const HomePagePitchOffer = ({
  show,
  loader,
  handleSubmit,
  handleChange,
  title,
  handleHide,
}) => {
  const [payValue, setPayValue] = useState("");
  const { id } = useParams();
  const [data, setData] = useState({});
  const [change, setChange] = useState(false);
  const PlayerDetails = useSelector(
    (state) => state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data
  );
  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );
  const userType = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user_type
  );
  const [loadingOffer, setLoadingOffer] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (PlayerDetails) {
      if (
        PlayerDetails?.price?.minimum == "free" ||
        PlayerDetails?.price?.minimum == "open"
      ) {
        setPayValue(0);
      } else {
        setPayValue(PlayerDetails?.price?.minimum);
      }
    }
  }, [PlayerDetails]);

  const gottenMarketfee = useSelector(
    (state) => state?.reducer?.GetPaymentSlice?.getMarketPriceData?.data
  );
  // console.log('got market ',gottenMarketfee)

  const marketfee = Number(gottenMarketfee);
  console.log(marketfee);
  const TotalFee = marketfee + Number(payValue);
  console.log(marketfee);

  const handleChangePayValue = (e) => {
    setPayValue(e.target.value);
  };
  const handleOfferChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    data.to = id;
    data.from = userId;
    data.value = payValue;
    data.recipient_earnings = payValue;
    data.market_place_fee = marketfee;
    setLoadingOffer(true);
    if (userType == "scout") {
      await dispatch(OfferPlayApi(data));
    }
    setLoadingOffer(false);
    handleHide();
    // console.log('data ', data)
  };

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "white",
      padding: "3px",
      border: "1px solid gray",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <Modal
      open={show}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="HomePage_ViewProfileModal">
        <ToastContainer />
        <form onSubmit={handleSubmitOffer} className="offeraRequest_ModalView">
          <div className="MakeaRequest_Modal">
            <IoMdArrowBack style={{ fontSize: "25px" }} onClick={handleHide} />
            <img
              src={imgPlaceholder}
              width="50px"
              height="50px"
              style={{ marginLeft: "10px" }}
            />
            <p className="MakeaRequest_HowitWorksText">How it Works</p>
            <AiOutlineInfoCircle
              style={{ fontSize: "20px", marginLeft: "10px" }}
            />
          </div>
          <div style={{ margin: "15px 25px" }}>
            <p style={{ fontWeight: "600" }}>Provide Details on Your Offer</p>
            <p style={{ fontSize: "13px" }}>Offer Name</p>
            <input
              type="text"
              name="name"
              onChange={handleOfferChange}
              className="OfferModal_TitleInput"
            />
            <p style={{ fontSize: "13px" }}>Offer Details</p>
            <textarea
              type="text"
              name="detail"
              onChange={handleOfferChange}
              className="OfferModal_TitleTextarea"
            />
            {/* <p style={{ fontSize: "13px" }}>State Date</p>
            <input
              type="date"
              name="to_start"
              onChange={handleOfferChange}
              className="OfferModal_TitleInput"
            /> */}
            {/* <p style={{ fontSize: "13px" }}>End Date</p>
            <input
              type="date"
              name="to_end"
              onChange={handleOfferChange}
              className="OfferModal_TitleInput"
            /> */}
            <p style={{ fontSize: "13px" }}>Duration</p>
            <input
              type="text"
              name="duration"
              onChange={handleOfferChange}
              className="OfferModal_TitleInput"
            />
            <p style={{ fontSize: "13px", margin: "7px 0 0" }}>
              Expiration date (optional)
            </p>
            <p style={{ fontSize: "12px", marginBottom: "5px" }}>
              After this date, the recipient will no longer be able to review or
              accept your deal
            </p>
            <input
              type="date"
              name="expiration"
              onChange={handleOfferChange}
              className="OfferModal_TitleDate"
            />
            <p style={{ fontWeight: "600", marginTop: "20px" }}>
              How much will you like to pay
            </p>
            {change == false ? (
              <div className="MakeARequest_InitialAmtDiv">
                <p className="MakeARequest_InitialAmtText">${payValue}</p>
                <p
                  className="MakeARequest_InitialChangeText"
                  onClick={() => setChange(true)}
                >
                  Change
                </p>
              </div>
            ) : (
              <div className="OfferModal_PriceInput">
                <label>$</label>
                <input
                  type="text"
                  value={payValue}
                  onChange={handleChangePayValue}
                  className="OfferInput_ViewProfilePage"
                  placeholder="Input your price"
                />
              </div>
            )}

            <div className="OfferInput_PriceSingleSummary">
              <p style={{ fontSize: "13px", margin: "7px 0 0" }}>
                Recipient earnings
              </p>
              <p style={{ fontSize: "13px", margin: "7px 0 0" }}>${payValue}</p>
            </div>
            <div className="OfferInput_PriceSingleSummary">
              <p style={{ fontSize: "13px" }}>Marketplace fee*</p>
              <p style={{ fontSize: "13px" }}>${marketfee}</p>
            </div>
            <div className="OfferInput_PriceTotal">
              <p style={{ fontWeight: "600" }}>Total</p>
              <p style={{ fontWeight: "600" }}>${TotalFee}</p>
            </div>
            <button type="submit" className="HomepageViewProfile_requestButton">
              {loadingOffer ? (
                <CircularProgress size={15} />
              ) : (
                <span>Send Offer</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default HomePagePitchOffer;
