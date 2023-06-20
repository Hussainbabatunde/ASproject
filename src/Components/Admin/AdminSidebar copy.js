import React, { useState } from "react";
import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosPaper } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { GiMeepleGroup, GiHouse } from "react-icons/gi";
import {
  BsPersonLinesFill,
  BsFillPeopleFill,
  BsChevronDown,
} from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { AiFillBank } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LogoutAuth } from "../../Slice/auth/Login";

const AdminSidebar = () => {
  const data = [
    {
      id: 1,
      pathTo: "/admin/dashboard",
      pathName: "Dashboard",
      pathIcon: <RxDashboard />,
      children: [],
    },
    {
      id: 2,
      pathTo: "/admin/negotiations",
      pathName: "Negotiate",
      pathIcon: <IoIosPaper />,
      children: [],
    },
    {
      id: 3,
      pathTo: "/admin/ads",
      pathName: "Ads",
      pathIcon: <RiFileEditFill />,
      children: [],
    },
    {
      id: 4,
      pathTo: "/admin/players",
      pathName: "Players",
      pathIcon: <MdGroups />,
      children: [],
    },
    {
      id: 5,
      pathTo: "/admin/scouts",
      pathName: "Scout",
      pathIcon: <BsPersonLinesFill />,
      children: [],
    },
    {
      id: 6,
      pathTo: "/admin/fans",
      pathName: "Fans",
      pathIcon: <BsPersonLinesFill />,
      children: [],
    },
    {
      id: 7,
      pathTo: "/admin/talentManager",
      pathName: "Talent Manager",
      pathIcon: <BsFillPeopleFill />,
      children: [],
    },
    {
      id: 8,
      pathTo: "/admin",
      pathName: "Admins",
      pathIcon: <GiMeepleGroup />,
      children: [],
    },
    {
      id: 9,
      pathTo: "/admin/finance",
      pathName: "Finance",
      pathIcon: <AiFillBank />,
      children: [],
    },
  ];

  const [reveal, setReveal] = useState(null);

  const handleReveal = (key) => {
    if (reveal === key) {
      return setReveal(null);
    }

    setReveal(key);
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(LogoutAuth());
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    dispatch(dispatch({ type: "RESET" }));
  };

  return (
    <div className="w-1/4 bg-white">
      <div className="SuperAdmin_Sidebar ">
        <div>
          {data.map((each, index) => (
            <div key={index}>
              <NavLink
                to={each?.pathTo}
                onClick={() => handleReveal(index)}
                className={({ isActive }) =>
                  isActive
                    ? "SuperAdmin_SidebarNavLink"
                    : "SuperAdmin_SidebarInactiveNavLink"
                }
              >
                <div className="flex">
                  {each?.pathIcon}
                  <span className="SuperAdmin_SidebarText">
                    {each?.pathName}
                  </span>
                </div>
                {each?.children?.length > 0 && (
                  <BsChevronDown style={{ fontSize: "14px" }} />
                )}
              </NavLink>

              {reveal === index && each?.children?.length > 0 && (
                <ul className="Sidebar_unorderlist">
                  {each?.children.map((child, key) => {
                    return (
                      <li key={key}>
                        <NavLink
                          to={child?.navSubLink}
                          className={({ isActive }) =>
                            isActive
                              ? "SuperAdmin_SidebarListNavLink"
                              : "SuperAdmin_SidebarInactiveListNavLink"
                          }
                        >
                          <div>
                            <span className="SuperAdmin_SidebarListText">
                              {child?.navName}
                            </span>
                          </div>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div
          onClick={handleLogout}
          className="SuperAdmin_SidebarLogoutInactiveNavLink"
        >
          <ImExit />
          <span className="SuperAdmin_SidebarText">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
