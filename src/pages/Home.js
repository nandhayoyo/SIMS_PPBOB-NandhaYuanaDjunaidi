import React, { useEffect, useState } from "react";
import "../styles/Home.scss";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import Saldo from "../components/Saldo";

import { parseCookies } from "nookies";
import { ProfileService } from "../services/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../store/slice/userSlice";
import Service from "../components/Service";
import Banner from "../components/Banner";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  // const [showService, setShowService] = useState(true);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);

  // const handleServiceClick = () => {
  //   setShowService(false);
  // };

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
        <Service />
        <Banner />
      </div>
    </>
  );
};

export default Home;
