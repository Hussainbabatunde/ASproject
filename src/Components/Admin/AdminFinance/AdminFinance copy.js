import React, { useEffect } from "react";
import { BsFillCalendar2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillBank } from "react-icons/ai";
import {
  Transaction_list_fun,
  Transaction_total_amount_fun,
} from "../../../Slice/Admin/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminFinance = () => {
  const dispatch = useDispatch();

  const { Transaction_total_amount, Transaction_list } = useSelector(
    (state) => state.reducer.TransactionSlice
  );

  const data = [
    { id: 1, date: "Feb 23, 2023", amt: "14,500" },
    { id: 2, date: "Feb 23, 2023", amt: "11,500" },
    { id: 3, date: "Feb 23, 2023", amt: "4,000" },
  ];

  useEffect(() => {
    dispatch(Transaction_total_amount_fun());
    dispatch(Transaction_list_fun());

    return () => {};
  }, []);

  let dataww = {
    id: 9,
    user_id: "19",
    others: "23",
    offer_id: null,
    advert_id: "49",
    manager_id: null,
    transaction_id: "ch_3NIRX7GbEDshCrwp1PiAl5ff",
    amount: "1234.00",
    amount_captured: "1234",
    amount_refunded: "0",
    currency: "usd",
    application_fee: null,
    application_fee_amount: null,
    captured: "1",
    paid: "1",
    created: "1686640853",
    status: "succeeded",
    description: "Elizabeth Evelyn",
    receipt_url:
      "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTkU5cThHYkVEc2hDcndwKNaxoKQGMgZc25kcMOI6LBZ4RgYFTsLfbZo-fDsb4L9z9kHCEEbGTT_mF07FJoxm4kfZPwEOwuXqlvDj",
    payment_type: "advert",
    payer: null,
    created_at: "2023-06-13T18:21:14.000000Z",
    updated_at: "2023-06-13T18:21:14.000000Z",
    user_type: {
      id: 6,
      name: "admin",
    },
    sender: {
      id: 19,
      firstname: "samheart",
      surname: "ndukwe",
      profile_pics:
        "https://certificate.bcodestech.com/images/profile-picture/1685632556-842154628722208-rola.jpeg",
    },
    player: {
      id: 19,
      firstname: "samheart",
      surname: "ndukwe",
      profile_pics:
        "https://certificate.bcodestech.com/images/profile-picture/1685632556-842154628722208-rola.jpeg",
    },
  };

  return (
    <div className="AdminDashboard">
      <div className="AdminPage_FinanceDashboard">
        {/* <AdminScoutsStep /> */}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-lg font-semibold text-center">
            Transaction Details
          </h1>

          <div>
            <div className="sender"></div>
          </div>

          <div className="flex items-center mb-4">
            <img
              src="https://certificate.bcodestech.com/images/profile-picture/1685632556-842154628722208-rola.jpeg"
              alt="Profile Picture"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="text-lg font-semibold">Transaction Details</h3>
              <p className="text-gray-500">Payment ID: 9</p>
            </div>
          </div>
          <p className="text-gray-700">Amount: $1234.00</p>
          <p className="text-gray-700">Payment Status: Succeeded</p>
          <p className="text-gray-700">Description: Elizabeth Evelyn</p>
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
        <div className="Scoutpage_PaymentEarnings">
          <div className="Scoutpage_PaymentEarnings_firstrow">
            <p className="Scoutpage_PaymentEarnings_earntext">Earnings</p>
            <p className="Scoutpage_PaymentEarnings_earnfigure">
              {Transaction_total_amount?.total_amount}
            </p>
          </div>
          <p className="Scoutpage_PaymentEarnings_datePayed">
            <BsFillCalendar2Fill className="Scoutpage_PaymentEarnings_dateIcon" />
            <span className="Scoutpage_PaymentEarnings_monthandyear">
              February, 2023
            </span>
          </p>
        </div>
        <div className="Scoutpage_TransGetpaid">
          <div className="Scoutpage_transactionContent_holder">
            <div className="Scoutpage_transactionContent">
              <p className="Scoutpage_PaymentEarnings_earntext">Transaction</p>

              <div className="Scoutpage_TransGetpaid_dateandamt">
                {data.map((each, index) => (
                  <div key={index} className="Scoutpage_Getpaid_dateSec">
                    <p className="Scoutpage_Getpaid_monthandyear">
                      {each?.date}
                    </p>
                    <p className="Scoutpage_Getpaid_monthandyear">
                      N{each?.amt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/admin/finance/transaction"
              className="Scoutpage_transaction_Linkotherpages"
            >
              View All Transactions
            </Link>
          </div>
          <div className="Scoutpage_transactionContent_holder">
            <div className="Scoutpage_transactionContent">
              <p className="Scoutpage_PaymentEarnings_earntext">
                How You Get Paid{" "}
              </p>
              <div className="Scoutpage_Getpaid_acctandbank">
                <div className="Scoutpage_Getpaid_bankiconholder">
                  <AiFillBank className="Scoutpage_Getpaid_bankicon" />
                </div>
                <div className="Scoutpage_Getpaid_acctnoandname">
                  <p className="Scoutpage_Getpaid_accnumber">
                    Wire transfer to bank account 12345678
                  </p>
                  <p className="Scoutpage_Getpaid_accnumber">Zenith Bank</p>
                </div>
              </div>
            </div>
            <Link className="Scoutpage_transaction_Linkotherpages">
              Change Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
