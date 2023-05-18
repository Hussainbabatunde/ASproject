import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_update_user_BIO_fun,
  Admin_update_user_physical_stat_fun,
  Admin_update_user_upload_id_fun,
} from "../../../../Slice/Admin/AdminUpdate_profileSlice";
import { FaRegImages } from "react-icons/fa";
import imgPlaceHolder from "../../../../assets/imageplaceholder.png";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const Profile_detail = ({ Admin_Get_Players_Profile_details }) => {
  const dispatch = useDispatch();

  const {
    Admin_update_user_bio,
    Admin_update_user_bio_isError,
    Admin_update_user_bio_isSuccess,
    Admin_update_user_bio_isLoading,
    Admin_update_user_bio_message,
  } = useSelector((state) => state.reducer.AdminUpdate_profileSlice);

  const [formData, setFormData] = useState({
    user_id: Admin_Get_Players_Profile_details?.data?.bio?.user_id,

    user_type: "player",
    fullname: `${Admin_Get_Players_Profile_details?.data?.firstname}  ${Admin_Get_Players_Profile_details?.data?.surname}`,

    phone: Admin_Get_Players_Profile_details?.data?.phone,

    current_club: Admin_Get_Players_Profile_details?.data?.bio?.current_club,

    available: Admin_Get_Players_Profile_details?.data?.available,

    position: Admin_Get_Players_Profile_details?.data?.bio?.position,

    about: Admin_Get_Players_Profile_details?.data?.bio?.about,

    location: Admin_Get_Players_Profile_details?.data?.bio?.location,

    home_town: Admin_Get_Players_Profile_details?.data?.bio?.home_town,

    email: Admin_Get_Players_Profile_details?.data?.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or other operations

    dispatch(Admin_update_user_BIO_fun(formData));
  };
  return (
    <form onSubmit={handleSubmit} className="Scoutpage_ProfileforContent">
      <p className="Scoutpage_Profile_Profiledetailstext">Profile Details</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Fill in the following details
      </p>

      <p className="Scoutpage_Profile_Profileformlabeltext">Full Name</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="First name and last name"
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Email Address
      </p>
      <input
        type="email"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="abc@mail.com"
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Phone Number</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="08000000000000"
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Bio of Yourself
      </p>
      <textarea
        placeholder="Write about yourself"
        name="about"
        value={formData.about}
        onChange={handleChange}
        required
        className="Scoutpage_Profile_Profileformlabeltextarea"
      ></textarea>

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Location</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Country of Residence"
        required
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Home Town</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="home_town"
        value={formData.home_town}
        onChange={handleChange}
        placeholder="---"
        required
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Current Club</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="current_club"
        value={formData.current_club}
        onChange={handleChange}
        placeholder="Name of Club"
        required
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Availability</p>
      <select
        name="available"
        onChange={handleChange}
        value={formData.available}
        className="Scoutpage_Profile_ProfileformlabelInput"
      >
        <option></option>
        <option value="1">Available</option>
        <option value="0">Not Available</option>
      </select>
      <button type="submit" className="Scoutpage_Profileform_savebutton">
        {Admin_update_user_bio_isLoading ? (
          <CircularProgress size={15} />
        ) : (
          <span>Save</span>
        )}
      </button>
    </form>
  );
};

export const Admin_update_Physical_Stats = ({
  Admin_Get_Players_Profile_details,
}) => {
  const dispatch = useDispatch();

  const { Admin_update_user_physical_stat_isLoading } = useSelector(
    (state) => state.reducer.AdminUpdate_profileSlice
  );

  const [formData, setFormData] = useState({
    user_id: Admin_Get_Players_Profile_details?.data?.physical_stat?.user_id,
    gender: Admin_Get_Players_Profile_details?.data?.physical_stat?.gender,
    height: Admin_Get_Players_Profile_details?.data?.physical_stat?.height,
    weight: Admin_Get_Players_Profile_details?.data?.physical_stat?.weight,
    language: Admin_Get_Players_Profile_details?.data?.physical_stat?.language,
    strong_foot:
      Admin_Get_Players_Profile_details?.data?.physical_stat?.strong_foot,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or other operations
    dispatch(Admin_update_user_physical_stat_fun(formData));
  };
  return (
    <form onSubmit={handleSubmit} className="Scoutpage_ProfileforContent">
      <p className="Scoutpage_Profile_Profiledetailstext">Physical Stats</p>
      <p className="Scoutpage_Profile_Profileformlabeltext">Gender</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        placeholder="Male/Female"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Height</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="height"
        value={formData.height}
        onChange={handleChange}
        placeholder="Feets"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Weight</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Kg"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Language</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="language"
        value={formData.language}
        onChange={handleChange}
        placeholder="---"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Strong foot</p>
      <select
        required
        name="strong_foot"
        value={formData.strong_foot}
        onChange={handleChange}
        className="Scoutpage_Profile_ProfileformlabelInput"
      >
        <option disabled></option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
      <button type="submit" className="Scoutpage_Profileform_savebutton">
        {Admin_update_user_physical_stat_isLoading ? (
          <CircularProgress size={15} />
        ) : (
          <span>Save</span>
        )}
      </button>
    </form>
  );
};

export const Admin_upload_id = ({ Admin_Get_Players_Profile_details }) => {
  const dispatch = useDispatch();

  const { Admin_update_user_image_isLoading, Admin_update_user_image } =
    useSelector((state) => state.reducer.AdminUpdate_profileSlice);

  const userDataInfo = Admin_Get_Players_Profile_details?.data;

  let img_Data = userDataInfo?.identification;

  const [fileUploadId, setFileUploadId] = useState(img_Data);
  const [uploadId, setUploadId] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loadUploadId, setLoadUploadId] = useState(false);
  function handleUploadIdChange(e) {
    setUploadId(e.target.files[0]);
    setFileUploadId(URL.createObjectURL(e.target.files[0]));
    setUploaded(true);
  }

  const handleUploadIdSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("identification", uploadId);
    formData.append("id", userDataInfo.id);

    dispatch(Admin_update_user_upload_id_fun(formData));
  };

  const handleUploadIDDeleteImage = () => {
    setUploadId(null);
    setFileUploadId(null);
    setUploaded(false);
  };
  return (
    <form
      onSubmit={handleUploadIdSubmit}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Upload ID</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Verification by means of ID, International Passport, NIN
      </p>
      <label for="UploadId" className="Scoutpage_Profileform_SelectImage">
        Select Image
      </label>
      <input
        type="file"
        id="UploadId"
        onChange={handleUploadIdChange}
        className="Scoutpage_Profile_ImagePlaceInput"
      />

      {uploaded ? (
        <div className="Scoutpage_Profileform_ImgIploaded">
          <div className="Scoutpage_Profileform_UploadIDImg">
            <img
              src={fileUploadId || imgPlaceHolder}
              width="100px"
              height="100px"
            />

            <p style={{ marginLeft: "20px" }}> 100 x 100</p>
          </div>
          <RiDeleteBin6Fill
            onClick={handleUploadIDDeleteImage}
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
        </div>
      ) : (
        <div className="Scoutpage_Profileform_ImgIploaded">
          <div className="Scoutpage_Profileform_UploadIDImg">
            <img
              src={fileUploadId || imgPlaceHolder}
              width="100px"
              height="100px"
            />

            <p style={{ marginLeft: "20px" }}> 100 x 100</p>
          </div>
        </div>
      )}

      <button type="submit" className="Scoutpage_Profileform_uploadButton">
        <FaRegImages style={{ fontSize: "18px", marginRight: "5px" }} />
        {Admin_update_user_image_isLoading ? (
          <CircularProgress size={15} />
        ) : (
          <span>Upload photo</span>
        )}
      </button>
    </form>
  );
};

export const Admin_upload_Players_image = () => {
  return (
    <form
      //   onSubmit={handleYourImagesSubmit}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Your Images</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Please provide different images of yourself, a standard photo and you on
        the field.
      </p>
      <label for="YourImages" className="Scoutpage_Profileform_SelectImage">
        Select Images
      </label>
      <input
        type="file"
        id="YourImages"
        // onChange={handleMultipleImages}
        multiple
        className="Scoutpage_Profile_ImagePlaceInput"
      />

      {/* {uploaded2 &&
        previewUrls.map((url, index) => {
          return (
            <div className="Scoutpage_Profileform_ImgIploaded">
              <div className="Scoutpage_Profileform_UploadIDImg">
                <img src={url} width="100px" height="100px" />
                <p style={{ marginLeft: "20px" }}> 100 x 100</p>
              </div>
              <RiDeleteBin6Fill
                onClick={() => handleDeleteImage(index)}
                style={{ fontSize: "25px", cursor: "pointer" }}
              />
            </div>
          );
        })}

      <button type="submit" className="Scoutpage_Profileform_uploadButton">
        <FaRegImages style={{ fontSize: "18px", marginRight: "5px" }} />
        {loadYourImages ? (
          <CircularProgress size={15} />
        ) : (
          <span>Upload photo</span>
        )}
      </button> */}
    </form>
  );
};

export const Admin_PlayerProfileVideo = () => {
  return (
    <form className="Scoutpage_ProfileforContent">
      <p className="Scoutpage_Profile_Profiledetailstext">Video</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Share a video or more of yourself in action must be from{" "}
        <b>Google Drive</b>
      </p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        placeholder="Link to Video"
      />

      <button className="Scoutpage_Profileform_savebutton">Save</button>
    </form>
  );
};

export const Admin_PlayerProfileBusinessService = () => {
  return (
    <form
      //   onSubmit={handleSubmitPhysicalStats}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">
        Business Service Price
      </p>
      <p className="Scoutpage_Profile_filldetailstext">
        Select what the price for your service to <b>scouts</b>
      </p>
      <div className="Scoutpage_Profile_radiolabel">
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            // onClick={handleRadioButtonChange}
            // checked={isChecked}
            value="range"
          />{" "}
          Range
        </label>
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            // onClick={handleRadioButtonChange2}
            // checked={isChecked2}
            // value="actual"
          />{" "}
          Actual
        </label>
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            // onClick={handleRadioButtonChange3}
            // checked={isChecked3}
            value="open"
          />{" "}
          Open
        </label>
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            // onClick={handleRadioButtonChange4}
            // checked={isChecked4}
            value="free"
          />{" "}
          Free
        </label>
      </div>
      {/* {priceType == "range" && (
        <div>
          <p className="Scoutpage_Profile_filldetailstext">
            You won't go below this price
          </p>
          <div className="Scoutpage_Profile_fromtoBusiness">
            <div className="Scoutpage_Profile_fromBusiness">
              <b>From</b>
              <div className="Scoutprofile_nairainput">
                <TbCurrencyNaira style={{ fontSize: "18px" }} />
                <input
                  type="text"
                  name="from"
                  value={amtStatedfrom}
                  className="Scoutprofile_frominput"
                  onChange={handleAmountFrom}
                  required
                />
              </div>
            </div>
            <div className="Scoutpage_Profile_fromBusiness">
              <b>To</b>
              <div className="Scoutprofile_nairainput">
                <TbCurrencyNaira style={{ fontSize: "18px" }} />
                <input
                  type="text"
                  name="to"
                  value={amtStatedTo}
                  className="Scoutprofile_frominput"
                  onChange={handleAmountTo}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* {priceType == "actual" && (
        <div>
          <p className="Scoutpage_Profile_filldetailstext">
            This is your Price and it's none negotiable
          </p>
          <p className="Scoutpage_Profile_Profileformlabelnexttext">
            Preferred{" "}
          </p>
          <div className="Scoutprofile_nairainput">
            <TbCurrencyNaira style={{ fontSize: "18px" }} />
            <input
              type="text"
              name="preferred"
              value={amtActual}
              onChange={handleAmtActual}
              className="Scoutprofile_frominput"
              required
            />
          </div>
        </div>
      )} */}
      {/* {priceType == "open" && (
        <div>
          <p className="Scoutpage_Profile_filldetailstext">
            Our Team will evaluate your profile and fix an amount
          </p>
        </div>
      )} */}
      {/* {priceType == "free" && (
        <div>
          <p className="Scoutpage_Profile_filldetailstext">
            You are not charging a price.{" "}
          </p>
        </div>
      )} */}

      {/* <button type="submit" className="Scoutpage_Profileform_savebutton">
        {loadBusinessService ? (
          <CircularProgress size={15} />
        ) : (
          <span>Save</span>
        )}
      </button> */}
    </form>
  );
};
