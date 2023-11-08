import React, { useEffect, useState } from "react";
import "../Scout/profileform.css";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const TalentPlayerProfileProfileform = ({ user_data }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [current_club, setCurrentClub] = useState("");
  const [available, setAvailable] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [home_town, setHomeTown] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");

  const UserProfileLogin = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user
  );

  useEffect(() => {
    setFullname(`${user_data?.firstname} ${user_data?.surname}`);
    setPhone(user_data?.phone);
  }, []);
  useEffect(() => {
    if (user_data) {
      setCurrentClub(user_data?.bio?.current_club);
      setAvailable(user_data?.bio?.available);
      setAge(user_data?.bio?.age);
      setPosition(user_data?.bio?.position);
      setAbout(user_data?.bio?.about);
      setLocation(user_data?.bio?.location);
      setHomeTown(user_data?.bio?.home_town);
      setFullname(`${user_data?.firstname} ${user_data?.surname}`);
      setPhone(user_data?.phone);
    }
  }, [user_data]);

  const ProfileBiomutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/player/bio`;
      const tokengot = localStorage.getItem("token");

      console.log({ formData });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };
      return axios.post(API_URL, formData, config);
    },
    {
      onSuccess: () => {
        toast.success("Form submitted successfully!", {
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

  const handleSubmitProfileform = async (event) => {
    event.preventDefault();
    profileInfo.user_id = user_data?.id;
    profileInfo.current_club = current_club;
    profileInfo.available = available;
    profileInfo.about = about;
    profileInfo.location = location;
    profileInfo.home_town = home_town;
    profileInfo.fullname = fullname;
    profileInfo.phone = phone;
    profileInfo.age = age;
    profileInfo.position = position;
    profileInfo.user_type = "player";

    ProfileBiomutation.mutate(profileInfo);
  };
  const available_form = 1;
  const notavailable_form = 0;
  const handleCurrentClubClick = (e) => {
    setCurrentClub(e.target.value);
  };
  const handleAvailableClick = (e) => {
    setAvailable(e.target.value);
  };
  const handleAboutClick = (e) => {
    setAbout(e.target.value);
  };
  const handleLocationClick = (e) => {
    setLocation(e.target.value);
  };
  const handleHometownClick = (e) => {
    setHomeTown(e.target.value);
  };
  const handleFullnameClick = (e) => {
    setFullname(e.target.value);
  };
  const handlePhoneClick = (e) => {
    setPhone(e.target.value);
  };
  const handleAgeClick = (e) => {
    setAge(e.target.value);
  };
  const handlePositionClick = (e) => {
    setPosition(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmitProfileform}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Profile Details</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Fill in the following details
      </p>
      <p className="Scoutpage_Profile_Profileformlabeltext">Full Name</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={fullname}
        onChange={handleFullnameClick}
        placeholder="first name and last name"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Email Address
      </p>
      <input
        type="email"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={UserProfileLogin?.email}
        placeholder="abc@mail.com"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Phone Number</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={phone}
        onChange={handlePhoneClick}
        placeholder="08000000000000"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Age</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={age}
        onChange={handleAgeClick}
        placeholder="age"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Position</p>
      <select
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={position}
        onChange={handlePositionClick}
        placeholder="position"
      >
        <option></option>
        <option value="goalkeeper">Goalkeeper</option>
        <option value="centerback_defender">Center Back(Defenders)</option>
        <option value="fullback_defender">Full Back(Defenders)</option>
        <option value="central_midfielders">Central midfielders</option>
        <option value="attacking_midfielders">Attacking midfielders</option>
        <option value="defensive_midfielders">Defensive midfielders</option>
        <option value="wingers">Wingers</option>
        <option value="striker">Striker</option>
      </select>
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Current Club</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={current_club}
        onChange={handleCurrentClubClick}
        name="current_club"
        placeholder="Name of Club"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Availability</p>
      <select
        required
        name="available"
        value={available}
        onChange={handleAvailableClick}
        className="Scoutpage_Profile_ProfileformlabelInput"
      >
        <option disabled></option>
        <option value={available_form}>Available</option>
        <option value={notavailable_form}>Not Available</option>
      </select>
      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Bio of Yourself
      </p>
      <textarea
        placeholder="Write about yourself"
        value={about}
        required
        name="about"
        onChange={handleAboutClick}
        className="Scoutpage_Profile_Profileformlabeltextarea"
      ></textarea>
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Location</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={location}
        name="location"
        onChange={handleLocationClick}
        placeholder="Country of Residence"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Home Town</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={home_town}
        name="home_town"
        onChange={handleHometownClick}
        placeholder="---"
        required
      />
      <button type="submit" className="Scoutpage_Profileform_savebutton">
        {ProfileBiomutation?.isLoading ? (
          <CircularProgress size={15} />
        ) : (
          <span>Save</span>
        )}
      </button>
    </form>
  );
};

export default TalentPlayerProfileProfileform;
