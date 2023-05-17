import React from "react";

function PlayerDetails() {
  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          {/* <AdminPlayerStep /> */}

          <h1>sam</h1>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetails;

// import React, { useEffect, useState } from "react";
// import "../../../Pages/Scout/ScoutViewProfile.css";
// import { Link } from "react-router-dom";
// import { GrFormNext } from "react-icons/gr";
// import { BsShareFill } from "react-icons/bs";
// import { BsFillPatchCheckFill, BsHouseDoor, BsDot } from "react-icons/bs";
// import { MdOutlineDashboard } from "react-icons/md";
// import { TbCurrencyNaira } from "react-icons/tb";
// import { SlLocationPin } from "react-icons/sl";
// import { RiDashboardLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   PlayerProfileVerificationStatus,
//   ProfileDetailsPlayer,
// } from "../../../Slice/Player/Playerprofile/PlayerProfileSlice";
// import { Skeleton } from "@mui/material";
// // import ScoutHeader from "../Header/ScoutHeader";
// // import Footer from "../Homepage/Footer";
// // import MakeARequest from "./MakeARequest";
// // import HomePagePitchOffer from "./HomePagePitchOffer";

// const PlayerDetails = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const [showOffer, setShowOffer] = useState(false);
//   const [loader, setLoader] = useState(false);

//   const VerifiedStatus = useSelector(
//     (state) => state.reducer?.PlayerProfileSlice?.VerificationStatusData?.data
//   );
//   let progress =
//     VerifiedStatus?.bio +
//     VerifiedStatus?.price +
//     VerifiedStatus?.physical_stat +
//     VerifiedStatus?.images +
//     VerifiedStatus?.videos;

//   const PlayerDetails = useSelector(
//     (state) => state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data
//   );
//   const userId = useSelector(
//     (state) => state?.reducer?.LoginSlice?.logindata?.message?.id
//   );

//   const handleHide = () => {
//     setShow(false);
//   };
//   const handleShow = () => {
//     setShow(true);
//   };

//   const handleHideOffer = () => {
//     setShowOffer(false);
//   };
//   const handleShowOffer = () => {
//     setShow(false);
//     setShowOffer(true);
//   };

//   useEffect(() => {
//     const getInfo = async () => {
//       setLoading(true);
//       await dispatch(ProfileDetailsPlayer(userId));
//       await dispatch(PlayerProfileVerificationStatus());
//       setLoading(false);
//     };
//     getInfo();
//   }, []);

//   return (
//     <div>
//       <div className="AdminDashboard">
//         <div className="AdminPage_Dashboard">
//           <h1>sam</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlayerDetails;
