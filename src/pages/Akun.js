import React, { useState, useEffect } from "react";
import "../styles/Akun.scss";
import Header from "../components/Header";
import profile_picture from "../assets/images/Profile Photo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser, updateUser } from "../store/slice/userSlice";
import { toast } from "react-hot-toast";
import { ProfileService } from "../services/Profile";
import { useNavigate } from "react-router-dom";
// import { destroy } from "nookies";

const Akun = () => {
  const { putProfile, putProfileImage } = ProfileService();
  const dispatch = useDispatch();
  const profile = useSelector(getUser);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState();
  const [imagePreviewURL, setImagePreviewURL] = useState("");

  // const profile = useSelector((state) => state.user.data);
  const user = useSelector(getUser);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);

  useEffect(() => {
    if (profile.data) {
      setEmail(profile.data.email || "");
      setFirstName(profile.data.first_name || "");
      setLastName(profile.data.last_name || "");
    }
  }, [profile]);

  const fullName = profile.data
    ? `${profile.data.first_name} ${profile.data.last_name}`
    : "Loading...";

  const capitalizedFullName = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    // const blob = reader.result.

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = async (e) => {
    setIsEditing(false);
    e.preventDefault();

    const data = {
      firstName,
      lastName,
    };

    try {
      if (imagePreviewURL) {
        await putProfileImage(file);
      }
      await putProfile(firstName, lastName);
      toast.success("Profile berhasil di update!");
      dispatch(updateUser());
    } catch (error) {
      toast.error("Terjadi kesalahan. Silahkan coba lagi");
    }
  };

  const handleLogoutClick = () => {
    // destroy(null, "token");
    navigate("/");
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="akun-container">
          <div className="pp-container">
            <label htmlFor="update-image" className="label-container">
              <div className="edit-icon">
                <FontAwesomeIcon icon={faPen} className="icon-edit" />
              </div>
              <input
                id="update-image"
                className="input-file"
                accept="image/*"
                type="file"
                style={{ opacity: 0 }}
                onChange={(event) => handleUpdateImage(event)}
              />
            </label>
            <img
              className="profile_picture-akun"
              src={
                profile.profile_image
                  ? profile.profile_image
                  : imagePreviewURL
                  ? imagePreviewURL
                  : profile_picture
              }
              alt="Home"
            />
          </div>
          <h2>{capitalizedFullName}</h2>
          <div className="form-edit">
            <h5 className="edit-text">Email</h5>
            <input
              className="inputtext-edit"
              type="text"
              placeholder="masukan email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!isEditing}
            />
            <h5 className="edit-text">Nama depan</h5>
            <input
              className="inputtext-edit"
              type="text"
              placeholder="masukan nama depan"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              disabled={!isEditing}
            />
            <h5 className="edit-text">Nama Belakang</h5>
            <input
              className="inputtext-edit"
              type="text"
              placeholder="masukan nama belakang"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              disabled={!isEditing}
            />

            <button
              className="button-edit"
              onClick={isEditing ? handleSaveClick : handleEditClick}
            >
              {isEditing ? "Simpan" : "Edit Profile"}
            </button>
            {isEditing && (
              <button className="button-cancel" onClick={handleCancelClick}>
                Batalkan
              </button>
            )}
            <button className="button-logout" onClick={handleLogoutClick}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Akun;
