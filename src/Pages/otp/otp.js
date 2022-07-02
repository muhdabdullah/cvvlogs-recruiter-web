import React from "react";
import { createOtp } from "../../actions/otpAction";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

function Otp(props) {
  const [code, setcode] = useState("");
  let param = useLocation().search;
  let auth = useLocation().search;
  param = param.split("=");

  const sendOtp = async () => {
    if (code == "") {
      alert("Please enter otp");
    } else {
      if (param[1] === "numberChanged") {
        let newNumber = JSON.parse(localStorage.getItem("newNumber"));
        fetch(
          `${process.env.REACT_APP_API_END_POINT}/web/confirm_update_phone.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              auth_id: localStorage.getItem("auth_id1"),
            },
            body: JSON.stringify({
              number: newNumber.number,
              num_code: newNumber.code,
              code: code,
            }),
          }
        )
          .then((r) => {
            return r.json();
          })
          .then((response) => {
            if (response.status == 200) {
              localStorage.removeItem("newNumber");
              alert(response.message);
              window.location = "/EditCompanyProfile";
            } else {
              alert(response.message);
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        await props.createOtp(
          localStorage.getItem("auth_id1")
            ? localStorage.getItem("auth_id1")
            : auth.slice(6),
          code
        );
      }
    }
  };
  const Resend = async () => {
    if (param[1] === "numberChanged") {
      let newNumber = JSON.parse(localStorage.getItem("newNumber"));
      await fetch(
        `${process.env.REACT_APP_API_END_POINT}/web/send_change_number_otp.php`,
        {
          method: "POST",
          body: JSON.stringify({
            number: newNumber.number,
            num_code: newNumber.code,
          }),

          headers: {
            auth_id: localStorage.getItem("auth_id1"),
            "Content-Type": "application/json",
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
    } else {
      await fetch(`${process.env.REACT_APP_API_END_POINT}/web/resend.php`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_id: `${
            localStorage.getItem("auth_id1")
              ? localStorage.getItem("auth_id1")
              : auth.slice(6)
          }`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          alert(response.message);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
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
            <div className="row ">
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
                  onClick={() => Resend()}
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
  createOtp: (userId, code) => dispatch(createOtp(userId, code)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Otp);
