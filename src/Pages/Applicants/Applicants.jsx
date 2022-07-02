import React, { useEffect, useState } from "react";
import "./Applicants.css";
import Nav2 from "../../Components/Nav2/Nav2";
import Footer from "../../Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import UserImage from "../../Assests/user.svg";
import { Link } from "react-router-dom";
import { getAllApplicants } from "../../actions/allapplicantsAction";
import { useLocation } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { createAddtofavsearch } from "../../actions/addtofaavAction";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Applicants(props) {
  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id");
  const job_type = new URLSearchParams(search).get("job_type");
  const [icon, seticon] = React.useState(false);
  const [sort, setsort] = React.useState("sort-by");
  useEffect(() => {
    jobData(localStorage.getItem("auth_id1"), compIds);
  }, []);

  const jobData = async (userId, id) => {
    await props.getAllApplicants(userId, id);
  };
  const AddtoFav = async (id) => {
    await props.createAddtofavsearch(localStorage.getItem("auth_id1"), id);
    window.location.reload();
  };
  let history = useHistory();
  const navigate = (dis, id) => {
    if (!dis) {
      if (job_type === "close") {
        history.push(`/ApplicantsProfile?id=${id}`);
      } else {
        history.push(`/ApplicantsVideoCv?id=${id}`);
      }
    } else return;
  };
  return (
    <>
      <Nav2 />
      <div className="container mt-5">
        <h1 className="applicants-head-recr">Applicants</h1>
        <p className="applicants-para-recr">
          Showing{" "}
          {props.allapplicantsReducer.allapplicants &&
          props.allapplicantsReducer.allapplicants.users &&
          props.allapplicantsReducer.allapplicants.users.length > 0
            ? props.allapplicantsReducer.allapplicants.users.length
            : "0"}{" "}
          applicants
        </p>
        <div className="row">
          {/* Applicants OverFlow Starts here */}
          <div className="col-md-9 mb-md-0 mb-lg-0 mb-3">
            {/* Api Starts here */}
            {props.allapplicantsReducer.allapplicants.users &&
            props.allapplicantsReducer.allapplicants.users.length > 0
              ? props.allapplicantsReducer.allapplicants.users.map((user) => (
                  <div className="row shadow p-2 recr-user-info-main mb-2 mr-1 mt-2 ml-1 home-hover-effect">
                    <div className="col-md-12 text-right"></div>
                    <div className="link-tag-home">
                      <div className="row">
                        <div className="col-md-12 text-right">
                          {user.favourite == 0 ? (
                            <span title="Add to favorites">
                              <i
                                className="fal fa-heart fa-1x"
                                onClick={(e) => AddtoFav(user.id)}
                              ></i>
                            </span>
                          ) : (
                            <span title="Remove from favourites">
                              <i
                                className="fas fa-heart fa-1x text-danger"
                                onClick={(e) => AddtoFav(user.id)}
                              ></i>
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className="row"
                        onClick={() =>
                          navigate(user.is_client_disabled, user.applicant_id)
                        }
                      >
                        <div className="col-lg-3 col-md-5 col-8 pr-md-0">
                          {!user.is_client_disabled ? (
                            <img
                              src={
                                user.dp !== null && user.dp !== undefined
                                  ? user.dp
                                  : ""
                              }
                              height="130px"
                              width="70%"
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              className="mt-2"
                            />
                          ) : (
                            <i
                              className="far fa-user fa-7x"
                              style={{ color: "lightgray" }}
                            ></i>
                          )}
                        </div>
                        {!user.is_client_disabled ? (
                          <div className="col-lg-6 col-md-6">
                            <h1 className="user-name-recr m-0 p-0">
                              {user.name !== null && user.name !== undefined
                                ? user.name
                                : ""}
                            </h1>
                            <p className="user-loc-recr m-0 p-0">
                              {user.city !== null && user.city !== undefined
                                ? user.city
                                : ""}{" "}
                              ,{" "}
                              {user.country !== null &&
                              user.country !== undefined
                                ? user.country
                                : ""}
                            </p>
                            <h3 className="key-skills-recr-applicants m-0 p-0">
                              Key Skills
                            </h3>
                            <p className="userskills-appli m-0 p-0">
                              {user.skills && user.skills.length > 0
                                ? user.skills.map((sk) => <>{sk} ,</>)
                                : "no skills"}
                            </p>
                          </div>
                        ) : (
                          <div className="col-lg-6 col-md-6">
                            <h3 className="key-skills-recr-applicants m-0 p-0">
                              Account Deactivated
                            </h3>
                          </div>
                        )}

                        <div className="col-lg-3 col-md-1">
                          {/* <p className="posted-date-appli">Posted on {user.applied_date!==null&&user.applied_date!==undefined?user.applied_date:""}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "No applicants"}
          </div>
          {/* Applicants OverFlow Ends here */}
          {/* DropDown Starts */}
          <div className="col-md-3">
            <div className="row mt-2">
              <div className="col-md-12">
                {/* <select className="form-select shadow border-0"
                onChange={e=>setsort(e.target.value)}
                style={{color:"#011f95"}}>
                  <option selected className="" value="sort-by">Sort by</option>
                  <option className="" value="shortlisted">Shortlisted</option>
                  <option className="" value="interviewd">Interviewed</option>
                  <option className="" value="hired">Hired</option>
                </select> */}
                {/* <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle default-drop-btn shadow w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort by
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* DropDown Ends */}
        </div>
        {props.allapplicantsReducer.loading == false ? (
          <FullPageLoader />
        ) : null}
      </div>
      <div className="footer-applicant">
        <Footer />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  allapplicantsReducer: state.allapplicantsReducer,
  addtofavReducer: state.addtofavReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAllApplicants: (userId, id) => dispatch(getAllApplicants(userId, id)),
  createAddtofavsearch: (userId, id) =>
    dispatch(createAddtofavsearch(userId, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Applicants);
