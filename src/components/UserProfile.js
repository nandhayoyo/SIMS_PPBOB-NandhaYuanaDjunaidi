import React from "react";
import "../styles/UserProfile.scss";
import { useSelector } from "react-redux";
import profile_picture from "../assets/images/Profile Photo.png";

const UserProfile = () => {
  const profile = useSelector((state) => state.user.data);
  // console.log("userprofile /// ", profile);

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
