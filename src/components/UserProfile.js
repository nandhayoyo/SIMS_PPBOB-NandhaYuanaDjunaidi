import React, { useEffect } from "react";
import "../styles/UserProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import profile_picture from "../assets/images/Profile Photo.png";
import { fetchUser, getUser } from "../store/slice/userSlice";
import { parseCookies } from "nookies";

const UserProfile = () => {
  const profile = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const cookies = parseCookies();

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch, cookies.token]);

  const fullName = profile.data
    ? `${profile.data.first_name} ${profile.data.last_name}`
    : "Loading...";

  const capitalizedFullName = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  return (
    <>
      <div className="userProfile-container">
        <img className="profile_picture" src={profile_picture} alt="Home" />
        <h5>Selamat datang,</h5>
        <h3>{capitalizedFullName}</h3>
      </div>
    </>
  );
};

export default UserProfile;
