import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import "./Nav2.css";
import DisableOtp from "../../Pages/otp/DisableOtp";
import DeleteOtp from "../../Pages/otp/DeleteOtp";
import Logo from "../../Assests/navbar/logo.png";
import facebook from "../../Assests/navbar/facebook.svg";
import linkedin from "../../Assests/navbar/linkedin.svg";
import { signOut } from "../../actions/authAction";
import { connect } from "react-redux";
import Modal from "react-modal";
import { FeedbackModalAction } from "../../actions/feedbackModalAction";
import { feedBack } from "../../actions/feedbackAction";

function Nav2(props) {
  let [disableOtpMOdel, setDisableOtpModel] = useState(false);
  let [deleteOtpMOdel, setDeleteOtpModel] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GMAP_API}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          localStorage.setItem(
            "userCurrentLocation",
            response.results.find((x) => x.types[0] == "country")
              .formatted_address
          );
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
    if (localStorage.getItem("isFirstLogin") == 1) {
      props.FeedbackModalAction(true);
    }
  }, []);
  const OTP = () => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/disable_otp.php`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        auth_id: localStorage.getItem("auth_id1"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          window.location = "otp-disable";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteAccount = () => {
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/send_delete_account_otp.php`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          auth_id: localStorage.getItem("auth_id1"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          window.location = "otp-delete";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
      <div className="container">
        <Link to="/dashboard">
          <img src={Logo} height="50px" />
        </Link>
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
            <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link"
                aria-current="page"
                to="/dashboard"
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link "
                aria-current="page"
                to="/messages"
              >
                MESSAGES
              </NavLink>
            </li>
            {/* <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link"
                aria-current="page"
                to="/whatwedo"
                exact
              >
                HOW IT WORKS
              </NavLink>
            </li>
            <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link"
                aria-current="page"
                to="/about-us"
              >
                ABOUT US
              </NavLink>
            </li> */}
            {/* <li className="nav-item mr-2 main-li-of-nav">
            <NavLink
              activeClassName="linkhighlight"
              exact
                className="nav-link"
                aria-current="page"
                to="/contact-us"
              >
                CONTACT US
              </NavLink>
            </li> */}
            <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link"
                aria-current="page"
                to="/Addtofav"
              >
                FAVORITES
              </NavLink>
            </li>
            <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link"
                aria-current="page"
                to="/CreateAJob"
              >
                POST A JOB
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn dropdown-toggle p-0 py-1 px-2 mt-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="btn-nav-user"
                  style={{ fontSize: "10px", borderRadius: "7px" }}
                >
                  <i className="far fa-user pr-1"></i>
                  {localStorage.getItem("name")}
                </button>
                <ul className="dropdown-menu">
                  <li
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  >
                    <Link className="dropdown-item" to="/CompanyProfile">
                      View{` & `}Edit Profile
                    </Link>
                  </li>
                  <li
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  >
                    <Link className="dropdown-item" onClick={() => OTP()}>
                      Disable Account
                    </Link>
                  </li>
                  <li
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      className="dropdown-item"
                      onClick={() => DeleteAccount()}
                    >
                      Delete Account
                    </Link>
                  </li>
                  {/* <li
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  >
                    <a className="dropdown-item">
                      Settings
                    </a>
                  </li> */}
                  <li
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  >
                    <a
                      className="dropdown-item"
                      onClick={() => props.signOut()}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* <li className="nav-item mr-3">
              <Link
                className="nav-link active p-0 px-2 py-1 mt-1"
                aria-current="page"
                to="/PremiumPackage"
                style={{ background: "#FCA120", color: "#fff", fontSize: "12px", borderRadius: "6px" }}
              >
                <i className="far fa-gem pr-1"></i>PACKAGES
              </Link>
            </li> */}
            <li className="nav-item mr-3">
              <Link
                className="nav-link active p-0 px-2 py-1 mt-1"
                aria-current="page"
                to={"Premium"}
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
                href="https://www.facebook.com/CV-Flicks-100191795580154/?ti=as"
                target="_blank"
              >
                <img src={facebook} alt="" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active main-li-of-nav"
                aria-current="page"
                href="https://www.linkedin.com/company/cvflicks"
                target="_blank"
              >
                <img src={linkedin} alt="" />
              </a>
            </li>
          </ul>
          <Modal
            isOpen={props.feedbackModalReducer.feedbackModal}
            onRequestClose={() => {
              props.FeedbackModalAction(false);
            }}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: "1",
              },
              content: {
                position: "absolute",
                margin: "0 auto",
                width: "500px",
                height: "500px",
                top: "40px",
                left: "0",
                border: "1px solid #ccc",
                background: "#fff",
                borderRadius: "4px",
                outline: "none",
                padding: "20px",
                boxShadow: "0 0 5px 5px #f2f2f2",
                borderRadius: "20px",
                background: "#fff",
                border: "1px solid #fff",
              },
            }}
          >
            {/* Heading Starts */}
            <div className="row">
              <div className="col-md-12">
                <h1
                  style={{
                    color: "#865ddd",
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Feedback
                </h1>
                <p>
                  Thank you for choosing our services . It's our priority to
                  continue providing quality service to customers like you .
                  Please leave us a review in the comment box below . It will
                  only take a minute but will make a huge difference to our
                  company.
                </p>
              </div>
            </div>
            {/* Heading Starts */}

            {/* input Starts */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-md-12">
                  <textarea
                    placeholder="Enter Your feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    cols="30"
                    rows="10"
                    style={{ color: "#000" }}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              {/* input Ends */}

              {/* Forget Pass Div Starts*/}
              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary w-100 btn-main-home-recr"
                    onClick={() =>
                      props.feedBack(localStorage.getItem("auth_id1"), feedback)
                    }
                    disabled={!feedback === false ? false : true}
                  />
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  feedbackModalReducer: state.feedbackModalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  feedBack: (userId, feedback) =>
    dispatch(feedBack(userId, feedback, "pop up")),
  FeedbackModalAction: (toggle) => dispatch(FeedbackModalAction(toggle)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav2);
