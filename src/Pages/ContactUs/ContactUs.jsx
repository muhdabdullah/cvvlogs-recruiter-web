import React, { useState, useEffect } from "react";
import "./ContactUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer/Footer";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect, useStore } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { createContact } from "../../actions/contactusAction";
import Modal from "react-modal";
import "../CreateAJob/CreateAJob.css";

function ContactUs(props) {
  const [registerModalIsOpen3, setRegisterModalIsOpen3] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const createContact = async () => {
    await props.createContact(
      localStorage.getItem("auth_id1"),
      name,
      email,
      message
    );
  };
  return (
    <>
      {/* Register Modal3 Starts */}
      <Modal
        isOpen={registerModalIsOpen3}
        onRequestClose={() => setRegisterModalIsOpen3(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          },
          content: {
            position: "absolute",
            margin: "0 auto",
            width: "350px",
            height: "150px",
            top: "20%",
            left: "0",
            right: "0",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
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

        <div className="row  mt-3">
          <div className="col-md-12">
            <p className=" text-center">Thank You for contacting us.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              className="border-0  btn-primary rounded py-1 px-3 w-50"
              style={{ backgroundColor: "var(--purple)" }}
              onClick={() => createContact()}
            >
              Ok
            </button>
          </div>
        </div>
        {/* Heading Starts */}
      </Modal>
      {/* Register Modal3 Ends */}
      <Nav2 />
      <div className="container mt-5 mb-5">
        <h1 className="contact-head-recr">Contact Us</h1>

        <div className="row">
          <div className="col-md-8">
            <div className="row mt-5">
              <div className="col-md-6">
                <label className="salary-range-recr">Full name</label>
                <input
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  className="form-control input-contact-form"
                  placeholder="Enter your full name here"
                />
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="salary-range-recr">Email</label>
                <input
                  type="text"
                  onChange={(e) => setemail(e.target.value)}
                  className="form-control input-contact-form"
                  placeholder="Enter your email here"
                />
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-8">
                <label className="salary-range-recr">Message</label>
                <textarea
                  style={{ height: "210px" }}
                  // cols="2"
                  type="text"
                  onChange={(e) => setmessage(e.target.value)}
                  className="form-control text-area-contact-recr input-contact-form"
                  placeholder="Write your message here in detail"
                />
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <button
                  disabled={
                    !name === false && !email === false && !message === false
                      ? false
                      : true
                  }
                  className="btn btn-primary sub-con-btn w-50"
                  onClick={() => setRegisterModalIsOpen3(true)}
                >
                  Submit
                </button>
              </div>
              <div className="col-md-6"></div>
            </div>
            {props.contactusReducer.loading == true ? <FullPageLoader /> : null}
          </div>
          <div className="col-md-4">
            <h6 className="font-weight-bold" style={{ color: "#865ddd" }}>
              Address
            </h6>
            <p>
              200 Booth Rd. Suite A Ormond Beach, <br />
              FL 32174
            </p>
            <h6 className="font-weight-bold" style={{ color: "#865ddd" }}>
              Email
            </h6>
            <p>Info@cvvlogs.com</p>
            <h6 className="font-weight-bold" style={{ color: "#865ddd" }}>
              Contact Number
            </h6>
            <p>1 (866) 955-9001</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  contactusReducer: state.contactusReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createContact: (userId, name, email, message) =>
    dispatch(createContact(userId, name, email, message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
