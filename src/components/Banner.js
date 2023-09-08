import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, selectBanners } from "../store/slice/bannerSlice";
import image_banner from "../assets/images/Banner4.png";
import Slider from "react-slick";

const Banner = () => {
  const dispatch = useDispatch();
  const banners = useSelector(selectBanners);
  const bannersStatus = useSelector((state) => state.banners.status);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    if (bannersStatus === "idle") {
      dispatch(fetchBanners());
    }
  }, [bannersStatus, dispatch]);

  return (
    <div className="banner-slider">
      <h5>Temukan promo menarik</h5>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div className="banner-card" key={banner.id}>
            <img
              className="banner-image"
              src={banner.banner_image}
              alt={banner.banner_title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
