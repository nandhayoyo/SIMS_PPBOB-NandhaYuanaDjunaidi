import React, { useEffect } from "react";
import "../styles/Service.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, getServices } from "../store/slice/serviceSlice";
import ServiceSlider from "./ServiceSlider";

const Service = ({ onClick }) => {
  const dispatch = useDispatch();
  const data = useSelector(getServices);
  const servicesStatus = useSelector((state) => state.service.status);

  useEffect(() => {
    if (servicesStatus === "idle") {
      dispatch(fetchServices());
    }
  }, [servicesStatus, dispatch]);

  return (
    <div className="card-container">
      <ServiceSlider data={data} onClick={onClick} />
    </div>
  );
};

export default Service;
