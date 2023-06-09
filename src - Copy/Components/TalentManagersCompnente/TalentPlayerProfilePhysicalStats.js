import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PlayerProfilePhysicalStatsApi,
  PlayerProfileVerificationStatus,
  ProfileDetailsPlayer,
} from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const TalentPlayerProfilePhysicalStats = ({ user_data }) => {
  const [physicalStats, setPhysicalStats] = useState({});
  const [genderPhysical, setGenderPhysical] = useState("");
  const [heightPhysical, setHeightPhysical] = useState("");
  const [weightPhysical, setWeightPhysical] = useState("");
  const [languagePhysical, setLanguagePhysical] = useState("");
  const [strongFoot, setStrongFoot] = useState("");

  const dispatch = useDispatch();
  const PlayerDetails = useSelector(
    (state) => state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data
  );
  // console.log(PlayerDetails)
  const [loadProfileStats, setLoadProfileStats] = useState(false);
  // const handlePhysicalStats = (e) =>{
  //   setPhysicalStats({...physicalStats, [e.target.name]: e.target.value})
  // }
  useEffect(() => {
    if (user_data) {
      setGenderPhysical(user_data?.physical_stat?.gender);
      setHeightPhysical(user_data?.physical_stat?.height);
      setWeightPhysical(user_data?.physical_stat?.weight);
      setLanguagePhysical(user_data?.physical_stat?.language);
      setStrongFoot(user_data?.physical_stat?.strong_foot);
    }
  }, [user_data]);
  const handleGenderPhysical = (e) => {
    setGenderPhysical(e.target.value);
  };
  const handleHeightPhysical = (e) => {
    setHeightPhysical(e.target.value);
  };
  const handleWeightPhysical = (e) => {
    setWeightPhysical(e.target.value);
  };
  const handleLanguagePhysical = (e) => {
    setLanguagePhysical(e.target.value);
  };
  const handleStrongfootPhysical = (e) => {
    setStrongFoot(e.target.value);
  };

  const ProfilePhisalmutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${baseURL}talent-manager/player/physical_stat`;
      const tokengot = localStorage.getItem("token");

      const config = {
        headers: {
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

  const handleSubmitPhysicalStats = async (event) => {
    event.preventDefault();
    physicalStats.user_id = user_data?.id;
    physicalStats.gender = genderPhysical;
    physicalStats.height = heightPhysical;
    physicalStats.weight = weightPhysical;
    physicalStats.language = languagePhysical;
    physicalStats.strong_foot = strongFoot;
    // console.log(physicalStats)

    console.log(physicalStats);

    ProfilePhisalmutation.mutate(physicalStats);
  };

  return (
    <form
      onSubmit={handleSubmitPhysicalStats}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Physical Stats</p>
      <p className="Scoutpage_Profile_Profileformlabeltext">Gender</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="gender"
        value={genderPhysical}
        onChange={handleGenderPhysical}
        placeholder="Male/Female"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Height</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={heightPhysical}
        name="height"
        onChange={handleHeightPhysical}
        placeholder="Feets"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Weight</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={weightPhysical}
        name="weight"
        onChange={handleWeightPhysical}
        placeholder="Kg"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Language</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={languagePhysical}
        name="language"
        onChange={handleLanguagePhysical}
        placeholder="---"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Strong foot</p>
      <select
        required
        name="strong_foot"
        value={strongFoot}
        onChange={handleStrongfootPhysical}
        className="Scoutpage_Profile_ProfileformlabelInput"
      >
        <option disabled></option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>

      <button type="submit" className="Scoutpage_Profileform_savebutton">
        {ProfilePhisalmutation?.isLoading ? (
          <CircularProgress size={15} />
        ) : (
          <span>Save</span>
        )}
      </button>
    </form>
  );
};

export default TalentPlayerProfilePhysicalStats;
