import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import UploadImage from "./ProfileReviewCoponent/UploadImage";
import UploadProfile_detail, {
  Admin_PlayerProfileBusinessService,
  Admin_PlayerProfileVideo,
  Admin_update_Physical_Stats,
  Admin_upload_Players_image,
  Admin_upload_id,
  Profile_detail,
} from "./ProfileReviewCoponent/UploadProfile_detail";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Get_Players_Profile_detailsfun,
  reset_Profile_post_request,
} from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";

function Profile_review() {
  const { id } = useParams();

  const navigate = useNavigate();
  const {
    Admin_Get_Players_Profile_details,
    Admin_update_user_image_isSuccess,
  } = useSelector((state) => state.reducer.AdminUpdate_profileSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Admin_Get_Players_Profile_detailsfun(id));

    dispatch(reset_Profile_post_request());

    return () => {};
  }, [Admin_update_user_image_isSuccess]);

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div>
            <div className="ScoutViewProfile_navigationprogress">
              <Link
                to={`/admin/players`}
                className="ScoutViewProfile_navigationback"
              >
                Back
              </Link>
              <GrFormNext style={{ fontSize: "16px" }} />
              <p className="ScoutViewProfile_navigationprofile">Profile</p>
            </div>

            {Admin_Get_Players_Profile_details && (
              <div className="w-[70%] m-auto">
                <UploadImage
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />
                <Profile_detail
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />
                <Admin_update_Physical_Stats
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />

                <Admin_PlayerProfileBusinessService
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />
                <Admin_upload_id
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />
                <Admin_upload_Players_image
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />
                <Admin_PlayerProfileVideo
                  Admin_Get_Players_Profile_details={
                    Admin_Get_Players_Profile_details
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile_review;
