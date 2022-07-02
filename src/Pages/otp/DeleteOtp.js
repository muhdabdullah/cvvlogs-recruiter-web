import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { DeleteOtpAction } from "../../actions/DeleteOtpAction";

function DisableOtp(props) {
  const [code, setcode] = useState("");

  const sendOtp = async () => {
    const auth = localStorage.getItem("auth_id1");
    if (code == "") {
      alert("Please enter otp");
    } else {
      await props.DeleteOtpAction(auth, code);
    }
  };
  const ResendOtp = async () => {
    await fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/send_delete_account_otp.php`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_id: `${localStorage.getItem("auth_id1")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-md-12">
          <h1
            className="text-center font-weight-bold"
            style={{ color: "#865ddd" }}
          >
            Enter OTP
          </h1>
          <p
            style={{ color: "#011F95" }}
            className="font-weight-bold text-center"
          >
            Check your phone for OTP
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 shadow p-5" style={{ borderRadius: "15px" }}>
          <div>
            <label>Enter OTP</label>
            <input
              onChange={(e) => setcode(e.target.value)}
              type="number"
              className="form-control mb-5"
              placeholder="Enter the 4 digit OTP"
            />
            <div className="row justify-content-center">
              <div className="col-6">
                <button
                  style={{ background: "#865ddd", color: "#fff" }}
                  onClick={() => sendOtp()}
                  className="btn btn-primar w-100 font-weight-bold"
                >
                  Submit
                </button>
              </div>

              <div className="col-6">
                <button
                  style={{ background: "#865ddd", color: "#fff" }}
                  onClick={() => ResendOtp()}
                  className="btn btn-primar w-100 font-weight-bold"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
      {props.otpReducer.loading == true ? <FullPageLoader /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  otpReducer: state.otpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  DeleteOtpAction: (userId, code) => dispatch(DeleteOtpAction(userId, code)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DisableOtp);
