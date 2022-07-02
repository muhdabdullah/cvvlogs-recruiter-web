import React, { useEffect, useState } from "react";
import "./PostedJobs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Briefcase from "../../Assests/posted-jobs/Briefcase.svg";
import Location from "../../Assests/posted-jobs/location.svg";
import Pen from "../../Assests/posted-jobs/Pen.svg";
import Footer from "../../Components/Footer/Footer";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../actions/alljobsAction";
import { getDeleteJob } from "../../actions/deleteJobAction";
import Modal from "react-modal";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

function PostedJobs(props) {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [j_id, setJ_id] = useState(null);
  useEffect(() => {
    jobData(localStorage.getItem("auth_id1"));
  }, []);

  const jobData = async (userId) => {
    await props.getAllJobs(userId);
    return null;
  };
  const deletefunc = (e) => {
    setRegisterModalIsOpen(true);
    setJ_id(e);
    // console.log("dd",j_id)
  };
  return (
    <>
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

      <Nav2 />
      <div className="container container-bottom padder">
        <div className="row mb-3">
          <div className="col-md-12">
            <h1 className="posted-jobs-rexr-head">Posted Jobs</h1>
            <h6 className="posted-jobs-rexr-para">
              Showing{" "}
              {props.alljobsReducer.alljobs.jobs
                ? props.alljobsReducer.alljobs.jobs.length
                : "0"}{" "}
              Posted Jobs
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {/* Apis Start here */}
            {props.alljobsReducer.alljobs.jobs &&
            props.alljobsReducer.alljobs.jobs.length > 0 ? (
              props.alljobsReducer.alljobs.jobs.map((alljobs) => (
                <div className="job_result">
                  <div className="col-md-12 text-right">
                    <a
                      href="#"
                      onClick={(e) => deletefunc(alljobs.id)}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p className="pb-0 mb-0 text-danger text-right">
                        Delete Job
                      </p>
                    </a>
                  </div>
                  <Link
                    to={`/PostedJobsDesc?id=${alljobs.id}`}
                    className="link-tag-home"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="text-color m-0 p-0">
                          {alljobs.job_title !== null &&
                          alljobs.job_title !== undefined
                            ? alljobs.job_title
                            : ""}
                        </h4>
                      </div>
                      <div className="col-md-6">
                        <p className="closed-color-of-jobs">
                          {alljobs.status !== null &&
                          alljobs.status !== undefined
                            ? alljobs.status
                            : ""}
                        </p>
                      </div>
                    </div>
                    <p className="text-disabled pt-1">
                      {alljobs.rec !== null && alljobs.rec !== undefined
                        ? alljobs.rec
                        : ""}
                    </p>
                    <div className="info-tags">
                      <span className="ml-0 text-disabled-02">
                        <img src={Briefcase} alt="" width="16px" />
                        {`  `}{" "}
                        {alljobs.exp !== null && alljobs.exp !== undefined
                          ? alljobs.exp
                          : ""}
                      </span>
                      <span className="text-disabled-02">
                        <img src={Location} alt="" width="10px" />

                        {/* {alljobs.city!==null&&alljobs.city!==undefined?alljobs.city:""}  */}
                        {`  `}
                        {alljobs.country !== null &&
                        alljobs.country !== undefined
                          ? alljobs.country
                          : ""}
                        {`  `}
                        {alljobs.state !== null && alljobs.state !== undefined
                          ? alljobs.state
                          : ""}
                        {`  `}
                        {alljobs.city !== null && alljobs.city !== undefined
                          ? alljobs.city
                          : ""}
                      </span>
                      <span className="text-disabled-02">
                        <img src={Pen} alt="" width="16px" />
                        {`  `}
                        {alljobs.func !== null && alljobs.func !== undefined
                          ? alljobs.func
                          : ""}
                      </span>
                    </div>

                    <p
                      className="text-disabled-02"
                      dangerouslySetInnerHTML={{
                        __html:
                          alljobs.description !== null &&
                          alljobs.description !== undefined
                            ? alljobs.description
                            : "",
                      }}
                    />
                    <div className="row">
                      <div className="col-md-12">
                        <p className="posted-today-text-rexr-o1">
                          {alljobs.ago !== null && alljobs.ago !== undefined
                            ? alljobs.ago
                            : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className=" pt-3">Posted jobs will appear here!</p>
            )}
          </div>
          <div className="col-md-3">
            <div className="place-ad">
              <h4>Place Ad Here!</h4>
            </div>
          </div>
        </div>
        {props.alljobsReducer.loading == false ? <FullPageLoader /> : null}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  alljobsReducer: state.alljobsReducer,
  deletejobReducer: state.deletejobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAllJobs: (userId) => dispatch(getAllJobs(userId)),
  getDeleteJob: (userId, id) => dispatch(getDeleteJob(userId, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostedJobs);
