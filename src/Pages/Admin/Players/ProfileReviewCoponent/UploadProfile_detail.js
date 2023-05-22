import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_update_user_BIO_fun,
  Admin_update_user_BusinessService_fun,
  Admin_update_user_Your_image_id_fun,
  Admin_update_user_physical_stat_fun,
  Admin_update_user_upload_id_fun,
} from "../../../../Slice/Admin/AdminUpdate_profileSlice";
import { FaRegImages } from "react-icons/fa";
import imgPlaceHolder from "../../../../assets/imageplaceholder.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { TbCurrencyNaira } from "react-icons/tb";

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
        placeholder="First name and last name"
        disabled
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Email Address
      </p>
      <input
        type="email"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="email"
        value={formData.email}
        placeholder="abc@mail.com"
        disabled
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Phone Number</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="phone"
        value={formData.phone}
        placeholder="08000000000000"
        disabled
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Bio of Yourself
      </p>
      <textarea
        placeholder="Write about yourself"
        name="about"
        value={formData.about}
        required
        className="Scoutpage_Profile_Profileformlabeltextarea"
        disabled
      ></textarea>

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Location</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="location"
        value={formData.location}
        placeholder="Country of Residence"
        required
        disabled
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Home Town</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="home_town"
        value={formData.home_town}
        placeholder="---"
        required
        disabled
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Current Club</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="current_club"
        value={formData.current_club}
        placeholder="Name of Club"
        required
        disabled
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Availability</p>
      <select
        name="available"
        value={formData.available}
        className="Scoutpage_Profile_ProfileformlabelInput"
        disabled
      >
        <option></option>
        <option value="1">Available</option>
        <option value="0">Not Available</option>
      </select>
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
        placeholder="Male/Female"
        required
        disabled
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Height</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="height"
        value={formData.height}
        placeholder="Feets"
        required
        disabled
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Weight</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="weight"
        value={formData.weight}
        placeholder="Kg"
        required
        disabled
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Language</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="language"
        value={formData.language}
        placeholder="---"
        required
        disabled
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Strong foot</p>
      <select
        required
        name="strong_foot"
        value={formData.strong_foot}
        disabled
        className="Scoutpage_Profile_ProfileformlabelInput"
      >
        <option disabled></option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
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
    </form>
  );
};

export const Admin_upload_Players_image = ({
  Admin_Get_Players_Profile_details,
}) => {
  const dispatch = useDispatch();
  const userDataInfo = Admin_Get_Players_Profile_details?.data;
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Check if total uploaded images exceed the limit (5 in this example)
    if (images.length + files.length > 5) {
      // Display an error message
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const uploadedImages = [];
    const previewImageUrls = [];

    // Process each selected file
    files.forEach((file) => {
      // Create a FileReader object to read the file
      const reader = new FileReader();

      // Set up the callback function when the file reading is complete
      reader.onload = (event) => {
        const imageUrl = event.target.result;

        // Add the file and its corresponding preview URL to the state
        uploadedImages.push(file);
        previewImageUrls.push(imageUrl);

        // Update the state with the new image and preview URLs
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
        setPreviewUrls((prevUrls) => [...prevUrls, ...previewImageUrls]);
      };

      // Read the file as a data URL (to generate the preview URL)
      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    const updatedPreviewUrls = [...previewUrls];

    // Remove the image and its preview URL from the arrays
    updatedImages.splice(index, 1);
    updatedPreviewUrls.splice(index, 1);

    // Update the state with the updated arrays
    setImages(updatedImages);
    setPreviewUrls(updatedPreviewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (images.length < 5) {
    //   toast.error("Upload 5 pictures of Yourself", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // alert("Upload 5 pictures of Yourself");
    //   return;
    // }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("user_images[]", image);
    });

    formData.append("id", userDataInfo.id);

    dispatch(Admin_update_user_Your_image_id_fun(formData));

    // Perform the image upload logic here
    // You can use the "images" array to access the uploaded images

    // Reset the form after successful upload
    setImages([]);
    setPreviewUrls([]);
    setUploading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="Scoutpage_ProfileforContent">
        <p className="Scoutpage_Profile_Profiledetailstext">Your Images</p>
        <p className="Scoutpage_Profile_filldetailstext">
          Please provide different images of yourself, a standard photo and you
          on the field.
        </p>

        <div className="flex w-[100%] mb-5  gap-2">
          {previewUrls.map((url, index) => (
            <>
              {/* <div className="Scoutpage_Profileform_ImgIploaded"> */}
              <div className="w-[10rem] h-[10rem] flex flex-col  items-center">
                {/* <div className="Scoutpage_Profileform_UploadIDImg"> */}
                <div className="w-full h-full">
                  <img src={url} className="w-full h-full" />
                  {/* <p style={{ marginLeft: "20px" }}> 100 x 100</p> */}
                </div>
                <div onClick={() => handleImageDelete(index)}>
                  <RiDeleteBin6Fill
                    // onClick={() => handleDeleteImage(index)}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
      </form>
    </>
  );
};

export const Admin_PlayerProfileVideo = ({
  Admin_Get_Players_Profile_details,
}) => {
  const [videoLinks, setVideoLinks] = useState([]);

  const handleVideoLinkChange = (event) => {
    const link = event.target.value;
    // const linksArray = link.split(" ");
    // setVideoLinks((prevLinks) => [...prevLinks, ...linksArray]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform further processing or API calls to submit the data
    const data = {
      user_id: 19,
      videos_url: videoLinks,
    };
    console.log(data); // You can replace this with your actual submission logic
  };
  return (
    <form className="Scoutpage_ProfileforContent" onSubmit={handleSubmit}>
      <p className="Scoutpage_Profile_Profiledetailstext">Video</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Share a video or more of yourself in action. Must be from{" "}
        <b>Google Drive</b>.
      </p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        placeholder="Link to Video"
        onChange={handleVideoLinkChange}
        disabled
      />
      <button type="submit" className="Scoutpage_Profileform_savebutton">
        Save
      </button>
    </form>
  );
};

export const Admin_PlayerProfileBusinessService = ({
  Admin_Get_Players_Profile_details,
}) => {
  const [priceType, setPriceType] = useState("range");
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [pricingBusiness, setPricingBusiness] = useState({});
  const [amtStatedfrom, setAmtStatedFrom] = useState("");
  const [amtStatedTo, setAmtStatedTo] = useState("");
  const [amtActual, setAmtActual] = useState("");
  const dispatch = useDispatch();
  const [loadBusinessService, setLoadBusinessService] = useState(false);

  let PlayerDetails = Admin_Get_Players_Profile_details?.data;
  // const PlayerDetails = useSelector(
  //   (state) => state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data
  // );

  // const handleChangeBusinessPricing = (e) =>{
  //   setAmtStated({...amtStated, [e.target.name]: e.target.value})
  // }

  console.log(PlayerDetails);
  const handleSubmitPhysicalStats = async (event) => {
    event.preventDefault();
    pricingBusiness.user_id =
      Admin_Get_Players_Profile_details?.data?.bio?.user_id;
    pricingBusiness.service_type = priceType;
    if (priceType == "range") {
      pricingBusiness.minimum = amtStatedfrom;
      pricingBusiness.maximum = amtStatedTo;
    } else if (priceType == "actual") {
      pricingBusiness.amount = `${amtActual}`;
    } else if (priceType == "open") {
      pricingBusiness.amount = "";
    } else if (priceType == "free") {
      pricingBusiness.amount = "";
    }
    // console.log(pricingBusiness)
    setLoadBusinessService(true);
    console.log(pricingBusiness);

    dispatch(Admin_update_user_BusinessService_fun(pricingBusiness));

    // await dispatch(PlayerProfileBusinessServiceApi(pricingBusiness));
    // await dispatch(PlayerProfileVerificationStatus());
    // await dispatch(ProfileDetailsPlayer());
    setLoadBusinessService(false);
  };

  const handleRadioButtonChange = () => {
    setIsChecked(!isChecked);
    setIsChecked2(false);
    setIsChecked3(false);
    setIsChecked4(false);
    setPriceType("range");
  };
  const handleRadioButtonChange2 = () => {
    setIsChecked2(!isChecked2);
    setIsChecked(false);
    setIsChecked3(false);
    setIsChecked4(false);
    setPriceType("actual");
  };
  const handleRadioButtonChange3 = () => {
    setIsChecked3(!isChecked3);
    setIsChecked(false);
    setIsChecked2(false);
    setIsChecked4(false);
    setPriceType("open");
  };
  const handleRadioButtonChange4 = () => {
    setIsChecked4(!isChecked4);
    setIsChecked2(false);
    setIsChecked3(false);
    setIsChecked(false);
    setPriceType("free");
  };

  useEffect(() => {
    if (PlayerDetails) {
      if (PlayerDetails?.price?.service_type == "range") {
        setPriceType(PlayerDetails?.price?.service_type);
        // const myString = PlayerDetails?.price?.amount;
        setAmtStatedFrom(PlayerDetails?.price?.minimum);
        setAmtStatedTo(PlayerDetails?.price?.maximum);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
      }
      if (PlayerDetails?.price?.service_type == "actual") {
        setAmtActual(PlayerDetails?.price?.amount);
        setPriceType(PlayerDetails?.price?.service_type);
        // handleRadioButtonChange2()
        setIsChecked2(true);
        setIsChecked(false);
        setIsChecked3(false);
        setIsChecked4(false);
      }
      if (PlayerDetails?.price?.service_type == "open") {
        setAmtActual(PlayerDetails?.price?.amount);
        setPriceType(PlayerDetails?.price?.service_type);
        setIsChecked3(true);
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked4(false);
      }
      if (PlayerDetails?.price?.service_type == "free") {
        setAmtActual(PlayerDetails?.price?.amount);
        setPriceType(PlayerDetails?.price?.service_type);
        setIsChecked4(true);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked(false);
      }
      // setAvailable(PlayerDetails?.bio?.available)
      // setAbout(PlayerDetails?.bio?.about)
    }
  }, [PlayerDetails]);

  const handleAmountFrom = (e) => {
    setAmtStatedFrom(e.target.value);
  };
  const handleAmountTo = (e) => {
    setAmtStatedTo(e.target.value);
  };
  const handleAmtActual = (e) => {
    setAmtActual(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmitPhysicalStats}
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
            onClick={handleRadioButtonChange}
            checked={isChecked}
            value="range"
            disabled
          />{" "}
          Range
        </label>
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            onClick={handleRadioButtonChange2}
            checked={isChecked2}
            value="actual"
            disabled
          />{" "}
          Actual
        </label>
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            onClick={handleRadioButtonChange3}
            checked={isChecked3}
            value="open"
            disabled
          />{" "}
          Open
        </label>
        <label className="Scoutpage_Profile_Profileformradiolabel">
          <input
            type="radio"
            onClick={handleRadioButtonChange4}
            checked={isChecked4}
            value="free"
            disabled
          />{" "}
          Free
        </label>
      </div>
      {priceType == "range" && (
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
                  disabled
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
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {priceType == "actual" && (
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
              disabled
            />
          </div>
        </div>
      )}
      {priceType == "open" && (
        <div>
          <p className="Scoutpage_Profile_filldetailstext">
            Our Team will evaluate your profile and fix an amount
          </p>
        </div>
      )}
      {priceType == "free" && (
        <div>
          <p className="Scoutpage_Profile_filldetailstext">
            You are not charging a price.{" "}
          </p>
        </div>
      )}
    </form>
  );
};
