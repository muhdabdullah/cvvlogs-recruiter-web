import React from "react";
import "./OtpModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

function OptModal() {
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title modal-head-recr-otp"
                id="exampleModalLongTitle"
              >
                OTP Verification
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <p className="modal-para-recr-prem weight-of-otp">
                  Please enter the OTP sent to your entered Mobile Number
                </p>
                <div className="row">
                  <div className="col-md-9 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <button className="btn btn-primary w-100 otp-modal-btn">Submit</button>
                  </div>
                </div>
                <p className="modal-para-recr-prem mt-3 here-to-resend-otp">
                  Didn't received the code? <span className="to-send-otp">Click here to resend</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptModal;
