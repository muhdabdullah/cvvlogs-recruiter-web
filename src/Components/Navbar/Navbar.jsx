import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import Logo from "../../Assests/navbar/logo.png";
import facebook from "../../Assests/navbar/facebook.svg";
import linkedin from "../../Assests/navbar/linkedin.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
      <div className="container">
        <img src={Logo} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item mr-2">
              <Link
                className="nav-link active main-li-of-nav"
                aria-current="page"
                to="/"
              >
                HOME
              </Link>
            </li>
            <li className="nav-item mr-2">
              <Link
                className="nav-link active main-li-of-nav"
                aria-current="page"
                to="/"
              >
                MESSAGES
              </Link>
            </li>
            <li className="nav-item mr-2">
              <Link
                className="nav-link active main-li-of-nav"
                aria-current="page"
                to="/whatwedo"
              >
                WHAT WE DO
              </Link>
            </li>
            <li className="nav-item mr-2">
              <Link
                className="nav-link active main-li-of-nav"
                aria-current="page"
                to="/"
              >
                LOGIN
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                className="nav-link active p-0 px-2 py-1 mt-1"
                aria-current="page"
                to="/register"
                style={{
                  background: "#865DDD",
                  color: "#fff",
                  fontSize: "12px",
                  borderRadius: "6px",
                }}
              >
                REGISTER
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                className="nav-link active p-0 px-2 py-1 mt-1"
                aria-current="page"
                to="/"
                style={{
                  background: "#FCA120",
                  color: "#fff",
                  fontSize: "12px",
                  borderRadius: "6px",
                }}
              >
                <i className="far fa-gem pr-1"></i>PACKAGES
              </Link>
            </li>
            <li className="nav-item mr-2">
              <a
                className="nav-link active main-li-of-nav"
                aria-current="page"
                href="https://www.facebook.com/CV-Flicks-100191795580154/?ti=as" target="_blank"
              >
                <img src={facebook} alt="" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active main-li-of-nav"
                aria-current="page"
                href="https://www.linkedin.com/company/cvflicks" target="_blank"
              >
                <img src={linkedin} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
