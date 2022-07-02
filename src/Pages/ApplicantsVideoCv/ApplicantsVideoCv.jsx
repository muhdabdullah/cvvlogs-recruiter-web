import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ApplicantsVideoCv.css";
import EditIcon from "../../Assests/applicants-video-cv/edit.svg";
import SucIcon from "../../Assests/applicants-video-cv/successfull-icon.svg";
import UnSucIcon from "../../Assests/applicants-video-cv/unsuccessfull-icon.svg";
import LocationIcon from "../../Assests/applicants-video-cv/location.svg";
import MessageIcon from "../../Assests/applicants-video-cv/message.svg";
import CallIcon from "../../Assests/applicants-video-cv/call.svg";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleApplicant } from "../../actions/singleApplicantAction";
import { useLocation } from "react-router-dom";
import { createStatus, createprogress } from "../../actions/setStatusAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import vidplace from "../../Assests/videoplace.png";
import ReactPlayer from "react-player";

Modal.setAppElement("#root");

function ApplicantsVideoCv(props) {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [registerModalIsOpen2, setRegisterModalIsOpen2] = useState(false);
  const [registerModalIsOpen3, setRegisterModalIsOpen3] = useState(false);
  const [registerModalIsOpen4, setRegisterModalIsOpen4] = useState(false);
  const [short, setShort] = useState(1);

  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id");
  useEffect(() => {
    jobData(localStorage.getItem("auth_id1"), compIds);
    props.createprogress(localStorage.getItem("auth_id1"), compIds, short);
  }, []);

  const jobData = async (userId, id) => {
    await props.getSingleApplicant(userId, id);
    return null;
  };
  const statusSet = async () => {
    await props.createStatus(localStorage.getItem("auth_id1"), compIds, short);
  };
  return (
    <>
      <Nav2 />
      {/* Register Modal Starts */}
      <Modal
        isOpen={registerModalIsOpen}
        onRequestClose={() => setRegisterModalIsOpen(false)}
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
            height: "290px",
            top: "30%",
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
            <h1 className="register-head text-center">Set Status</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 pl-4 py-4">
            <input
              className="mr-2"
              type="radio"
              id="Shortlisted"
              name="gender"
              value={2}
              onChange={(e) => setShort(e.target.value)}
            />
            <label for="Shortlisted">Shortlisted</label>
            <br />
            <input
              className="mr-2"
              type="radio"
              id="Interviewed"
              name="gender"
              value={3}
              onChange={(e) => setShort(e.target.value)}
            />
            <label for="Interviewed">Interviewed</label>
            <br />
            <input
              className="mr-2"
              type="radio"
              id="Hired"
              name="gender"
              value={4}
              onChange={(e) => setShort(e.target.value)}
            />
            <label for="Hired">Hired</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              className="border-0 btn-primary rounded py-1 px-3"
              onClick={() => statusSet()}
            >
              Submit
            </button>
          </div>
          {props.setstatusReducer.loading == true ? <FullPageLoader /> : null}
        </div>
        {/* Heading Starts */}
      </Modal>
      {/* Register Modal Ends */}

      {/* Register Modal2 Starts */}
      <Modal
        isOpen={registerModalIsOpen2}
        onRequestClose={() => setRegisterModalIsOpen2(false)}
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
            height: "435px",
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
              to={`/PremiumPackages?id=${
                props.singleapplicantReducer.singleapplicant.user &&
                props.singleapplicantReducer.singleapplicant.user.id !== null &&
                props.singleapplicantReducer.singleapplicant.user.id !==
                  undefined
                  ? props.singleapplicantReducer.singleapplicant.user.id
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
      {/* Register Modal2 Ends */}

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
            <p className=" text-center">You have reported this candidate.</p>
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
              onClick={() => setRegisterModalIsOpen4(false)}
            >
              Ok
            </button>
          </div>
        </div>
        {/* Heading Starts */}
      </Modal>
      {/* Register Modal4 Ends */}

      <div className="container">
        {/* <button
          onClick={() =>
            console.log(
              "gggggggg",
              props.singleapplicantReducer.singleapplicant
            )
          }
        >
          fffff
        </button> */}
        <h1 className="mt-5 applicants-video-head-recr">Applicant Video CV</h1>
          {/* <button
            onClick={() =>
              console.log(props.singleapplicantReducer.singleapplicant)
            }
          >
            Click me
          </button> */}
        <div className="row mt-4">
          <div className="col-md-12 shadow p-5 mb-5">
            <div className="row">
              {/* Video Tag Starts */}
              <div className="col-md-8">
                <div className="embed-responsive embed-responsive-16by9">
                  {props.singleapplicantReducer.singleapplicant.user &&
                  props.singleapplicantReducer.singleapplicant.user.vid_link !==
                    null &&
                  props.singleapplicantReducer.singleapplicant.user.vid_link !==
                    undefined ? (
                    //   <iframe
                    //   className="embed-responsive-item"
                    //   src={props.singleapplicantReducer.singleapplicant.user.vid_link}
                    //   allowFullScreen
                    // />
                    <ReactPlayer
                      url={
                        props.singleapplicantReducer.singleapplicant.user
                          .vid_link
                      }
                      playing={true}
                      controls
                      className="react-player h-75"
                    />
                  ) : (
                    <img src={vidplace} height="100%" width="100%" />
                  )}
                </div>
              </div>
              {/* Video Tag Ends */}
              {/* Applicants Status Starts Here */}
              <div className="col-md-4">
                <div className="row mt-2">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">
                    {/* <button className="edit-btn-apll-vid-rexr m-0 p-0">EDIT <img src={EditIcon}/></button> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <h2 className="applic-stat-recr">Application Status</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="app-stst-para">
                      Shows the progress of applicant's application
                    </p>
                  </div>
                </div>
                {props.singleapplicantReducer.singleapplicant.user &&
                props.singleapplicantReducer.singleapplicant.user
                  .application_status !== null &&
                props.singleapplicantReducer.singleapplicant.user
                  .application_status !== undefined ? (
                  props.singleapplicantReducer.singleapplicant.user
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

                {props.singleapplicantReducer.singleapplicant.user &&
                props.singleapplicantReducer.singleapplicant.user
                  .application_status !== null &&
                props.singleapplicantReducer.singleapplicant.user
                  .application_status !== undefined ? (
                  props.singleapplicantReducer.singleapplicant.user
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

                {props.singleapplicantReducer.singleapplicant.user &&
                props.singleapplicantReducer.singleapplicant.user
                  .application_status !== null &&
                props.singleapplicantReducer.singleapplicant.user
                  .application_status !== undefined ? (
                  props.singleapplicantReducer.singleapplicant.user
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
              </div>
              {/* Applicants Status Ends Here */}
            </div>
            {/* Bottom Details Starts Here */}
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="name-applicants-recr m-0 p-0">
                      {props.singleapplicantReducer.singleapplicant.user &&
                      props.singleapplicantReducer.singleapplicant.user.name !==
                        null &&
                      props.singleapplicantReducer.singleapplicant.user.name !==
                        undefined
                        ? props.singleapplicantReducer.singleapplicant.user.name
                        : ""}
                    </h2>
                  </div>
                  <div className="col-md-4">
                    {/* <p className="date-of-appli-rexr">Posted on {props.singleapplicantReducer.singleapplicant.user&&props.singleapplicantReducer.singleapplicant.user.applied_date!==null&&props.singleapplicantReducer.singleapplicant.user.applied_date!==undefined?props.singleapplicantReducer.singleapplicant.user.applied_date:""}</p> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="prof-appli-rexr">
                      {props.singleapplicantReducer.singleapplicant.user &&
                      props.singleapplicantReducer.singleapplicant.user
                        .skills &&
                      props.singleapplicantReducer.singleapplicant.user.skills
                        .length > 0
                        ? props.singleapplicantReducer.singleapplicant.user.skills.map(
                            (sk) => <>{sk} , </>
                          )
                        : "no skills"}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-1 col-2">
                        <img src={LocationIcon} alt="" />
                      </div>
                      <div className="col-md-11 col-10">
                        <p className="loc-recr-vid">
                          {props.singleapplicantReducer.singleapplicant.user &&
                          props.singleapplicantReducer.singleapplicant.user
                            .city !== null &&
                          props.singleapplicantReducer.singleapplicant.user
                            .city !== undefined
                            ? props.singleapplicantReducer.singleapplicant.user
                                .city
                            : ""}{" "}
                          ,{" "}
                          {props.singleapplicantReducer.singleapplicant.user &&
                          props.singleapplicantReducer.singleapplicant.user
                            .country !== null &&
                          props.singleapplicantReducer.singleapplicant.user
                            .country !== undefined
                            ? props.singleapplicantReducer.singleapplicant.user
                                .country
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={MessageIcon} alt="" />
                      </div>
                      <div className="col-md-10">
                        <p className="loc-recr-vid">{props.singleapplicantReducer.singleapplicant.user&&props.singleapplicantReducer.singleapplicant.user.email!==null&&props.singleapplicantReducer.singleapplicant.user.email!==undefined?props.singleapplicantReducer.singleapplicant.user.email:""}</p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={CallIcon} alt="" />
                      </div>
                      <div className="col-md-10">
                        <p className="loc-recr-vid">{props.singleapplicantReducer.singleapplicant.user&&props.singleapplicantReducer.singleapplicant.user.number!==null&&props.singleapplicantReducer.singleapplicant.user.number!==undefined?props.singleapplicantReducer.singleapplicant.user.number:""}</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
            {/* Bottom Details Starts Ends */}
            {/* Button last Starts here */}
            <div className="row mt-5">
              <div className="col-md-4 mb-md-0 mb-lg-0 mb-2">
                {props.singleapplicantReducer.singleapplicant.user &&
                props.singleapplicantReducer.singleapplicant.user
                  .reported_by !== null &&
                props.singleapplicantReducer.singleapplicant.user
                  .reported_by !== undefined ? (
                  props.singleapplicantReducer.singleapplicant.user
                    .reported_by == 1 ? (
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen3(true)}
                      //ye wala hai
                    >
                      Message
                    </button>
                  ) : props.singleapplicantReducer.singleapplicant.user
                      .reported_by == 2 ? (
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen4(true)}
                    >
                      Message
                    </button>
                  ) : props.singleapplicantReducer.singleapplicant.user &&
                    props.singleapplicantReducer.singleapplicant.user
                      .paid_for_user !== null &&
                    props.singleapplicantReducer.singleapplicant.user
                      .paid_for_user !== undefined &&
                    props.singleapplicantReducer.singleapplicant.user
                      .paid_for_user == 1 ? (
                    props.singleapplicantReducer.singleapplicant.user &&
                    props.singleapplicantReducer.singleapplicant.user
                      .chat_id !== null &&
                    props.singleapplicantReducer.singleapplicant.user
                      .chat_id !== undefined &&
                    props.singleapplicantReducer.singleapplicant.user
                      .chat_id !== "" ? (
                      <Link
                        to={`/messages?id=${
                          props.singleapplicantReducer.singleapplicant.user &&
                          props.singleapplicantReducer.singleapplicant.user
                            .id !== null &&
                          props.singleapplicantReducer.singleapplicant.user
                            .id !== undefined &&
                          props.singleapplicantReducer.singleapplicant.user
                            .id !== ""
                            ? props.singleapplicantReducer.singleapplicant.user
                                .id
                            : ""
                        }?cid=${
                          props.singleapplicantReducer.singleapplicant.user
                            .chat_id
                        }?name=${
                          props.singleapplicantReducer.singleapplicant.user &&
                          props.singleapplicantReducer.singleapplicant.user
                            .name !== null &&
                          props.singleapplicantReducer.singleapplicant.user
                            .name !== undefined
                            ? props.singleapplicantReducer.singleapplicant.user
                                .name
                            : ""
                        }`}
                      >
                        {" "}
                        <button className="btn btn-primary w-100 view-prof-btn-rexr">
                          Message
                        </button>
                      </Link>
                    ) : (
                      <Link
                        to={`/messages?id=${
                          props.singleapplicantReducer.singleapplicant.user &&
                          props.singleapplicantReducer.singleapplicant.user
                            .id !== null &&
                          props.singleapplicantReducer.singleapplicant.user
                            .id !== undefined &&
                          props.singleapplicantReducer.singleapplicant.user
                            .id !== ""
                            ? props.singleapplicantReducer.singleapplicant.user
                                .id
                            : ""
                        }?name=${
                          props.singleapplicantReducer.singleapplicant.user &&
                          props.singleapplicantReducer.singleapplicant.user
                            .name !== null &&
                          props.singleapplicantReducer.singleapplicant.user
                            .name !== undefined
                            ? props.singleapplicantReducer.singleapplicant.user
                                .name
                            : ""
                        }`}
                      >
                        {" "}
                        <button className="btn btn-primary w-100 view-prof-btn-rexr">
                          Message
                        </button>
                      </Link>
                    )
                  ) : (
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen2(true)}
                    >
                      Message
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 mb-md-0 mb-lg-0 mb-2">
                <Link to={`/ApplicantsProfile?id=${compIds}`}>
                  <button className="btn btn-primary w-100 view-prof-btn-rexr">
                    View Profile
                  </button>
                </Link>
              </div>
              {props.singleapplicantReducer.singleapplicant.user &&
              props.singleapplicantReducer.singleapplicant.user.reported_by !==
                null &&
              props.singleapplicantReducer.singleapplicant.user.reported_by !==
                undefined ? (
                props.singleapplicantReducer.singleapplicant.user.reported_by ==
                1 ? (
                  <div className="col-md-4">
                    {" "}
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen3(true)}
                    >
                      Set Status
                    </button>
                  </div>
                ) : props.singleapplicantReducer.singleapplicant.user
                    .reported_by == 2 ? (
                  <div className="col-md-4">
                    {" "}
                    <button
                      className="btn btn-primary w-100 view-prof-btn-rexr"
                      onClick={() => setRegisterModalIsOpen4(true)}
                    >
                      Set Status
                    </button>
                  </div>
                ) : props.singleapplicantReducer.singleapplicant.user &&
                  props.singleapplicantReducer.singleapplicant.user
                    .paid_for_user !== null &&
                  props.singleapplicantReducer.singleapplicant.user
                    .paid_for_user !== undefined ? (
                  props.singleapplicantReducer.singleapplicant.user
                    .paid_for_user == 0 ? (
                    <div className="col-md-4">
                      {" "}
                      <button
                        className="btn btn-primary w-100 view-prof-btn-rexr"
                        onClick={() => setRegisterModalIsOpen2(true)}
                      >
                        Set Status
                      </button>
                    </div>
                  ) : (
                    <div className="col-md-4">
                      {" "}
                      <button
                        className="btn btn-primary w-100 view-prof-btn-rexr"
                        onClick={() => setRegisterModalIsOpen(true)}
                      >
                        Set Status
                      </button>
                    </div>
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            {/* Button last Ends here */}
          </div>
        </div>
        {props.singleapplicantReducer.loading == false ? (
          <FullPageLoader />
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  singleapplicantReducer: state.singleapplicantReducer,
  setstatusReducer: state.setstatusReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleApplicant: (userId, id) => dispatch(getSingleApplicant(userId, id)),
  createStatus: (userId, job_app_id, status) =>
    dispatch(createStatus(userId, job_app_id, status)),
  createprogress: (userId, job_app_id, status) =>
    dispatch(createprogress(userId, job_app_id, status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsVideoCv);
