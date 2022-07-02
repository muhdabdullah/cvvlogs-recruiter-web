import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import TotalJobs from "../../Components/TotalJobs/TotalJobs";
import AdsHome from "../../Components/AdsHome/AdsHome";
import Footer from "../../Components/Footer/Footer";
import { getDashboard } from "../../actions/dashboardAction";
import RightIcon from "../../Assests/home/right-icon.svg";
import WrongIcon from "../../Assests/home/wrong-icon.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import SearchIcon from "../../Assests/Search.svg";
import LocationIcon from "../../Assests/Location.svg";
import { getDeleteJob } from "../../actions/deleteJobAction";
import Modal from "react-modal";
import { duplicateJob } from "../../actions/duplicateJobAction";

Modal.setAppElement("#root");
function Home(props) {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [j_id, setJ_id] = useState(null);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    // if (!localStorage.getItem("auth_id1")) {
    //   window.location = "/";
    // }
    dashboardData(localStorage.getItem("auth_id1"));
  }, []);

  const dashboardData = async (userId) => {
    await props.getDashboard(userId);
    return null;
  };
  const deletefunc = (e) => {
    setRegisterModalIsOpen(true);
    setJ_id(e);
    // console.log("dd",j_id)
  };

  function capitalize(str) {
    return (
      str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase()
    );
  }

  function titleCase(str) {
    return str.replace(/[^\ \/\-\_]+/g, capitalize);
  }

  return (
    <>
      <Nav2 />
      <div className="container-fluid home-back-img">
        <div className="container pt-5">
          <div className="row mt-5 main-content-home-recr">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="row home-maein-back-search">
                <div className="col-md-9">
                  <h4 className="m-0 p-0 mt-3 white-hpme">
                    Looking for an Employee?
                  </h4>
                  <p className="white-hpme">
                    Create a Job! We will notify you whenever there is a new
                    applicant that is suitable for you.
                  </p>
                </div>
                <div className="col-md-3 m-auto">
                  <Link to="/CreateAJob">
                    <button className="btn btn-primary w-100 btn-main-home-recr">
                      Create a Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="row mt-5">
                <div className="col-md-12 ">
                  {/* <button onClick={()=>console.log(props.dashboardLoginReducer.dashboardlogin)}>Click ke</button> */}
                  <h3 style={{ color: "#fff", fontWeight: "bold" }}>
                    Welcome Back,{" "}
                    {props?.dashboardReducer?.dashboard?.company?.name
                      ? props.dashboardReducer?.dashboard?.company?.name !==
                          null &&
                        props.dashboardReducer.dashboard.company.name !==
                          undefined
                        ? titleCase(
                            props?.dashboardReducer?.dashboard?.company?.name
                          )
                        : ""
                      : ""}{" "}
                    !
                  </h3>
                </div>
              </div>
              <Link to="/SearchJobs" className="link-tag-home">
                <div className="row pt-3">
                  <div className="col-md-6 mr-lg-0 pr-lg-0  mr-md-0 pr-md-0 ">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white">
                          <img src={SearchIcon} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control border-left-0 border-right-0 pl-0"
                        placeholder="Designation, Key Skills, Industries, Experience"
                        style={{
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ml-lg-0 pl-lg-0 ml-md-0 pl-md-0 d-lg-block d-md-block d-none">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white">
                          {" "}
                          <img src={LocationIcon} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control border-left-0 border-right-0 pl-0"
                        placeholder="Location"
                        style={{ borderRadius: "0px", cursor: "pointer" }}
                      />
                      <div className="input-group-append">
                        {/* <Link to="search-jobs" className=""> */}
                        <span
                          className="input-group-text text-white font-weight-bold"
                          style={{
                            backgroundColor: "#865ddd ",
                            borderColor: "#865ddd",
                            fontWeight: "bold !important",
                            cursor: "pointer",
                            textDecorationColor: "#fff",
                          }}
                        >
                          SEARCH
                        </span>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 ">
        <div
          className="row mt-lg-0 mt-md-0 mt-5"
          style={{ position: "relative", top: "-20px" }}
        >
          <div className="col-md-2"></div>
          <div
            className="col-md-2 shadow p-3 bg-white mt-lg-0 mt-md-0 mt-5"
            style={{ borderRadius: "10px" }}
          >
            <h5 className="text-center font-weight-bold">
              Total Jobs{" "}
              <span>
                {props.dashboardReducer.dashboard
                  ? props.dashboardReducer.dashboard.total_jobs !== null &&
                    props.dashboardReducer.dashboard.total_jobs !== undefined &&
                    props.dashboardReducer.dashboard.total_jobs !== "0"
                    ? props.dashboardReducer.dashboard.total_jobs
                    : "0"
                  : "0"}
              </span>
            </h5>
          </div>
          <div className="col-md-1"></div>
          <div
            className="col-md-2 shadow p-3 bg-white mt-lg-0 mt-md-0 mt-5"
            style={{ borderRadius: "10px" }}
          >
            <h5 className="text-center font-weight-bold">
              Open Jobs{" "}
              <span>
                {props.dashboardReducer.dashboard
                  ? props.dashboardReducer.dashboard.open_jobs !== null &&
                    props.dashboardReducer.dashboard.open_jobs !== undefined &&
                    props.dashboardReducer.dashboard.open_jobs !== "0"
                    ? props.dashboardReducer.dashboard.open_jobs
                    : "0"
                  : "0"}
              </span>
            </h5>
          </div>
          <div className="col-md-1"></div>
          <div
            className="col-md-2 shadow p-3 bg-white mt-lg-0 mt-md-0 mt-5"
            style={{ borderRadius: "10px" }}
          >
            <Link to="CloseJobs">
              <h5 className="text-center font-weight-bold">
                Closed Jobs{" "}
                <span>
                  {props.dashboardReducer.dashboard
                    ? props.dashboardReducer.dashboard.closed_jobs !== null &&
                      props.dashboardReducer.dashboard.closed_jobs !==
                        undefined &&
                      props.dashboardReducer.dashboard.closed_jobs !== "0"
                      ? props.dashboardReducer.dashboard.closed_jobs
                      : "0"
                    : "0"}
                </span>
              </h5>
            </Link>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-10 col-12">
            <div className="row mt-5">
              <div
                className="col-md-12 shadow"
                style={{ borderRadius: "15px" }}
              >
                <h4 className="pited-job-main mt-3 ml-5">Posted Jobs</h4>
                <div className="row px-lg-0 px-3">
                  {props?.dashboardReducer?.dashboard?.posted_jobs &&
                  props.dashboardReducer.dashboard.posted_jobs.length > 0 ? (
                    props.dashboardReducer.dashboard.posted_jobs.map((jobs) => (
                      <div
                        className="col-lg-3 col-md-5 mt-3 shadow p-2 pl-3 ml-lg-5 ml-md-3 home-hover-effect"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <p
                              className="pb-0 mb-0 text-danger text-left"
                              style={{ fontSize: "12px" }}
                            >
                              {jobs.status !== null &&
                              jobs.status !== undefined &&
                              jobs.status !== ""
                                ? jobs.status
                                : ""}
                            </p>
                            {/* <button onClick={()=>console.log(jobs.status)}>CLick me</button> */}
                          </div>
                          <div className="col-md-6">
                            <a
                              href="#"
                              onClick={(e) => deletefunc(jobs.id)}
                              style={{
                                textDecoration: "none",
                                fontSize: "12px",
                              }}
                            >
                              {" "}
                              <p className="pb-0 mb-0 text-danger text-right">
                                Delete Job
                              </p>
                            </a>
                          </div>
                        </div>

                        <Link
                          to={`/PostedJobsDesc?id=${jobs.id}`}
                          className="link-tag-home"
                        >
                          <h6 className="pt-2 m-0 p-0 head-color-of-posr">
                            {jobs.job_title !== null &&
                            jobs.job_title !== undefined
                              ? jobs.job_title
                              : ""}
                          </h6>
                          <p className="technsym-text-comp mb-0 pb-0">
                            {props.dashboardReducer.dashboard.company &&
                            props.dashboardReducer.dashboard.company.name !==
                              null &&
                            props.dashboardReducer.dashboard.company.name !==
                              undefined
                              ? props.dashboardReducer.dashboard.company.name
                              : ""}
                          </p>

                          <p className="para-loc-text mt-2 mb-0 pb-0 ml-0 pl-0">
                            <img src={Location} alt="" />
                            {jobs.country ? jobs.country + ", " : ""}
                            {jobs.state ? jobs.state + ", " : ""}
                            {jobs.city ? jobs.city : ""}
                          </p>
                        </Link>
                        <div className="row">
                          <div className="col-6">
                            <a
                              onClick={() => duplicateJob(jobs.id)}
                              style={{
                                textDecoration: "none",
                                fontSize: "12px",
                                cursor: "pointer",
                                color: "gray",
                              }}
                            >
                              Duplicate Job
                            </a>
                          </div>
                          <div
                            className="col-6"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <a
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `https://cvvlogs.com/jobdetaillog?id=${jobs.id}`
                                );
                                setCopy(jobs.id);
                                setTimeout(() => {
                                  setCopy("");
                                }, 60000);
                              }}
                              style={{
                                textDecoration: "none",
                                fontSize: "12px",
                                cursor: "pointer",
                                color: "gray",
                              }}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Click here to copy link"
                            >
                              {copy === jobs.id ? "Copied" : "Copy"}{" "}
                              <i className="fas fa-copy"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center pt-3">
                      Posted jobs will appear here!
                    </p>
                  )}
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <Link to="/PostedJobs" className="link-tag-home">
                      <p className="view-more-pofts-jkbs">View more{`>>`}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <h3 className="unlick-premkum mt-5">
            Unlock Premium features to find the suitable candidate!
          </h3> */}
          </div>
          {/* <div className="col-md-1"></div> */}
          <div className="col-md-2 col-12 mt-5">
            <div className="place-ad ">
              <h4>Place Ad </h4>
            </div>
          </div>
        </div>

        {props.dashboardReducer.loading == false ? <FullPageLoader /> : null}
      </div>
      <Footer />

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
            height: "200px",
            top: "50%",
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
            <h2 className="text-danger text-center pt-2">Delete Job</h2>
          </div>
          <div className="col-md-12">
            <p className=" text-center pt-2">
              Are you sure you want to delete this job?
            </p>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-2">
                <a
                  href="#"
                  onClick={() =>
                    props.getDeleteJob(localStorage.getItem("auth_id1"), j_id)
                  }
                >
                  <h5 className="text-danger text-center">Yes</h5>
                </a>
              </div>
              <div className="col-md-2">
                <a
                  href="#"
                  className="text-dark"
                  onClick={() => setRegisterModalIsOpen(false)}
                >
                  {" "}
                  <h5 className="text-center">No</h5>
                </a>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
        {/* Heading Starts */}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  dashboardReducer: state.dashboardReducer,
  deletejobReducer: state.deletejobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboard: (userId) => dispatch(getDashboard(userId)),
  getDeleteJob: (userId, id) => dispatch(getDeleteJob(userId, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// <PostedJobsHome />
// <PackageRecr />
