import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  Transaction_list_fun,
  Transaction_total_amount_fun,
} from "../../../Slice/Admin/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import { RiSearchLine } from "react-icons/ri";

import TableWithPagination from "../../../Pages/Admin/TableWithPagination";

const AdminFinanaceTransaction = () => {
  const { Transaction_total_amount, Transaction_list } = useSelector(
    (state) => state.reducer.TransactionSlice
  );

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

  const [searchInput, setSearchInput] = useState("");

  const filteredUsersArray = reversedTransactionList?.filter(
    (user) =>
      user?.payments?.payment_by?.firstname
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      user?.payments?.payment_by?.surname
        .toLowerCase()
        .includes(searchInput.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <div className="AdminDashboard ">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <div className="AdminPage_NegotiateTab">
            <div className="AdminPage_TableTitleandLink">
              <p className="AdminPage_NegotiateTitleText">Transaction</p>
              <p className="AdminPage_NegotiateTitleText">
                Total Amount:$ {Transaction_total_amount?.total_amount}
              </p>
            </div>
            <div className="AdminPage_TableInfo">
              <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
              <span className="AdminPage_TableInfoText">
                Recent transaction made on the platform{" "}
              </span>
            </div>

            <div className="AdminDashboard_Search">
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                className="AdminDashboard_SearchInput"
                placeholder="Search name"
              />

              <RiSearchLine className="AdminDashboard_SearchIcon" />
            </div>
            <div className="AdminTable_NegotiateTable">
              {filteredUsersArray?.length === 0 ? (
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
                    data={filteredUsersArray}
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
