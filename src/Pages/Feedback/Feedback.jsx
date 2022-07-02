import React from "react";
import { useState } from "react";
import Nav2 from "../../Components/Nav2/Nav2";
import { feedBack } from "../../actions/feedbackAction";
import { connect } from "react-redux";
import Footer from "../../Components/Footer/Footer";

function Feedback(props) {
  const [message, setMessage] = useState("");

  return (
    <>
      <Nav2 />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-2"></div>
          <h1 className="col-md-8 d-flex justify-content-center create-job-recr-head">
            Feedback
          </h1>
          <div className="col-md-2"></div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 shadow p-5 per-det-main">
              <h1 style={{ fontSize: "23px" }}>
                What did you like the most? What did you like the least?
              </h1>
              <div className="row">
                <div className="col-12">
                  <label
                    className="per-det-label mt-3"
                    style={{ color: "#865ddd", fontWeight: "bold" }}
                  >
                    Write a review
                  </label>
                  <textarea
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    value={message}
                    type="text"
                    className="form-control"
                    style={{ height: "300px" }}
                    placeholder="Write your review here"
                  />
                </div>
                <div className="col-12 my-2 d-flex justify-content-center">
                  <button
                    className="btn btn-primary w-100 create-job-btn-recr"
                    disabled={!message}
                    onClick={() => {
                      props.feedBack(localStorage.getItem("auth_id1"), message);
                      setMessage("");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </form>
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  feedBack: (userId, message) =>
    dispatch(feedBack(userId, message, "feedback screen")),
});
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
