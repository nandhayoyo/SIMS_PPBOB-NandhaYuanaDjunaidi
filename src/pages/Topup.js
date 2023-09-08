import React from "react";
import "../styles/TopUp.scss";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import Saldo from "../components/Saldo";
import NominalTopup from "../components/NominalTopup";

const TopUp = () => {
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
        <NominalTopup />
      </div>
    </>
  );
};

export default TopUp;
