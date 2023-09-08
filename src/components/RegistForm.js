import React, { useState } from "react";
import "../styles/LoginForm.scss";
import RegistImg from "../assets/images/IllustrasiLogin.png";
import logo from "../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegistForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email tidak valid");
      return;
    }

    if (password.length < 8) {
      toast.error("Password harus memiliki panjang minimal 8 karakter");
      return;
    }

    const data = {
      email,
      first_name,
      last_name,
      password,
    };

    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.app/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Registrasi berhasil!");
        setError("");
        navigate("/loginForm");
      } else {
        toast.error("Registrasi gagal. Silakan coba lagi.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="container-login">
      <div className="login-popup">
        <div className="container">
          <form onSubmit={handleRegistration}>
            <h2>
              <img className="logo" src={logo} alt="Home" />
              SIMS PPOB
            </h2>
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
              type="text"
              placeholder="nama depan"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />

            <input
              className="login-input-text"
              type="text"
              placeholder="nama belakang"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />

            <input
              className="login-input-text"
              type="password"
              placeholder="buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="login-input-text"
              type="password"
              placeholder="konfirmasi password"
            />

            <button
              className="button-default"
              type="submit"
              style={{ marginTop: 30 }}
            >
              Registrasi
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <br></br>
          <p>
            sudah punya akun? login <Link to="/loginForm">di sini</Link>
          </p>
        </div>
      </div>
      <img className="background_login" src={RegistImg} alt="Home" />
    </div>
  );
};

export default RegistForm;
