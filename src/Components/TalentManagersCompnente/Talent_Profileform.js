import React, { useEffect, useState } from "react";
import "../Scout/profileform.css";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  ProfileDetailsScout,
  ScoutProfileProfileformApi,
  ScoutProfileVerificationStatus,
} from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice";
import {
  ProfileDetailsfan,
  fanProfileProfileformApi,
  fanProfileVerificationStatus,
} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice";
import {
  Talent_manager_details_Bio_uplaod_fun,
  Talent_manager_details_fun,
} from "../../Slice/Talent_Manager/Talent_manager_slice";
import { ToastContainer } from "react-toastify";

const Talent_Profileform = ({ userId }) => {
  const dispatch = useDispatch();

  const { id } = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user
  );

  const { Talent_manager_details } = useSelector(
    (state) => state?.reducer?.Talent_manager_slice
  );

  let PlayerDetails = Talent_manager_details?.data;
  console.log(PlayerDetails)

  const [profileInfo, setProfileInfo] = useState({
    user_id: id,
    age: PlayerDetails?.bio?.age,
    user_type: "talent-manager",
    fullname: `${PlayerDetails?.firstname} ${PlayerDetails?.surname}`,
    phone: PlayerDetails?.phone,
    location: PlayerDetails?.bio?.location,
    home_town: PlayerDetails?.bio?.home_town,
    email: PlayerDetails?.email,
  });

  useEffect(()=>{
    setProfileInfo({
      user_id: id,
    age: PlayerDetails?.bio?.age,
    user_type: "talent-manager",
    fullname: `${PlayerDetails?.firstname} ${PlayerDetails?.surname}`,
    phone: PlayerDetails?.phone,
    location: PlayerDetails?.bio?.location,
    home_town: PlayerDetails?.bio?.home_town,
    email: PlayerDetails?.email,
    })
  }, [PlayerDetails])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevProfileInfo) => ({
      ...prevProfileInfo,
      [name]: value,
    }));
  };

  const [loadProfileform, setLoadProfileform] = useState(false);

  const handleSubmitProfileform = async (event) => {
    event.preventDefault();
    setLoadProfileform(true);

    dispatch(Talent_manager_details_Bio_uplaod_fun(profileInfo));

    setLoadProfileform(false);
    dispatch(Talent_manager_details_fun());
  };

  return (
    <>
      {PlayerDetails && (
        <form
          onSubmit={handleSubmitProfileform}
          className="Scoutpage_ProfileforContent"
        >
          <p className="Scoutpage_Profile_Profiledetailstext">
            Profile Details
          </p>
          <p className="Scoutpage_Profile_filldetailstext">
            Fill in the following details
          </p>
          <p className="Scoutpage_Profile_Profileformlabeltext">Full Name</p>
          <input
            type="text"
            className="Scoutpage_Profile_ProfileformlabelInput"
            value={profileInfo?.fullname}
            onChange={handleChange}
            placeholder="first name and last name"
            name="fullname"
          />
          <p className="Scoutpage_Profile_Profileformlabelnexttext">
            Email Address
          </p>
          <input
            type="email"
            className="Scoutpage_Profile_ProfileformlabelInput"
            value={profileInfo?.email}
            onChange={handleChange}
            placeholder="abc@mail.com"
            name="email"
          />
          <p className="Scoutpage_Profile_Profileformlabelnexttext">
            Phone Number
          </p>
          <input
            type="tel"
            className="Scoutpage_Profile_ProfileformlabelInput"
            value={profileInfo?.phone}
            onChange={handleChange}
            placeholder="08000000000000"
            name="phone"
          />

          <p className="Scoutpage_Profile_Profileformlabelnexttext">Age</p>
          <input
            type="number"
            className="Scoutpage_Profile_ProfileformlabelInput"
            value={profileInfo?.age}
            onChange={handleChange}
            name="age"
          />
          <p className="Scoutpage_Profile_Profileformlabelnexttext">Location</p>
          <input
            type="text"
            className="Scoutpage_Profile_ProfileformlabelInput"
            value={profileInfo?.location}
            onChange={handleChange}
            placeholder="Country of Residence"
            name="location"
            required
          />
          <p className="Scoutpage_Profile_Profileformlabelnexttext">
            Home Town
          </p>
          <input
            type="text"
            className="Scoutpage_Profile_ProfileformlabelInput"
            value={profileInfo?.home_town}
            name="home_town"
            onChange={handleChange}
            placeholder="---"
            required
          />

          <button type="submit" className="Scoutpage_Profileform_savebutton">
            {loadProfileform ? (
              <CircularProgress size={15} />
            ) : (
              <span>Save</span>
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default Talent_Profileform;
