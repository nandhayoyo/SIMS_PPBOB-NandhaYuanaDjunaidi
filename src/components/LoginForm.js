import React, { useEffect, useState } from "react";
import "../styles/LoginForm.scss";
import RegistImg from "../assets/images/IllustrasiLogin.png";
import logo from "../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ProfileService } from "../services/Profile";
import { toast } from "react-hot-toast";
import nookies from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { statusReset, userLogin } from "../store/slice/loginSlice";

const RegistForm = ({ onLogin, onClose }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginStatus = useSelector((state) => state.login.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "succeeded") {
      toast.success("Login berhasil!", {
        duration: 1000,
      });

      setError("");
      navigate("/home");
    } else if (loginStatus === "failed") {
      toast.error("Login gagal!", {
        duration: 1000,
      });
      setError("Registrasi gagal. Silakan coba lagi.");
    }
  }, [loginStatus, dispatch]);

  const handleLoginClick = async (e) => {
    e.preventDefault();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    if (password.length < 8) {
      setError("Password harus memiliki panjang minimal 8 karakter");
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      console.log("data login form : ", data);
      await dispatch(userLogin(data));
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      dispatch(statusReset());
    }

    console.log("loginstatus di loginform ::: ", loginStatus);
  };

  return (
    <div className="container-login">
      <div className="login-popup">
        <div className="container">
          <form onSubmit={handleLoginClick}>
            <div className="title-row">
              <img className="logo" src={logo} alt="Home" />

              <h2>SIMS PPOB</h2>
            </div>
            <h1>Lengkapi data untuk</h1>
            <h1>membuat akun</h1>
            <input
              className="login-input-text"
              type="text"
              placeholder="masukan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="login-input-text"
              type="password"
              placeholder="masukan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="button-default"
              type="submit"
              style={{ marginTop: 30 }}
            >
              Login
            </button>
          </form>
          <br></br>
          <p>
            belum sudah punya akun? registrasi <Link to="/">di sini</Link>
          </p>
        </div>
      </div>
      <img className="background_login" src={RegistImg} alt="Home" />
    </div>
  );
};

export default RegistForm;
