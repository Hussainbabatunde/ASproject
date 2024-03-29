import React, { useEffect } from "react";
import { BsFillCalendar2Fill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { AiFillBank } from "react-icons/ai";
import {
  Transaction_detail_fun,
  Transaction_list_fun,
  Transaction_total_amount_fun,
} from "../../../Slice/Admin/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminFinance = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { Transaction_total_amount, Transaction_list, Transaction_detail } =
    useSelector((state) => state.reducer.TransactionSlice);

  const data = [
    { id: 1, date: "Feb 23, 2023", amt: "14,500" },
    { id: 2, date: "Feb 23, 2023", amt: "11,500" },
    { id: 3, date: "Feb 23, 2023", amt: "4,000" },
  ];

  useEffect(() => {
    dispatch(Transaction_detail_fun(id));

    return () => {};
  }, []);

  const dateObject = new Date(Transaction_detail?.updated_at);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="AdminDashboard">
      <div className="AdminPage_FinanceDashboard">
        {/* <AdminScoutsStep /> */}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl text-center mb-10 font-bold ">
            Transaction Details
          </h1>
          <p className="text-gray-700 mb-5 ">
            Transaction id: {Transaction_detail?.transaction_id}
          </p>
          <p className="text-gray-700 mb-5">
            Amount: {Transaction_detail?.amount}
          </p>
          <p className="text-gray-700 mb-5">
            Payment Status: {Transaction_detail?.status}
          </p>
          <p className="text-gray-700 mb-5">
            Description: {Transaction_detail?.description}
          </p>
          <p className="text-gray-700 mb-5">
            Currency: {Transaction_detail?.currency}
          </p>
          <p className="flex items-center">
            <BsFillCalendar2Fill className="Scoutpage_PaymentEarnings_dateIcon" />
            <span className="Scoutpage_PaymentEarnings_monthandyear">
              {formattedDate}
            </span>
          </p>
          <div className="mt-4">
            <a
              href="https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTkU5cThHYkVEc2hDcndwKNaxoKQGMgZc25kcMOI6LBZ4RgYFTsLfbZo-fDsb4L9z9kHCEEbGTT_mF07FJoxm4kfZPwEOwuXqlvDj"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Receipt
            </a>
          </div>
        </div>
        <div className="Scoutpage_TransGetpaid">
          <div className="Scoutpage_transactionContent_holder">
            <div className="Scoutpage_transactionContent">
              <p className="Scoutpage_PaymentEarnings_earntext">payment by</p>

              <div className="flex items-center mb-4">
                <img
                  src={Transaction_detail?.payment_by?.profile_pics}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p>{`${Transaction_detail?.payment_by?.firstname}  ${Transaction_detail?.payment_by?.surname}`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="Scoutpage_transactionContent_holder">
            <div className="Scoutpage_transactionContent">
              <p className="Scoutpage_PaymentEarnings_earntext">PLAYER</p>

              <div className="flex items-center mb-4">
                <img
                  src={Transaction_detail?.player?.profile_pics}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p>{`${Transaction_detail?.player?.firstname}  ${Transaction_detail?.player?.surname}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
