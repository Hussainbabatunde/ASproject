import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Lottie from "lottie-react";
import Attach_Permissions_To_Privilege from "../../Components/Admin/Autorization/Attach_Permissions_To_Privilege";
import empty from "../../assets/lottie/emptyState.json";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Authorization() {
  const [modal, setModal] = useState("");
  //   Attach_Permissions_To_Privilege

  const {
    create_authorize,
    create_authorize_isError,
    create_authorize_isSuccess,
    create_authorize_isLoading,
    create_authorize_message,
  } = useSelector((state) => state?.reducer?.AuthorizeSlice);

  useEffect(() => {
    if (create_authorize_isSuccess) {
      setModal("");
    }

    return () => {};
  }, [create_authorize_isSuccess]);
  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          {/* {modal && <Role_modal />} */}

          <div className="Privilege_With_Permissions">
            <div>
              <button
                className="Adminpage_CreateAdmins"
                onClick={() => setModal("Attach_Permissions_To_Privilege")}
              >
                Attach Permission(s) To Privilege
              </button>
            </div>

            <div>
              <button
                className="Adminpage_CreateAdmins"
                onClick={() => setModal("true")}
              >
                Attach Permission(s) To Privilege
              </button>
            </div>
          </div>

          <div>
            <>
              {modal === "" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Lottie
                    style={{ width: "200px", height: "200px" }}
                    animationData={empty}
                  />
                </div>
              )}
              {modal === "Attach_Permissions_To_Privilege" && (
                <Attach_Permissions_To_Privilege />
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorization;
