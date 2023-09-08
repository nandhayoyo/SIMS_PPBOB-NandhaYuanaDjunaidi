import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";

import "../styles/Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="header-row">
          <h3
            className="header-container"
            onClick={() => (window.location.href = "/home")}
          >
            <img className="logo" src={logo} alt="Home" />
            SIMS PPOB
          </h3>

          <nav className="header-container">
            <ul>
              <li>
                <Link to="/topup">
                  <h5>Top Up</h5>
                </Link>
              </li>
              <li>
                <Link to="/transaction">
                  <h5>Transaction</h5>
                </Link>
              </li>
              <li>
                <Link to="/akun">
                  <h5>Akun</h5>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <hr></hr>
      </div>
    </header>
  );
};

export default Header;
