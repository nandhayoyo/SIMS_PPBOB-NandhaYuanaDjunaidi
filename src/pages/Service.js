import React, { useEffect, useState } from "react";
import "../styles/Bayar.scss";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import Saldo from "../components/Saldo";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { fetchServices, getServices } from "../store/slice/serviceSlice";
import { fetchBalance, getSaldo } from "../store/slice/saldoSlice";
import { toast } from "react-hot-toast";
import { ProfileService } from "../services/Profile";

const Service = () => {
  const { postTransaction } = ProfileService();
  const { id } = useParams();
  const dispatch = useDispatch();
  const services = useSelector(getServices);
  const saldo = useSelector(getSaldo);
  const servicesStatus = useSelector((state) => state.service.status);

  useEffect(() => {
    if (servicesStatus === "idle") {
      dispatch(fetchServices());
    }
  }, [servicesStatus, dispatch]);

  const selectedService = services.filter(
    (serpis) => serpis.service_code.toLowerCase() === id
  )[0];

  const handlePayment = async () => {
    if (saldo.data.balance < selectedService.service_tariff) {
      toast.error("saldo tidak cukup");
      return;
    }
    try {
      const res = await postTransaction(selectedService.service_code);
      dispatch(fetchBalance());

      toast.success(res.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
        <div className="container">
          <div className="transaction-container">
            <h5>PemBayaran</h5>

            <h5 className="transaction-services">
              <img
                className="transaction-logo"
                src={selectedService?.service_icon}
                alt="Home"
              />
              {selectedService?.service_name}
            </h5>
            <input
              className="form-control"
              type="text"
              value={selectedService?.service_tariff}
            />
            <button className=" button-transaction" onClick={handlePayment}>
              Bayar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
