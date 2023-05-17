import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import UploadImage from "./ProfileCoponent/UploadImage";
import UploadProfile_detail, {
  Admin_PlayerProfileBusinessService,
  Admin_PlayerProfileVideo,
  Admin_update_Physical_Stats,
  Admin_upload_Players_image,
  Admin_upload_id,
  Profile_detail,
} from "./ProfileCoponent/UploadProfile_detail";
import { useDispatch, useSelector } from "react-redux";
import { Admin_Get_Players_Profile_detailsfun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();

  const { Admin_Get_Players_Profile_details } = useSelector(
    (state) => state.reducer.AdminUpdate_profileSlice
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Admin_Get_Players_Profile_detailsfun(id));

    return () => {};
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard">
        <div className="pt-10"> this is the component </div>

        <div className="AdminPage_Dashboard">
          <div>
            <div> back and details</div>
            <UploadImage
              Admin_Get_Players_Profile_details={
                Admin_Get_Players_Profile_details
              }
            />
            <Profile_detail />
            <Admin_update_Physical_Stats />

            <Admin_PlayerProfileBusinessService />
            <Admin_upload_id />
            <Admin_upload_Players_image />
            <Admin_PlayerProfileVideo />
            <div></div>
          </div>

          <div className="AdminPage_DashboardTAbleCat">
            {/* <AdminPlayerStep /> */}

            <h1>sam</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
