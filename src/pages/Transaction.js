// transaction.js
import React, { useEffect } from "react";
import "../styles/Transaction.scss";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import Saldo from "../components/Saldo";
import History from "../components/History";

const Transaction = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="home-row">
          <div className="col-md-4">
            <UserProfile />
          </div>
          <div className="col-md-7">
            <Saldo />
          </div>
        </div>
        <History />
      </div>
    </>
  );
};

export default Transaction;
