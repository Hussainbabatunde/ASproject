import React from "react";
import "../Scout/profileform.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CircularProgress } from "@mui/material";
import ReactPlayer from "react-player";
import { BsDot } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "react-query";
let baseURL = process.env.REACT_APP_AFRISPORTURL;

const TalentPlayerProfileVideo = ({
  addInput,
  videoLoader,
  handleSubmitVideos,
  handleInputChange,
  inputs,
  removeInput,
  user_data,
}) => {
  console.log({ user_data });
  const handleDeleteVideo = (id) => {
    console.log({ id });

    // {{connect}}talent-manager/player/remove-video/vidoeid/playerid
  };

  return (
    <div className="Scoutpage_ProfileforContent">
      <p className="Scoutpage_Profile_Profiledetailstext">Video</p>

      <p className="ScoutViewProfile_PhysicalStatsText">
        Video <BsDot style={{ fontSize: "25px" }} /> {user_data?.videos?.length}{" "}
      </p>

      <div className="ScoutViewProfile_VideoSection">
        {user_data?.videos?.map((each, index) => (
          <div key={index} className="ScoutViewProfile_VideoDiv">
            <ReactPlayer
              width="300px"
              height="300px"
              controls
              url={each?.video_url}
            />
            <button
              onClick={() => handleDeleteVideo(each?.id)}
              className="ViewProfile_DeleteVideo"
            >
              {/* {deleteVideoIndex == each?.id ? (
                <CircularProgress size={15} />
              ) : (
                <span>Delete</span>
              )} */}
              <span>Delete</span>
            </button>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmitVideos}
        className="Scoutpage_ProfileforContent"
      >
        <p className="Scoutpage_Profile_filldetailstext">
          Share a video or more of yourself in action must be from{" "}
          <b>Google Drive</b>
        </p>
        {inputs.map((input, index) => (
          <div key={index} className="Scoutpage_Profile_VideoUploadDiv">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="Scoutpage_Profile_ProfileformlabelInput"
              placeholder="Link to Video"
            />

            <RiDeleteBin6Fill
              onClick={() => removeInput(index)}
              style={{ fontSize: "25px", cursor: "pointer" }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addInput}
          className="Scoutpage_Profileform_AddmoreVideos"
        >
          Add more
        </button>
        <button type="submit" className="Scoutpage_Profileform_savebutton">
          {videoLoader ? <CircularProgress size={15} /> : <span>Save</span>}
        </button>
      </form>
    </div>
  );
};

export default TalentPlayerProfileVideo;
