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

function AdminSidebar() {
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
    // <div className="flex flex-col fixed flex-shrink-0 w-64 bg-gray-800 text-white  ">
    <div className="  text-white  py-3">
      {data.map((item, index) => (
        <NavLink
          onClick={handleReveal}
          key={index}
          to={item.pathTo}
          className="flex items-center py-[14px] px-6 hover:bg-gray-100 hover:bg-opacity-1 border border-black hover:text-black"
        >
          <div className="mr-3 text-white transition-colors hover:text-black">
            {item.pathIcon}
          </div>
          <span className="text-white transition-colors hover:text-black">
            {item.pathName}
          </span>
        </NavLink>
      ))}

      <div
        className="flex items-center py-2 px-6 hover:bg-gray-200 cursor-pointer hover:text-black"
        onClick={handleLogout}
      >
        <div className="mr-3">
          {" "}
          <ImExit />
        </div>
        <span className="">Logout</span>
      </div>
    </div>
  );
}

export default AdminSidebar;
