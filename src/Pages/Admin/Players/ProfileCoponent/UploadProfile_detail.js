export const Profile_detail = () => {
  return (
    <form
      //   onSubmit={handleSubmitProfileform}
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
        // value={fullname}
        // onChange={handleFullnameClick}
        placeholder="first name and last name"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Email Address
      </p>
      <input
        type="email"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={userDataLogin?.email}
        placeholder="abc@mail.com"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Phone Number</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={phone}
        // onChange={handlePhoneClick}
        placeholder="08000000000000"
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Bio of Yourself
      </p>
      <textarea
        placeholder="Write about yourself"
        // value={about}
        required
        name="about"
        // onChange={handleAboutClick}
        className="Scoutpage_Profile_Profileformlabeltextarea"
      ></textarea>
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Location</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={location}
        name="location"
        // onChange={handleLocationClick}
        placeholder="Country of Residence"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Home Town</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={home_town}
        name="home_town"
        // onChange={handleHometownClick}
        placeholder="---"
        required
      />

      <p className="Scoutpage_Profile_Profileformlabelnexttext">Current Club</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={current_club}
        // onChange={handleCurrentClubClick}
        name="current_club"
        placeholder="Name of Club"
        required
      />

      {/* <button type="submit" className="Scoutpage_Profileform_savebutton">
        {loadProfileform ? <CircularProgress size={15} /> : <span>Save</span>}
      </button> */}
    </form>
  );
};

export const Admin_update_Physical_Stats = () => {
  return (
    <form
      //   onSubmit={handleSubmitPhysicalStats}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Physical Stats</p>
      <p className="Scoutpage_Profile_Profileformlabeltext">Gender</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        name="gender"
        // value={genderPhysical}
        // onChange={handleGenderPhysical}
        placeholder="Male/Female"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Height</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={heightPhysical}
        name="height"
        // onChange={handleHeightPhysical}
        placeholder="Feets"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Weight</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={weightPhysical}
        name="weight"
        // onChange={handleWeightPhysical}
        placeholder="Kg"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Language</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        // value={languagePhysical}
        name="language"
        // onChange={handleLanguagePhysical}
        placeholder="---"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Strong foot</p>
      <select
        required
        name="strong_foot"
        // value={strongFoot}
        // onChange={handleStrongfootPhysical}
        className="Scoutpage_Profile_ProfileformlabelInput"
      >
        <option disabled></option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
      {/* 
      <button type="submit" className="Scoutpage_Profileform_savebutton">
        {loadProfileStats ? <CircularProgress size={15} /> : <span>Save</span>}
      </button> */}
    </form>
  );
};

export const Admin_upload_id = () => {
  return (
    <form
      //   onSubmit={handleUploadIdSubmit}
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
        // onChange={handleUploadIdChange}
        className="Scoutpage_Profile_ImagePlaceInput"
      />
      {/* 
      {uploaded && (
        <div className="Scoutpage_Profileform_ImgIploaded">
          <div className="Scoutpage_Profileform_UploadIDImg">
            <img src={fileUploadId} width="100px" height="100px" />
            <p style={{ marginLeft: "20px" }}> 100 x 100</p>
          </div>
          <RiDeleteBin6Fill
            onClick={handleUploadIDDeleteImage}
            style={{ fontSize: "25px", cursor: "pointer" }}
          />
        </div>
      )} */}
      {/* 
      <button type="submit" className="Scoutpage_Profileform_uploadButton">
        <FaRegImages style={{ fontSize: "18px", marginRight: "5px" }} />
        {loadUploadId ? (
          <CircularProgress size={15} />
        ) : (
          <span>Upload photo</span>
        )}
      </button> */}
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
