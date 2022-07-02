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
import { getApplicantProfile } from "../../actions/applicantProfileAction";
import { useLocation } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import place from "../../Assests/placeholder.png";
import vidplace from "../../Assests/videoplace.png";
import ReactPlayer from "react-player";

function ApplicantsProfile(props) {
  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id");
  useEffect(() => {
    jobData(localStorage.getItem("auth_id1"), compIds);
  }, []);

  const jobData = async (userId, id) => {
    await props.getApplicantProfile(userId, id);
    return null;
  };
  return (
    <>
      <Nav2 />
      <div className="container">
        {/* <button onClick={()=>console.log("ggggggggg",props.applicantprofileReducer.applicantprofile)}>hhhhhhhh</button> */}
        {/* Profile Section Starts */}
        <div className="row shadow mt-5 p-5 main-border-rad-editprof">
          <div className="col-md-10">
            <div className="row">
              <div
                className="col-lg-3 col-md-5 col-10 border py-3"
                style={{ borderRadius: "10px" }}
              >
                {props.applicantprofileReducer.applicantprofile
                  .user_personal ? (
                  <img
                    className=""
                    src={
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.dp !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.dp !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.dp
                        : ""
                    }
                    width="100%"
                    height="150px"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                    alt=""
                  />
                ) : (
                  <img
                    className="border"
                    src={place}
                    height="100%"
                    width="150px"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
                {props.applicantprofileReducer.applicantprofile.hired ===
                "1" ? (
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
                      {props.applicantprofileReducer.applicantprofile
                        .user_personal &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.first_name !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.first_name !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.first_name
                        : ""}{" "}
                      {props.applicantprofileReducer.applicantprofile
                        .user_personal &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.last_name !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.last_name !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.last_name
                        : ""}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="prof-appli-rexr">
                      {props.applicantprofileReducer.applicantprofile
                        .user_personal &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.prof !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.prof !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.prof
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3 ">
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="row">
                          <div className="col-md-2 pr-md-0 col-2">
                            <img src={LocationIcon} alt="" />
                          </div>
                          <div className="col-md-10 col-10 pl-md-0">
                            <p className="loceditprof-appl-prof">
                              {props?.applicantprofileReducer?.applicantprofile
                                ?.user_personal
                                ? `${props.applicantprofileReducer.applicantprofile.user_personal.city}, 
                        ${props.applicantprofileReducer.applicantprofile.user_personal.state}, 
                        ${props.applicantprofileReducer.applicantprofile.user_personal.country}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* <div className="row">
                          <div className="col-md-2">
                            <img src={MessageIcon} alt="" />
                          </div>
                          <div className="col-md-10">
                            <p className="loceditprof-appl-prof">
                            {props.applicantprofileReducer.applicantprofile.user_personal&&props.applicantprofileReducer.applicantprofile.user_personal.email!==null&&
                          props.applicantprofileReducer.applicantprofile.user_personal.email!==undefined?props.applicantprofileReducer.applicantprofile.user_personal.email:""
                          }
                            </p>
                          </div>
                        </div> */}
                      </div>
                      <div className="col-md-4">
                        {/* <div className="row">
                          <div className="col-md-2">
                            <img src={CallIcon} alt="" />
                          </div>
                          <div className="col-md-10">
                            <p className="loceditprof-appl-prof">
                            {props.applicantprofileReducer.applicantprofile.user_personal&&props.applicantprofileReducer.applicantprofile.user_personal.number!==null&&
                          props.applicantprofileReducer.applicantprofile.user_personal.number!==undefined?props.applicantprofileReducer.applicantprofile.user_personal.number:""
                          }
                            </p>
                          </div>
                        </div> */}
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
            {/* <div className="row mt-5">
              <div className="col-md-3"></div>
              <div className="col-md-9">
                <button className="btn btn-primary w-100 view-prof-btn-rexr">
                  Message
                </button>
              </div>
            </div> */}
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
            <p className="edit-prof-text">
              <a href="#pers" style={{ color: "#707070" }}>
                Personal
              </a>
            </p>
          </div>
          <div className="col-md-2">
            <p className="edit-prof-text">
              <a href="#prof" style={{ color: "#707070" }}>
                Professional
              </a>
            </p>
          </div>
          <div className="col-md-3">
            <p className="edit-prof-text">
              <a href="#qual" style={{ color: "#707070" }}>
                Qualification
              </a>
            </p>
          </div>
          <div className="col-md-2">
            <p className="edit-prof-text">
              <a href="#skill" style={{ color: "#707070" }}>
                Key Skills
              </a>
            </p>
          </div>
          {/* <div className="col-md-1"></div> */}
        </div>
        {/* Headline Column Ends */}

        {/* Main Works Starts here */}
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12 shadow pt-3 pb-3 main-border-rad-editprof">
                {/*  */}
                <div className="row">
                  <div className="col-md-7">
                    <button className="edit-btn-apll-vid-rexr">
                      {/* EDIT <img src={EditIcon} /> */}
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
                {props.applicantprofileReducer.applicantprofile.user_personal &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .application_status !== null &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .application_status !== undefined ? (
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .application_status == "2" ? (
                    <div className="row">
                      <div className="col-md-2 col-2">
                        <img src={SucIcon} alt="" />
                      </div>
                      <div className="col-md-10 col-10">
                        <p className="shortlist-text-rexr">Shortlisted</p>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-2 col-2">
                        <img src={UnSucIcon} alt="" />
                      </div>
                      <div className="col-md-10 col-10">
                        <p className="prog-up-recr">Shortlisted</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="row">
                    <div className="col-md-2 col-2">
                      <img src={UnSucIcon} alt="" />
                    </div>
                    <div className="col-md-10 col-10">
                      <p className="prog-up-recr">Shortlisted</p>
                    </div>
                  </div>
                )}

                {props.applicantprofileReducer.applicantprofile.user_personal &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .application_status !== null &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .application_status !== undefined ? (
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .application_status == "3" ? (
                    <div className="row">
                      <div className="col-md-2 col-2">
                        <img src={SucIcon} alt="" />
                      </div>
                      <div className="col-md-10 col-10">
                        <p className="shortlist-text-rexr">Interviewed</p>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-2 col-2">
                        <img src={UnSucIcon} alt="" />
                      </div>
                      <div className="col-md-10 col-10">
                        <p className="prog-up-recr">Interviewed</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="row">
                    <div className="col-md-2 col-2">
                      <img src={UnSucIcon} alt="" />
                    </div>
                    <div className="col-md-10 col-10">
                      <p className="prog-up-recr">Interviewed</p>
                    </div>
                  </div>
                )}

                {props.applicantprofileReducer.applicantprofile.user_personal &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .application_status !== null &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .application_status !== undefined ? (
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .application_status == "4" ? (
                    <div className="row">
                      <div className="col-md-2 col-2">
                        <img src={SucIcon} alt="" />
                      </div>
                      <div className="col-md-10 col-10">
                        <p className="shortlist-text-rexr">Hired</p>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-2 col-2">
                        <img src={UnSucIcon} alt="" />
                      </div>
                      <div className="col-md-10 col-10">
                        <p className="prog-up-recr">Hired</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="row">
                    <div className="col-md-2 col-2">
                      <img src={UnSucIcon} alt="" />
                    </div>
                    <div className="col-md-10 col-10">
                      <p className="prog-up-recr">Hired</p>
                    </div>
                  </div>
                )}

                {/*  */}
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
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
                {/* <button onClick={()=>console.log("ddd",props.applicantprofileReducer.applicantprofile.user_personal.vid_link)}>ffff</button> */}
                <div className="embed-responsive embed-responsive-16by9">
                  {props.applicantprofileReducer.applicantprofile
                    .user_personal &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .vid_link !== null &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .vid_link !== undefined &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .vid_link !== "" ? (
                    //   <iframe
                    //   className="embed-responsive-item"
                    //   src={props.applicantprofileReducer.applicantprofile.user_personal.vid_link}
                    //   allowFullScreen
                    // />
                    <ReactPlayer
                      url={
                        props.applicantprofileReducer.applicantprofile
                          .user_personal.vid_link
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
                    props.applicantprofileReducer.applicantprofile.user_personal&&props.applicantprofileReducer.applicantprofile.user_personal.headline!==null&&
                    props.applicantprofileReducer.applicantprofile.user_personal.headline!==undefined?
                    props.applicantprofileReducer.applicantprofile.user_personal.headline:""
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
                <h2 className="cv-video-head-rcvr" id="pers">
                  Personal Details
                </h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <h6>First Name</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile
                    .user_personal &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .first_name !== null &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .first_name !== undefined
                    ? props.applicantprofileReducer.applicantprofile
                        .user_personal.first_name
                    : ""}
                </p>
                <h6>Last Name</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile
                    .user_personal &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .last_name !== null &&
                  props.applicantprofileReducer.applicantprofile.user_personal
                    .last_name !== undefined
                    ? props.applicantprofileReducer.applicantprofile
                        .user_personal.last_name
                    : ""}
                </p>

                {localStorage.getItem("eco_complaince") == 0 ? (
                  <>
                    <h6>Date Of Birth</h6>
                    <p>
                      {props.applicantprofileReducer.applicantprofile
                        .user_personal &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.dob !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.dob !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.dob
                        : ""}
                    </p>
                  </>
                ) : null}
                {localStorage.getItem("eco_complaince") == 0 ? (
                  <>
                    <h6>Gender</h6>
                    <p>
                      {props.applicantprofileReducer.applicantprofile
                        .user_personal &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.gender !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.gender !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.gender
                        : ""}
                    </p>
                  </>
                ) : null}

                {/* <h6>Phone Number</h6>
             <p>
             {props.applicantprofileReducer.applicantprofile.user_personal&&props.applicantprofileReducer.applicantprofile.user_personal.number!==null&&
                          props.applicantprofileReducer.applicantprofile.user_personal.number!==undefined?props.applicantprofileReducer.applicantprofile.user_personal.number:""
                          }
             </p> */}
                {props.applicantprofileReducer.applicantprofile.user_personal &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .country !== null &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .country !== undefined &&
                props.applicantprofileReducer.applicantprofile.user_personal
                  .country !== "" ? (
                  <>
                    <h6>Address</h6>
                    <p>
                      {props?.applicantprofileReducer?.applicantprofile
                        ?.user_personal
                        ? `${props.applicantprofileReducer.applicantprofile.user_personal.city}, ,
                        ${props.applicantprofileReducer.applicantprofile.user_personal.state}, 
                        ${props.applicantprofileReducer.applicantprofile.user_personal.country}`
                        : ""}
                    </p>
                  </>
                ) : (
                  ""
                )}

                {localStorage.getItem("eco_complaince") == 0 ? (
                  props?.applicantprofileReducer?.applicantprofile
                    ?.user_personal?.marital_status ? (
                    <>
                      <h6>Marital Status</h6>
                      <p>
                        {
                          props.applicantprofileReducer.applicantprofile
                            .user_personal.marital_status
                        }
                      </p>
                    </>
                  ) : null
                ) : null}
                {localStorage.getItem("eco_complaince") == 0 ? (
                  <>
                    <h6>Nationality</h6>
                    <p>
                      {props.applicantprofileReducer.applicantprofile
                        .user_personal &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.nationality !== null &&
                      props.applicantprofileReducer.applicantprofile
                        .user_personal.nationality !== undefined
                        ? props.applicantprofileReducer.applicantprofile
                            .user_personal.nationality
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
                <h2 className="cv-video-head-rcvr" id="prof">
                  Professional Details
                </h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <h6>Total Work Experience</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile
                    .proffessional &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .work_exp !== null &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .work_exp !== undefined
                    ? props.applicantprofileReducer.applicantprofile
                        .proffessional.work_exp
                    : ""}
                </p>
                <h6>Industry</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile
                    .proffessional &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .ind !== null &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .ind !== undefined
                    ? props.applicantprofileReducer.applicantprofile
                        .proffessional.ind
                    : ""}
                </p>
                <h6>Career Level</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile
                    .proffessional &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .func !== null &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .func !== undefined
                    ? props.applicantprofileReducer.applicantprofile
                        .proffessional.func
                    : ""}
                </p>
                <h6>Annual Salary</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile
                    .proffessional &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .sal !== null &&
                  props.applicantprofileReducer.applicantprofile.proffessional
                    .sal !== undefined
                    ? props.applicantprofileReducer.applicantprofile
                        .proffessional.sal
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
                <h2 className="cv-video-head-rcvr" id="qual">
                  Qualifications Details
                </h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                <h6>Qualification</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile.education &&
                  props.applicantprofileReducer.applicantprofile.education
                    .qualification !== null &&
                  props.applicantprofileReducer.applicantprofile.education
                    .qualification !== undefined
                    ? props.applicantprofileReducer.applicantprofile.education
                        .qualification
                    : ""}
                </p>
                <h6>Course Type</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile.education &&
                  props.applicantprofileReducer.applicantprofile.education
                    .course !== null &&
                  props.applicantprofileReducer.applicantprofile.education
                    .course !== undefined
                    ? props.applicantprofileReducer.applicantprofile.education
                        .course
                    : ""}
                </p>
                <h6>Course Specialization</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile.education &&
                  props.applicantprofileReducer.applicantprofile.education
                    .course_specialization !== null &&
                  props.applicantprofileReducer.applicantprofile.education
                    .course_specialization !== undefined
                    ? props.applicantprofileReducer.applicantprofile.education
                        .course_specialization
                    : ""}
                </p>
                <h6>Institute Name</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile.education &&
                  props.applicantprofileReducer.applicantprofile.education
                    .institute_name !== null &&
                  props.applicantprofileReducer.applicantprofile.education
                    .institute_name !== undefined
                    ? props.applicantprofileReducer.applicantprofile.education
                        .institute_name
                    : ""}
                </p>
                <h6>Institute Location</h6>
                <p>
                  {props.applicantprofileReducer.applicantprofile.education &&
                  props.applicantprofileReducer.applicantprofile.education
                    .country !== null &&
                  props.applicantprofileReducer.applicantprofile.education
                    .country !== undefined
                    ? props.applicantprofileReducer.applicantprofile.education
                        .country
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
                <h2 className="cv-video-head-rcvr" id="skill">
                  Key Skills
                </h2>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 head-over-flow-app-prof-recr">
                {props.applicantprofileReducer.applicantprofile.skills &&
                props.applicantprofileReducer.applicantprofile.skills.length > 0
                  ? props.applicantprofileReducer.applicantprofile.skills.map(
                      (k) => (
                        <button
                          className="btn btn-light mt-2 shadow btn-color-key mr-3"
                          id="btnn"
                        >
                          {k.name !== null && k.name !== undefined
                            ? k.name
                            : ""}
                        </button>
                      )
                    )
                  : "no skills"}
              </div>
            </div>
          </div>
        </div>
        {/* Key Skills Ends Here */}
        {props.applicantprofileReducer.loading == false ? (
          <FullPageLoader />
        ) : null}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  applicantprofileReducer: state.applicantprofileReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getApplicantProfile: (userId, id) =>
    dispatch(getApplicantProfile(userId, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsProfile);
