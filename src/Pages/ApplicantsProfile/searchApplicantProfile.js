import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ApplicantsProfile.css";
import ProfilePic from "../../Assests/applicants-profile/profile.png";
import LocationIcon from "../../Assests/applicants-video-cv/location.svg";
import MessageIcon from "../../Assests/applicants-video-cv/message.svg";
import CallIcon from "../../Assests/applicants-video-cv/call.svg";
import ReportButton from "../../Assests/edit-profile/report-button.svg";
import EditIcon from "../../Assests/applicants-video-cv/edit.svg";
import SucIcon from "../../Assests/applicants-video-cv/successfull-icon.svg";
import UnSucIcon from "../../Assests/applicants-video-cv/unsuccessfull-icon.svg";
import Nav2 from "../../Components/Nav2/Nav2";
import Footer from "../../Components/Footer/Footer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../actions/userprofileAction";
import { useLocation } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import place from "../../Assests/placeholder.png";
import Modal from "react-modal";
import vidplace from "../../Assests/videoplace.png";
import ReactPlayer from "react-player";

function SearchApplicantsProfile(props) {
  const [registerModalIsOpen3, setRegisterModalIsOpen3] = useState(false);
  const [registerModalIsOpen4, setRegisterModalIsOpen4] = useState(false);
  const [registerModalIsOpen5, setRegisterModalIsOpen5] = useState(false);
  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id");
  useEffect(() => {
    jobData(localStorage.getItem("auth_id1"), compIds);
  }, []);

  const jobData = async (userId, id) => {
    await props.getUserProfile(userId, id);
    return null;
  };
  return (
    <>
      {/* Register Modal3 Starts */}
      <Modal
        isOpen={registerModalIsOpen5}
        onRequestClose={() => setRegisterModalIsOpen5(false)}
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
            width: "450px",
            height: "200px",
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
        <div className="row">
          <div className="col-md-12">
            <h1 className="register-head text-center">Attention!</h1>
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-md-12">
            <p className=" text-center">You have reported this candidate.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              className="border-0 btn-primary rounded py-1 px-3"
              onClick={() => setRegisterModalIsOpen5(false)}
            >
              Ok
            </button>
          </div>
        </div>
        {/* Heading Starts */}
      </Modal>
      {/* Register Modal5 Ends */}

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
            width: "450px",
            height: "200px",
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
        <div className="row">
          <div className="col-md-12">
            <h1 className="register-head text-center">Attention!</h1>
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-md-12">
            <p className=" text-center">You are reported by this candidate.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              className="border-0 btn-primary rounded py-1 px-3"
              onClick={() => setRegisterModalIsOpen3(false)}
            >
              Ok
            </button>
          </div>
        </div>
        {/* Heading Starts */}
      </Modal>
      {/* Register Modal3 Ends */}

      {/* Register Modal4 Starts */}
      <Modal
        isOpen={registerModalIsOpen4}
        onRequestClose={() => setRegisterModalIsOpen4(false)}
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
            width: "450px",
            height: "430px",
            top: "10%",
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
        <div className="row">
          <div className="col-md-12">
            <h1 className="register-head text-center">Attention!</h1>
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-md-12">
            <p className=" text-center">
              At CVVLOGS we do our best to ensure the availability of applicants
              shown on our portal. However it is possible that certain
              applicants may have been shortlisted earlier and could be in talks
              with other potential employers. If you shortlist a applicant and
              they are not available, please send us a email and our team will
              credit or refund the full amount within 48 hours .
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center pl-4 py-4">
            <h5 className="text-danger">Upgrade to premium</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <Link
              to={`/PremiumPackage?id=${
                props.userprofileReducer.userprofile.user_personal &&
                props.userprofileReducer.userprofile.user_personal.id !==
                  null &&
                props.userprofileReducer.userprofile.user_personal.id !==
                  undefined &&
                props.userprofileReducer.userprofile.user_personal.id !== ""
                  ? props.userprofileReducer.userprofile.user_personal.id
                  : ""
              }?sid=${compIds}`}
            >
              <button className="border-0 btn-primary rounded py-1 px-3">
                Agree
              </button>
            </Link>
          </div>
        </div>
        {/* Heading Starts */}
      </Modal>
      {/* Register Modal4 Ends */}

      <Nav2 />
      <div className="container">
        {/* <button onClick={() => console.log("ggggggggg", props.userprofileReducer.userprofile)}>hhhhhhhh</button> */}
        {/* Profile Section Starts */}
        <div className="row shadow mt-5 p-5 main-border-rad-editprof">
          <div className="col-md-10">
            <div className="row">
              <div
                className="col-lg-3 col-md-5 col-10 border py-3"
                style={{ borderRadius: "10px" }}
              >
                {props.userprofileReducer.userprofile.user_personal &&
                props.userprofileReducer.userprofile.user_personal.dp !==
                  "http://api.cvvlogs.com/cv-tube/api.v.1/user/" &&
                props.userprofileReducer.userprofile.user_personal.dp !== "" ? (
                  <img
                    src={
                      props.userprofileReducer.userprofile.user_personal.dp !==
                        null &&
                      props.userprofileReducer.userprofile.user_personal.dp !==
                        undefined
                        ? props.userprofileReducer.userprofile.user_personal.dp
                        : ""
                    }
                    width="100%"
                    height="150px"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  />
                ) : (
                  <div className="text-center">
                    <i
                      className="far fa-user fa-7x"
                      style={{ color: "lightgray" }}
                    ></i>
                  </div>
                )}
                {props.userprofileReducer.userprofile.hired === "1" ? (
                  <div
                    style={{
                      background: "rgba(220, 20, 60, 0.5)",
                      height: "32px",
                      width: "184px",
                      position: "absolute",
                      color: "#fff",
                      bottom: "68px",
                    }}
                    className="text-center"
                  >
                    <h4 className="p-0 m-0">Hired</h4>
                  </div>
                ) : null}
              </div>
              <div className="col-lg-9 col-md-7 my-auto">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h4 className="name-applicants-recr m-0 p-0">
                      {props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal
                        .first_name !== null &&
                      props.userprofileReducer.userprofile.user_personal
                        .first_name !== undefined
                        ? props.userprofileReducer.userprofile.user_personal
                            .first_name
                        : ""}{" "}
                      {props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal
                        .last_name !== null &&
                      props.userprofileReducer.userprofile.user_personal
                        .last_name !== undefined
                        ? props.userprofileReducer.userprofile.user_personal
                            .last_name
                        : ""}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="prof-appli-rexr">
                      {props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal
                        .prof !== null &&
                      props.userprofileReducer.userprofile.user_personal
                        .prof !== undefined
                        ? props.userprofileReducer.userprofile.user_personal
                            .prof
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3 ">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="row">
                          <div className="col-md-2 col-2">
                            <img src={LocationIcon} alt="" />
                          </div>
                          <div className="col-md-10 col-10">
                            <p className="loceditprof-appl-prof">
                              {props?.userprofileReducer?.userprofile
                                ?.user_personal
                                ? `${props.userprofileReducer.userprofile.user_personal.country}, ${props.userprofileReducer.userprofile.user_personal.state}, ${props.userprofileReducer.userprofile.user_personal.city}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3 d-flex justify-content-end">
                {/* <img src={ReportButton} alt="" /> */}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-3"></div>

              <div className="col-md-9">
                {props.userprofileReducer.userprofile &&
                props.userprofileReducer.userprofile.user_personal &&
                props.userprofileReducer.userprofile.user_personal
                  .reported_by !== null &&
                props.userprofileReducer.userprofile.user_personal
                  .reported_by !== undefined &&
                props.userprofileReducer.userprofile.user_personal
                  .reported_by !== "" ? (
                  props.userprofileReducer.userprofile.user_personal
                    .reported_by == 1 ? (
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen5(true)}
                    >
                      Message
                    </button>
                  ) : props.userprofileReducer.userprofile.user_personal
                      .reported_by == 2 ? (
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen3(true)}
                    >
                      Message
                    </button>
                  ) : //this
                  props.userprofileReducer.userprofile &&
                    props.userprofileReducer.userprofile.hired !== null &&
                    props.userprofileReducer.userprofile.hired !== undefined &&
                    props.userprofileReducer.userprofile.hired !== "" &&
                    props.userprofileReducer.userprofile.hired == "0" ? (
                    props.userprofileReducer.userprofile &&
                    props.userprofileReducer.userprofile.premium_status !==
                      null &&
                    props.userprofileReducer.userprofile.premium_status !==
                      undefined &&
                    props.userprofileReducer.userprofile.premium_status !==
                      "" &&
                    props.userprofileReducer.userprofile.premium_status == 1 ? (
                      props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal
                        .reported !== null &&
                      props.userprofileReducer.userprofile.user_personal
                        .reported !== undefined &&
                      (props.userprofileReducer.userprofile.user_personal
                        .reported !==
                        null) !==
                        "" &&
                      props.userprofileReducer.userprofile.user_personal
                        .reported == 0 ? (
                        props.userprofileReducer.userprofile.user_personal &&
                        props.userprofileReducer.userprofile.user_personal
                          .first_name !== null &&
                        props.userprofileReducer.userprofile.user_personal
                          .first_name !== undefined &&
                        props.userprofileReducer.userprofile.user_personal
                          .first_name !== "" ? (
                          props.userprofileReducer.userprofile &&
                          props.userprofileReducer.userprofile.chat_id !==
                            null &&
                          props.userprofileReducer.userprofile.chat_id !==
                            undefined &&
                          props.userprofileReducer.userprofile.chat_id !==
                            "" ? (
                            <Link
                              to={`/messages?id=${compIds}?cid=${
                                props.userprofileReducer.userprofile.chat_id
                              }?name=${
                                props.userprofileReducer.userprofile
                                  .user_personal.first_name +
                                " " +
                                props.userprofileReducer.userprofile
                                  .user_personal.last_name
                              }`}
                            >
                              <button className="btn btn-primary w-100 view-prof-btn-rexr">
                                Message
                              </button>
                            </Link>
                          ) : (
                            <Link
                              to={`/messages?id=${compIds}?name=${
                                props.userprofileReducer.userprofile
                                  .user_personal.first_name +
                                " " +
                                props.userprofileReducer.userprofile
                                  .user_personal.last_name
                              }`}
                            >
                              {" "}
                              <button className="btn btn-primary w-100 view-prof-btn-rexr">
                                Message
                              </button>
                            </Link>
                          )
                        ) : (
                          <Link to={`/messages?id=${compIds}`}>
                            {" "}
                            <button className="btn btn-primary w-100 view-prof-btn-rexr">
                              Message
                            </button>
                          </Link>
                        )
                      ) : (
                        <button
                          className="btn btn-primary w-100 view-prof-btn-rexr"
                          onClick={() => setRegisterModalIsOpen3(true)}
                        >
                          Message
                        </button>
                      )
                    ) : (
                      <button
                        className="btn btn-primary w-100 view-prof-btn-rexr"
                        onClick={() => setRegisterModalIsOpen4(true)}
                      >
                        Message
                      </button>
                    )
                  ) : (
                    <Link
                      to={`/messages?id=${compIds}?cid=${
                        props.userprofileReducer.userprofile.chat_id
                      }?name=${
                        props.userprofileReducer.userprofile.user_personal
                          .first_name +
                        " " +
                        props.userprofileReducer.userprofile.user_personal
                          .last_name
                      }`}
                    >
                      <button className="btn btn-primary w-100 view-prof-btn-rexr">
                        Message
                      </button>
                    </Link>
                  )
                ) : (
                  //this

                  <button
                    className="btn btn-primary w-100 view-prof-btn-rexr"
                    onClick={() => setRegisterModalIsOpen4(true)}
                  >
                    Message
                  </button>
                )}
                {/* <Link to={`/messages?id=${compIds}`}>
                <button className="btn btn-primary w-100 view-prof-btn-rexr">
                  Message
                </button>
                </Link> */}
              </div>
            </div>
            {/* <div className="row mt-3">
              <div className="col-md-3"></div>
              <div className="col-md-9">
                <button className="btn btn-primary w-100 view-prof-btn-rexr">
                  Shortlist
                </button>
              </div>
            </div> */}
          </div>
        </div>
        {/* Profile Section Ends */}

        {/* Headline Column Starts */}
        <div className="row mt-5 shadow main-border-rad-editprof">
          {/* <div className="col-md-1"></div> */}
          {/* <div className="col-md-2">
            <p className="edit-prof-text">Headline</p>
          </div> */}
          <div className="col-md-3">
            <p className="edit-prof-text">Personal</p>
          </div>
          <div className="col-md-2">
            <p className="edit-prof-text">Professional</p>
          </div>
          <div className="col-md-3">
            <p className="edit-prof-text">Qualification</p>
          </div>
          <div className="col-md-2">
            <p className="edit-prof-text">Key Skills</p>
          </div>
          {/* <div className="col-md-1"></div> */}
        </div>
        {/* Headline Column Ends */}

        {/* Main Works Starts here */}
        <div className="row mt-5">
          {/* <div className="col-md-3">
            <div className="row">
              <div className="col-md-12 shadow pt-3 pb-3 main-border-rad-editprof">
                <div className="row">
                  <div className="col-md-7">
                    <button className="edit-btn-apll-vid-rexr">
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <h2 className="applic-stat-recr p-0 m-0">
                      Application Status
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="app-stst-para">
                      Shows the progression of applicant's application
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <img src={SucIcon} alt="" />
                  </div>
                  <div className="col-md-10">
                    <p className="shortlist-text-rexr">Shortlisted</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <img src={UnSucIcon} alt="" />
                  </div>
                  <div className="col-md-10">
                    <p className="prog-up-recr">Interview</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <img src={UnSucIcon} alt="" />
                  </div>
                  <div className="col-md-10">
                    <p className="prog-up-recr">Hired</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-md-4"></div>
          <div className="col-md-8 shadow p-5 main-border-rad-editprof">
            <div className="row">
              <div className="col-md-12">
                <h4 className="cv-video-head-rcvr">VIDEO CV</h4>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <p className="para-head-vid-revr">
                  Upload a recording while explaining your personal and
                  professional information
                </p>
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-12">
                <div className="embed-responsive embed-responsive-16by9">
                  {props.userprofileReducer.userprofile.user_personal &&
                  props.userprofileReducer.userprofile.user_personal
                    .vid_link !== null &&
                  props.userprofileReducer.userprofile.user_personal
                    .vid_link !== undefined ? (
                    //   <iframe
                    //   className="embed-responsive-item"
                    //   src={props.userprofileReducer.userprofile.user_personal.vid_link}
                    //   allowFullScreen
                    // />
                    <ReactPlayer
                      url={
                        props.userprofileReducer.userprofile.user_personal
                          .vid_link
                      }
                      playing={true}
                      controls
                      className="react-player h-75"
                    />
                  ) : (
                    <img src={vidplace} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Works Ends here */}

        {/* Headline Starts Here */}
        {/* <div className="row mt-5 mb-5">
          <div className="col-md-4"></div>
          <div className="col-md-8 shadow p-5 main-border-rad-editprof">
            <div className="row">
              <div className="col-md-12">
                <h2 className="cv-video-head-rcvr">Headline</h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <p className="para-head-vid-revr">
                  {
                    props.userprofileReducer.userprofile.user_personal && props.userprofileReducer.userprofile.user_personal.headline !== null &&
                      props.userprofileReducer.userprofile.user_personal.headline !== undefined ?
                      props.userprofileReducer.userprofile.user_personal.headline : ""
                  }
                </p>
              </div>
            </div>
          </div>
        </div> */}
        {/* Headline Ends Here */}

        {/* Personal Details Starts Here */}
        <div className="row mt-5 mb-5">
          <div className="col-md-4"></div>
          <div className="col-md-8 shadow p-5 main-border-rad-editprof">
            <div className="row">
              <div className="col-md-12">
                <h2 className="cv-video-head-rcvr">Personal Details</h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <h6>First Name</h6>
                <p>
                  {props.userprofileReducer.userprofile.user_personal &&
                  props.userprofileReducer.userprofile.user_personal
                    .first_name !== null &&
                  props.userprofileReducer.userprofile.user_personal
                    .first_name !== undefined
                    ? props.userprofileReducer.userprofile.user_personal
                        .first_name
                    : ""}
                </p>
                <h6>Last Name</h6>
                <p>
                  {props.userprofileReducer.userprofile.user_personal &&
                  props.userprofileReducer.userprofile.user_personal
                    .last_name !== null &&
                  props.userprofileReducer.userprofile.user_personal
                    .last_name !== undefined
                    ? props.userprofileReducer.userprofile.user_personal
                        .last_name
                    : ""}
                </p>
                {localStorage.getItem("eco_complaince") == 0 ? (
                  <>
                    <h6>Date Of Birth</h6>
                    <p>
                      {props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal.dob !==
                        null &&
                      props.userprofileReducer.userprofile.user_personal.dob !==
                        undefined
                        ? props.userprofileReducer.userprofile.user_personal.dob
                        : ""}
                    </p>
                  </>
                ) : null}{" "}
                {localStorage.getItem("eco_complaince") == 0 ? (
                  <>
                    <h6>Gender</h6>
                    <p>
                      {props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal
                        .gender !== null &&
                      props.userprofileReducer.userprofile.user_personal
                        .gender !== undefined
                        ? props.userprofileReducer.userprofile.user_personal
                            .gender
                        : ""}
                    </p>
                  </>
                ) : null}{" "}
                {/* <h6>Phone Number</h6>
             <p>
             {props.userprofileReducer.userprofile.user_personal&&props.userprofileReducer.userprofile.user_personal.number!==null&&
                          props.userprofileReducer.userprofile.user_personal.number!==undefined?props.userprofileReducer.userprofile.user_personal.number:""
                          }
             </p> */}
                {props.userprofileReducer.userprofile.user_personal &&
                props.userprofileReducer.userprofile.user_personal.country !==
                  null &&
                props.userprofileReducer.userprofile.user_personal.country !==
                  undefined &&
                props.userprofileReducer.userprofile.user_personal.country !==
                  "" ? (
                  <>
                    <h6>Address</h6>
                    <p>
                      {props?.userprofileReducer?.userprofile?.user_personal
                        ? `${props.userprofileReducer.userprofile.user_personal.country}, ${props.userprofileReducer.userprofile.user_personal.state}, ${props.userprofileReducer.userprofile.user_personal.city}`
                        : ""}
                    </p>
                  </>
                ) : (
                  ""
                )}
                {localStorage.getItem("eco_complaince") == 0 ? (
                  props?.userprofileReducer?.userprofile?.user_personal
                    ?.marital_status ? (
                    <>
                      <h6>Marital Status</h6>
                      <p>
                        {
                          props.userprofileReducer.userprofile.user_personal
                            .marital_status
                        }
                      </p>
                    </>
                  ) : null
                ) : null}
                {localStorage.getItem("eco_complaince") == 0 ? (
                  <>
                    <h6>Nationality</h6>
                    <p>
                      {props.userprofileReducer.userprofile.user_personal &&
                      props.userprofileReducer.userprofile.user_personal
                        .nationality !== null &&
                      props.userprofileReducer.userprofile.user_personal
                        .nationality !== undefined
                        ? props.userprofileReducer.userprofile.user_personal
                            .nationality
                        : ""}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* Personal Details Ends Here */}

        {/* Professional Details Starts Here */}
        <div className="row mt-5 mb-5">
          <div className="col-md-4"></div>
          <div className="col-md-8 shadow p-5 main-border-rad-editprof">
            <div className="row">
              <div className="col-md-12">
                <h2 className="cv-video-head-rcvr">Professional Details</h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <h6>Total Work Experience</h6>
                <p>
                  {props.userprofileReducer.userprofile.proffessional &&
                  props.userprofileReducer.userprofile.proffessional
                    .work_exp !== null &&
                  props.userprofileReducer.userprofile.proffessional
                    .work_exp !== undefined
                    ? props.userprofileReducer.userprofile.proffessional
                        .work_exp
                    : ""}
                </p>
                <h6>Industry</h6>
                <p>
                  {props.userprofileReducer.userprofile.proffessional &&
                  props.userprofileReducer.userprofile.proffessional.ind !==
                    null &&
                  props.userprofileReducer.userprofile.proffessional.ind !==
                    undefined
                    ? props.userprofileReducer.userprofile.proffessional.ind
                    : ""}
                </p>
                <h6>Career Level</h6>
                <p>
                  {props.userprofileReducer.userprofile.proffessional &&
                  props.userprofileReducer.userprofile.proffessional.func !==
                    null &&
                  props.userprofileReducer.userprofile.proffessional.func !==
                    undefined
                    ? props.userprofileReducer.userprofile.proffessional.func
                    : ""}
                </p>
                <h6>Annual Salary</h6>
                <p>
                  {props.userprofileReducer.userprofile.proffessional &&
                  props.userprofileReducer.userprofile.proffessional.sal !==
                    null &&
                  props.userprofileReducer.userprofile.proffessional.sal !==
                    undefined
                    ? props.userprofileReducer.userprofile.proffessional.sal
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Professional Details Ends Here */}

        {/* Qualifications Details Starts Here */}
        <div className="row mt-5 mb-5">
          <div className="col-md-4"></div>
          <div className="col-md-8 shadow p-5 main-border-rad-editprof">
            <div className="row">
              <div className="col-md-12">
                <h2 className="cv-video-head-rcvr">Qualifications Details</h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <h6>Qualification</h6>
                <p>
                  {props.userprofileReducer.userprofile.education &&
                  props.userprofileReducer.userprofile.education
                    .qualification !== null &&
                  props.userprofileReducer.userprofile.education
                    .qualification !== undefined
                    ? props.userprofileReducer.userprofile.education
                        .qualification
                    : ""}
                </p>
                <h6>Course Type</h6>
                <p>
                  {props.userprofileReducer.userprofile.education &&
                  props.userprofileReducer.userprofile.education.course !==
                    null &&
                  props.userprofileReducer.userprofile.education.course !==
                    undefined
                    ? props.userprofileReducer.userprofile.education.course
                    : ""}
                </p>
                <h6>Course Specialization</h6>
                <p>
                  {props.userprofileReducer.userprofile.education &&
                  props.userprofileReducer.userprofile.education
                    .course_specialization !== null &&
                  props.userprofileReducer.userprofile.education
                    .course_specialization !== undefined
                    ? props.userprofileReducer.userprofile.education
                        .course_specialization
                    : ""}
                </p>
                <h6>Institute Name</h6>
                <p>
                  {props.userprofileReducer.userprofile.education &&
                  props.userprofileReducer.userprofile.education
                    .institute_name !== null &&
                  props.userprofileReducer.userprofile.education
                    .institute_name !== undefined
                    ? props.userprofileReducer.userprofile.education
                        .institute_name
                    : ""}
                </p>
                <h6>Institute Location</h6>
                <p>
                  {props.userprofileReducer.userprofile.education &&
                  props.userprofileReducer.userprofile.education.country !==
                    null &&
                  props.userprofileReducer.userprofile.education.country !==
                    undefined
                    ? props.userprofileReducer.userprofile.education.country
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Qualifications Details Ends Here */}

        {/* Key Skills Starts Here */}
        <div className="row mt-5 mb-5">
          <div className="col-md-4"></div>
          <div className="col-md-8 shadow p-5 main-border-rad-editprof">
            <div className="row">
              <div className="col-md-12">
                <h2 className="cv-video-head-rcvr">Key Skills</h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                {props.userprofileReducer.userprofile.skills &&
                props.userprofileReducer.userprofile.skills.length > 0
                  ? props.userprofileReducer.userprofile.skills.map((k) => (
                      <button
                        className="btn btn-light mt-2 shadow btn-color-key mr-3"
                        id="btnn"
                      >
                        {k.name !== null && k.name !== undefined ? k.name : ""}
                      </button>
                    ))
                  : "no skills"}
              </div>
            </div>
          </div>
        </div>
        {/* Key Skills Ends Here */}
        {props.userprofileReducer.loading == false ? <FullPageLoader /> : null}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  userprofileReducer: state.userprofileReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (userId, id) => dispatch(getUserProfile(userId, id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchApplicantsProfile);
