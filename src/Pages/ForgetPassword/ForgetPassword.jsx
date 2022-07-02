import React, { useEffect, useState } from "react";
import "./ForgetPassword.css";
import Navbar from "../../Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../Assests/navbar/logo.png";
import { connect, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { createForgetPassword } from "../../actions/forgetPasswordAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

function ForgetPassword(props) {
  const [email, setemail] = useState("");

  const forget = async () => {
    const reg =
      /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+).([a-zA-Z]+)$/;
    if (email == "") {
      alert("Email required");
    } else if (reg.test(email) === false) {
      alert("Email is invalid");
    } else {
      await props.createForgetPassword(email);
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4"></div>
          <div className="col-md-4 img-center">
            <img src={Logo} alt="" style={{ width: "200px" }} />
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 img-center mt-5">
            <h2 className="for-recr-head">For Recruiters</h2>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row mt-2">
          <div className="col-md-3"></div>
          <div className="col-md-6 shadow main-forget-recr p-5">
            <h3 className="forget-pass-head-01">Forget your Password?</h3>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                <p className="para-forget-pass">
                  Enter your email address below and we will send you a reset
                  password link.
                </p>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="m-0 p-0 label-color-f-pass">
                  Enter Registered Email ID
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Enter your Email ID"
                  className="w-100 form-control"
                  id="input-forget-pass"
                  style={{ color: "#000" }}
                />
                <Link to="/">
                  <p className="login-instead-for-pass mt-1">
                    Remember your password? Login instead
                  </p>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <button
                  className="btn btn-primary w-100 send-btn-for-pass"
                  onClick={() => forget()}
                >
                  Send
                </button>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          <div className="col-md-3 "></div>
        </div>
        {props.forgetPasswordReducer.loading == true ? (
          <FullPageLoader />
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  forgetPasswordReducer: state.forgetPasswordReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createForgetPassword: (email) => dispatch(createForgetPassword(email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
