import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { SignIn } from "../../actions/authAction";
import { connect } from "react-redux";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link, useHistory } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { Helmet } from "react-helmet";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // useEffect(async () => {
  //   await navigator.geolocation.getCurrentPosition((position) => {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GMAP_API}`,
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((response) => {
  //         console.log(response);
  //         localStorage.setItem(
  //           "userCurrentLocation",
  //           response.results.find((x) => x.types[0] == "country")
  //             .formatted_address
  //         );
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   });
  // }, []);
  const AddLogin = async () => {
    const reg =
      /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+).([a-zA-Z]+)$/;
    if (username == "") {
      alert("Email required");
    } else if (reg.test(username) === false) {
      alert("Email is invalid");
    } else if (password == "") {
      alert("Password required");
    } else if (password.length < 6) {
      alert("Password length must be greater than 6");
    } else {
      await props.SignIn(username, password);
    }
  };

  var history = useHistory();
  if (
    localStorage.getItem("auth_id1") !== null &&
    localStorage.getItem("auth_id1") !== undefined &&
    localStorage.getItem("auth_id1") !== ""
  ) {
    history.push("/dashboard");
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <meta name="description" content="Welcome to cvvlogs" />
      </Helmet>
      {/* <Navbar /> */}
      <div className="container-fluid back-img-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-5"></div>
            <div className="col-lg-4 col-md-7 main-login-form shadow p-5">
              {/* Login Head Starts */}
              <div className="row">
                <div className="col-md-12">
                  <h1 className="recr-login-head">Recruiter Login</h1>
                </div>
              </div>
              {/* Login Head Ends */}
              <label className="p-0 m-0 recr-login-label mt-1">
                Username or Email
              </label>
              <input
                type="email"
                required
                className="form-control recr-login-input"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type your username or email"
              />
              <label className="p-0 m-0 recr-login-label mt-2">Password</label>
              <input
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    console.log("enterrrr");
                    AddLogin();
                  }
                }}
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password"
                className="form-control recr-login-input"
              />
              <div className="row">
                <div className="col-md-12">
                  <Link to="/forgetpassword">
                    <p className="forget-pass-login">Forget Password?</p>
                  </Link>
                </div>
              </div>
              {/* Button Starts */}
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <input
                    type="submit"
                    className="btn btn-primary w-100 login-recr-btn form-control"
                    onClick={() => AddLogin()}
                    value="Log In"
                    // disabled={
                    //   !username === false && !password === false ? false : true
                    // }
                  />
                </div>
                <div className="col-md-1"></div>
              </div>
              {/* Button Ennds */}
              {/* Hr starts */}
              <div className="row">
                <div className="col-md-12 ">
                  <hr className="horizon-rule-reg" />
                </div>
              </div>
              {/* Hr Emnds */}

              {/* Register Here Starts*/}
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="dont-account-login">
                    Don't have an Account?{" "}
                    <Link to="/register">
                      <span className="reg-here-login">Register here</span>
                    </Link>
                  </p>
                </div>
              </div>
              {/* Register Here Ends*/}
            </div>
          </div>
        </div>
        {props.auth.loading == false ? <FullPageLoader /> : null}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  SignIn: (username, password) => dispatch(SignIn(username, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
