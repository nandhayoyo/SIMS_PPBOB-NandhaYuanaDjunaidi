import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useRoutes } from "react-router-dom";
import Service from "../pages/Service";
const ServiceSlider = ({ data, onClick }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((service) => (
        <Link to={`/service/${service.service_code.toLowerCase()}`}>
          <div className="service-card" key={service.service_code}>
            <div className="service-content">
              <img
                className="service-image"
                src={service.service_icon}
                alt={service.service_name}
              />
              <p className="service-name">{service.service_name}</p>
            </div>
          </div>
        </Link>
      ))}
    </Slider>
  );
};

export default ServiceSlider;
