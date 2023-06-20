import React, { useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  Transaction_list_fun,
  Transaction_total_amount_fun,
} from "../../../Slice/Admin/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";

import AdminUseTable from "../../../Components/Table/AdminUseTable";
import { Link } from "react-router-dom";
import AdminTalentMangersStep from "../AdminTalentManagers/AdminTalentManagersStep";
import TableWithPagination from "../../../Pages/Admin/TableWithPagination";

// import { Admin_Get_ALLPlayers_fun } from "../../../Slice/Admin/AdminUpdate_profileSlice";
const AdminFinanaceTransaction = () => {
  const { Transaction_total_amount, Transaction_list } = useSelector(
    (state) => state.reducer.TransactionSlice
  );

  console.log(Transaction_list);

  const reversedTransactionList = [...Transaction_list].reverse();

  const header = [
    {
      id: 1,
      name: "Date",
      case: "Admin_Transaction_Date",
    },
    {
      id: 2,
      name: "Amount",
      case: "Admin_Transaction_Amount",
    },
    {
      id: 3,
      name: "Customer",
      case: "Admin_Transaction_Customer",
    },

    ,
    {
      id: 4,
      name: "Purpose",
      case: "Admin_Transaction_Purpose",
    },

    {
      id: 5,
      name: "Reference",
      case: "Admin_Transaction_Reference",
    },

    {
      id: 6,
      name: " ",
      case: "Admin_Transaction_details",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Transaction_total_amount_fun());
    dispatch(Transaction_list_fun());

    return () => {};
  }, []);
  return (
    <div className="AdminDashboard ">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_NegotiateTab">
            <div className="AdminPage_TableTitleandLink">
              <p className="AdminPage_NegotiateTitleText">Transaction</p>
              <p className="AdminPage_NegotiateTitleText">
                Total Amount: {Transaction_total_amount?.total_amount}
              </p>
            </div>
            <div className="AdminPage_TableInfo">
              <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
              <span className="AdminPage_TableInfoText">
                Recent transaction made on the platform{" "}
              </span>
            </div>
            <div className="AdminTable_NegotiateTable">
              {Transaction_list?.length === 0 ? (
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
              ) : (
                <>
                  <TableWithPagination
                    data={reversedTransactionList}
                    header={header}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinanaceTransaction;
