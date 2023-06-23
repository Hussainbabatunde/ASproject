import React, { useEffect } from "react";
import { RxExit } from "react-icons/rx";
import { LogoutAuth } from "../../Slice/auth/Login";
import { UserLogout } from "../Player/UserLogOut";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ProfileDetailsfan } from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice";
import {
  Talent_manager_details_fun,
  reset_CreateTalent,
} from "../../Slice/Talent_Manager/Talent_manager_slice";

function Talent_Header() {
  const dispatch = useDispatch();

  const { Talent_manager_details, Talent_manager_details_create_isSuccess } =
    useSelector((state) => state?.reducer?.Talent_manager_slice);

  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );

  const fanAllProfileDetailsData = useSelector(
    (state) => state?.reducer?.fanProfileSlice
  );

  const handleLogout = async () => {
    dispatch(LogoutAuth());
    // await dispatch(resetScoutProfileSlice())
    UserLogout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    dispatch(dispatch({ type: "RESET" }));
  };

  useEffect(() => {
    dispatch(Talent_manager_details_fun());

    dispatch(reset_CreateTalent());

    return () => {};
  }, [Talent_manager_details_create_isSuccess]);

  const data = [
    { id: 1, pathTo: "/afrisport/talent-manager/profile", pathName: "Profile" },
    { id: 2, pathTo: "/afrisport/talent-manager/deal", pathName: "Deals" },
    { id: 3, pathTo: "/afrisport/talent-manager/players", pathName: "Player" },
    { id: 4, pathTo: "/afrisport/talent-manager/request", pathName: "Request" },

    // { id: 5, pathTo: "/afrisport/talent-manager/Payment", pathName: "Payment" },
  ];
  return (
    <>
      <div className="Scoutpage_AccountLogout_div ">
        <p className="Scoutpage_AccountWord">Account</p>
        <p
          className="Scoutpage_AccountWord"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout <RxExit />
        </p>
      </div>

      <div class="bg-white  p-4 sm:px-3 md:px-4 lg:px-4 xl:px-4 mt-4 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4 flex flex-wrap">
        {data.map((each, index) => (
          <NavLink
            to={each?.pathTo}
            key={index}
            className={({ isActive }) =>
              isActive ? "Scoutpage_Profileactivepage" : "Scoutpage_Profilepage"
            }
          >
            {each?.pathName}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Talent_Header;
